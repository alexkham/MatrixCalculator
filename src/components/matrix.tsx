"use client";

import React from 'react'
import styles from './matrix.module.css'
import { Matrix } from 'mathjs';

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

    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.target.select();
    }
    const renderMatrixTable = () => {
        const onChangeField = (val: string, [r, c]: [number, number]) => {
            newProps.onChangeFieldValue(parseInt(val) || 0, [r, c]);
        }

        let rowData = [];
        for (let i = 0; i < row; i++) {
            let columnData = [];
            for (let j = 0; j < col; j++) {
                columnData.push(<td key={i + "_" + j}>
                    <input
                        type='number'
                        disabled={isDisabled}
                        className={styles.inputField}
                        value={currMatrix.get([i, j])}
                        onFocus={e => handleFocus(e)}
                        onChange={e => onChangeField(e.target.value, [i, j])} />
                </td>)
            }
            rowData.push(
                <tr key={i}>
                    {columnData}
                </tr>
            )
        }
        return (
            <table>
                <tbody>
                    {rowData}
                </tbody>
            </table>
        )
    }

    const renderMarixSizeInput = () => {
        const onChangeSize = (val: string, type: string) => {
            let parsedValue = parseInt(val) || 0;
            if (type == "row") {
                newProps.onChangeSize([parsedValue, col]);
            }
            else {
                newProps.onChangeSize([row, parsedValue]);
            }
        }

        return (
            <p>
                <input
                    type='number'
                    disabled={isDisabled}
                    className={styles.inputSize}
                    onChange={e => onChangeSize(e.target.value, "row")}
                    value={row}
                    onFocus={e => handleFocus(e)}
                />
                <span className={styles.span}>X</span>
                <input
                    type='number'
                    disabled={isDisabled}
                    className={styles.inputSize}
                    onChange={e => onChangeSize(e.target.value, "col")}
                    value={col}
                    onFocus={e => handleFocus(e)}
                />
            </p>
        )
    }

    return (
        <div className={styles.matrixBlock}>
            <h3>{newProps.name}</h3>
            <br />
            {renderMatrixTable()}
            <br />
            {renderMarixSizeInput()}
        </div>
    )
}

export default MatrixComponent;