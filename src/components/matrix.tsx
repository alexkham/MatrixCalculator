"use client";

import React, { useState } from 'react'
import styles from './matrix.module.css'
import { Matrix } from 'mathjs';
import InputFieldComponent from './inputField';

interface Props {
    name: string;
    isDisabled: boolean;
    currMatrix: Matrix;
    onChangeFieldValue: (val: number, [row, col]: [number, number]) => void;
    onChangeSize: ([row, col]: [number, number]) => void;
}

const MatrixComponent = (newProps: Props) => {
    const currMatrix = newProps.currMatrix;
    const [row, col] = currMatrix.size();
    const isDisabled = newProps.isDisabled;

    const [error, setError] = useState<[string, string] | undefined>(undefined);

    const renderMatrixTable = () => {
        const onChangeField = (val: string, [r, c]: [number, number]) => {
            newProps.onChangeFieldValue(parseInt(val) || 0, [r, c]);
        }

        let rowData = [];
        for (let i = 0; i < row; i++) {
            let columnData = [];
            for (let j = 0; j < col; j++) {
                columnData.push(
                    <td key={i + "_" + j}>
                        <InputFieldComponent
                            type={"number"}
                            disabled={isDisabled}
                            className={styles.inputField}
                            value={currMatrix.get([i, j])}
                            onChange={val => onChangeField(val, [i, j])}
                            isNumeric={true}
                        />
                    </td>
                )
            }
            rowData.push(
                <tr key={i}>
                    {columnData}
                </tr>
            )
        }
        return (
            <div className={styles.tableBracket}>
                <table>
                    <tbody>
                        {rowData}
                    </tbody>
                </table>
            </div>
        )
    }

    const renderMarixSizeInput = () => {
        const onChangeSize = (val: string, type: string) => {
            let parsedValue = parseInt(val) || 0;
            if (parsedValue < 1) {
                setError([type, "Value can't be 0 or empty"])
            }
            else if (parsedValue > 20) {
                setError([type, "Value can't be more than 20"])
            }
            else {
                setError(undefined);
                if (type == "row") {
                    newProps.onChangeSize([parsedValue, col]);
                }
                else {
                    newProps.onChangeSize([row, parsedValue]);
                }
            }
        }

        const rowErr = error && error[0] == "row" && error[1] || undefined;
        const colErr = error && error[0] == "col" && error[1] || undefined;

        return (
            <div style={{ display: 'flex' }}>
                <InputFieldComponent
                    type={"number"}
                    disabled={isDisabled}
                    className={styles.inputSize}
                    onChange={val => onChangeSize(val, "row")}
                    value={row}
                    error={rowErr}
                    isNumeric={true}
                />
                <span className={styles.span}>X</span>
                <InputFieldComponent
                    type={"number"}
                    disabled={isDisabled}
                    className={styles.inputSize}
                    onChange={val => onChangeSize(val, "col")}
                    value={col}
                    error={colErr}
                    isNumeric={true}
                />
            </div>
        )
    }

    return (
        <div className={styles.matrixBlock}>
            <h3>{newProps.name.toUpperCase()}</h3>
            <br />
            {renderMatrixTable()}
            <br />
            {renderMarixSizeInput()}
        </div>
    )
}

export default MatrixComponent;