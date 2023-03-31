"use client";

import { Matrix } from 'mathjs'
import { useEffect, useState } from 'react';
import { MatrixDto, defaultMatrices, getMatrixAddition, getMatrixMultiplication, getReStructuredMatrix } from '@/helpers/matrixHelper';
import MatrixComponent from './matrix';

const MatrixViewComponent = () => {
    const [matrices, setMatrices] = useState<MatrixDto[]>(defaultMatrices);
    const [selectedItem, setSelection] = useState<number>(0);
    const [changesCount, setChangesCount] = useState<number>(0);

    useEffect(() => {
        const [mA, mB] = matrices;
        const result =
            selectedItem == 0
                ? getMatrixAddition(mA.data, mB.data)
                : getMatrixMultiplication(mA.data, mB.data);

        console.log("hi i am use effect")

        setUpdatedMatrices("result", result);
    }, [changesCount])

    const getOrDefaultMatrix = (key: string) => {
        return (matrices.find(m => m.key == key)
            || matrices[0]).data;
    }

    const initChange = () => {
        setChangesCount(changesCount + 1);
    }

    const onButtonClick = (selectedItem: number) => {
        setSelection(selectedItem);
        initChange();
    }

    const onChangeSize = (key: string, [row, col]: [number, number]) => {
        const updatedMatrix =
            getReStructuredMatrix(getOrDefaultMatrix(key), [row, col]);

        setUpdatedMatrices(key, updatedMatrix);
        initChange();
    }

    const onChangeFieldValue = (key: string, val: number, [row, col]: [number, number]) => {
        const updatedMatrix =
            getOrDefaultMatrix(key)
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
            return (
                <MatrixComponent
                    key={m.key}
                    currMatrix={m.data}
                    onChangeFieldValue={(val, [row, col]) =>
                        onChangeFieldValue(m.key, val, [row, col])}
                    onChangeSize={([row, col]) => onChangeSize(m.key, [row, col])}
                />
            )
        })

    return (
        <div>
            <div>
                <button onClick={() => onButtonClick(0)}>Addition</button>
                <button onClick={() => onButtonClick(1)}>Multiplication</button>
            </div>
            {matricesView}
        </div>
    )
}

export default MatrixViewComponent;
