"use client";

import { matrix, add, multiply, Matrix } from 'mathjs'
import { useState } from 'react';
import { getReStructuredMatrix } from '@/helpers/matrixHelper';
import MatrixComponent from './matrix';

const MatrixViewComponent = () => {
    const mA: Matrix = matrix([[1, 2, 3], [3, 4, 5], [5, 6, 7]]);
    const mB: number[][] = [[1, -1, 2], [2, -2, 2], [3, -3, 1]];

    // Matrix Addition
    // const result = multiply(mA, mB);

    const [matrixA, setMatrixA] = useState<Matrix>(mA);
    // const [matrixB, setMatrixB] = useState(mB);

    const onChangeSize = ([row, col]: [number, number]) => {
        let newArr = getReStructuredMatrix(matrixA, [row, col]);
        setMatrixA(newArr);
    }

    const onChangeFieldValue = (val: number, [row, col]: [number, number]) => {
        // let updatedMatrix = [...matrixA];
        // updatedMatrix[row][col] = val;
        // setMatrixA(updatedMatrix);
    }

    return (
        <div>
            <MatrixComponent
                currMatrix={matrixA}
                onChangeFieldValue={(val, [row, col]) => onChangeFieldValue(val, [row, col])}
                onChangeSize={([row, col]) => onChangeSize([row, col])}
            />
            {/* <MatrixComponent matrix={matrixB} /> */}
            {/* <MatrixComponent matrix={result} /> */}
        </div>
    )
}

export default MatrixViewComponent;
