"use client";

import { Matrix } from 'mathjs'
import { useEffect, useState } from 'react';
import { MatrixDto, MatrixOperation, defaultMatrices, getMatrixAddition, getMatrixMultiplication, getMatrixScalarMultiplication, getReStructuredMatrix } from '@/helpers/matrixHelper';
import MatrixComponent from './matrix';
import styles from './matrix.module.css'
import InputFieldComponent from './inputField';


const MatrixViewComponent = () => {
    const [matrices, setMatrices] = useState<MatrixDto[]>(defaultMatrices);
    const [selectedOperation, setSelection] = useState<MatrixOperation>(MatrixOperation.Addition);
    const [changesCount, setChangesCount] = useState<number>(0);
    const [scalarInput, setScalarInput] = useState<number>(0);

    useEffect(() => {
        const [mA, mB] = matrices;
        const operation = (op: MatrixOperation) => {
            switch (op) {
                case MatrixOperation.Multiplication:
                    return getMatrixMultiplication(mA.data, mB.data);
                case MatrixOperation.ScalarMultiplication:
                    return getMatrixScalarMultiplication(mA.data, scalarInput);
                case MatrixOperation.Addition:
                default:
                    return getMatrixAddition(mA.data, mB.data);
            }
        }
        setUpdatedMatrices("result", operation(selectedOperation));
    }, [changesCount])

    const getOrDefaultMatrix = (key?: string) => {
        return (matrices.find(m => m.key == key)
            || matrices[0]);
    }

    const getMatricesExcludeResult = () => {
        return matrices.filter(m => m.key != "result")
    }

    const initChange = () => {
        setChangesCount(changesCount + 1);
    }

    const triggerMatricesUpdation = (
        key: string,
        [r, c]: [number, number],
        operation: MatrixOperation
    ) => {
        const updatedMatrices =
            getMatricesExcludeResult()
                .map(m => {
                    let data = getReStructuredMatrix(
                        m.data,
                        operation == MatrixOperation.Multiplication
                            && m.key != key
                            ? [c, r]
                            : [r, c]
                    );

                    return {
                        key: m.key,
                        data: data
                    } as MatrixDto;
                })

        setMatrices(updatedMatrices);
        initChange();
    }

    const onButtonClick = (selectedOperation: number) => {
        setSelection(selectedOperation);
        const defaultMatrix = getOrDefaultMatrix();
        const [r, c] = defaultMatrix.data.size();
        triggerMatricesUpdation(
            defaultMatrix.key,
            [r, c],
            selectedOperation
        );
    }

    const onChangeSize = (key: string, [r, c]: [number, number]) => {
        triggerMatricesUpdation(
            key,
            [r, c],
            selectedOperation
        );
    }

    const onChangeFieldValue = (key: string, val: number, [row, col]: [number, number]) => {
        const updatedMatrix =
            getOrDefaultMatrix(key)
                .data
                .clone()
                .set([row, col], val);

        setUpdatedMatrices(key, updatedMatrix);
        initChange();
    }

    const setUpdatedMatrices = (key: string, updatedMatrix: Matrix) => {
        let newDto: MatrixDto = {
            data: updatedMatrix,
            key: key,
        }

        let updatedMatrices = [...matrices];
        let index = updatedMatrices.findIndex(m => m.key == key);

        if (index == -1) {
            updatedMatrices.push(newDto)
        }
        else {
            updatedMatrices[index] = newDto;
        }

        setMatrices(updatedMatrices);
    }


    const matricesView =
        matrices.map(m => {
            if (selectedOperation == MatrixOperation.ScalarMultiplication
                && m.key == "matrixB"
            ) {
                return (
                    <div className={styles.scalarInput} key={"scalarInput"}>
                        <h3>SCALAR INPUT</h3>
                        <br />
                        <InputFieldComponent
                            type='number'
                            onChange={val => {
                                setScalarInput(parseInt(val) || 0);
                                initChange();
                            }}
                            value={scalarInput}
                            className={styles.inputBlock}
                        />
                    </div>
                );
            }
            else {
                return (
                    <MatrixComponent
                        key={m.key}
                        name={m.key}
                        isDisabled={m.key == "result"}
                        currMatrix={m.data}
                        onChangeFieldValue={(val, [row, col]) =>
                            onChangeFieldValue(m.key, val, [row, col])}
                        onChangeSize={([row, col]) => onChangeSize(m.key, [row, col])}
                    />
                )
            }
        })

    const buttonView =
        [
            { name: "Addition", key: MatrixOperation.Addition },
            { name: "Multiplication", key: MatrixOperation.Multiplication },
            { name: "Scalar Multiplication", key: MatrixOperation.ScalarMultiplication }
        ].map(op => {
            return (
                <button key={"button_" + op.key}
                    onClick={() => onButtonClick(op.key)}
                    className={styles.btn + " " + (op.key == selectedOperation && styles.isActive)}
                >
                    {op.name}
                </button>
            )
        })

    return (
        <div className={styles.pageView}>
            <div className={styles.buttonView}>
                {buttonView}
            </div>
            <div className={styles.matricesView}>
                {matricesView}
            </div>
        </div>
    )
}

export default MatrixViewComponent;
