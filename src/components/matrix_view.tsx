"use client";

import { matrix, add, multiply, Matrix } from 'mathjs'
import { useState } from 'react';
import { getReStructuredMatrix } from '@/helpers/matrixHelper';
import MatrixComponent from './matrix';

interface MatrixDto {
    data: Matrix,
    key: string
}

const MatrixViewComponent = () => {
    const mA: Matrix = matrix([[1, 2, 3], [3, 4, 5], [5, 6, 7]]);
    const mB: Matrix = matrix([[1, -1, 2], [2, -2, 2], [3, -3, 1]]);

    // Matrix Addition
    // const result = multiply(mA, mB);
    const defaultMatrices: MatrixDto[] =
        [{
            data: mA,
            key: "matrixA"
        },
        {
            data: mB,
            key: "matrixB"
        }]

    const [matrices, setMatrices] =
        useState<MatrixDto[]>(defaultMatrices);
    // const [matrixB, setMatrixB] = useState(mB);

    const getOrDefaultMatrix = (key: string) => {
        return (matrices.find(m => m.key == key)
            || matrices[0]).data;
    }

    const onChangeSize = (key: string, [row, col]: [number, number]) => {
        const updatedMatrix =
            getReStructuredMatrix(getOrDefaultMatrix(key), [row, col]);

        setUpdatedMatrices(key, updatedMatrix);
    }

    const onChangeFieldValue = (key: string, val: number, [row, col]: [number, number]) => {
        const updatedMatrix =
            getOrDefaultMatrix(key)
                .clone()
                .set([row, col], val);

        setUpdatedMatrices(key, updatedMatrix);
    }

    const setUpdatedMatrices = (key: string, updatedMatrix: Matrix) => {
        let newDto: MatrixDto = {
            data: updatedMatrix,
            key: key,
        }

        let updatedMatrices = [...matrices];
        let index = updatedMatrices.findIndex(m => m.key == key);
        updatedMatrices[index] = newDto;
        console.log(updatedMatrices, index)
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
            {matricesView}
        </div>
    )
}

export default MatrixViewComponent;
