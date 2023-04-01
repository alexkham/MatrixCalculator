import { Matrix, matrix, add, multiply } from "mathjs";

export enum MatrixOperation {
    Addition = 0,
    Multiplication = 1,
    ScalarMultiplication = 2
}

export interface MatrixDto {
    data: Matrix,
    key: string,
}

const mA: Matrix = matrix([[1, 2, 3], [3, 4, 5], [5, 6, 7]]);
const mB: Matrix = matrix([[1, -1, 2], [2, -2, 2], [3, -3, 1]]);

export const defaultMatrices: MatrixDto[] =
    [{
        data: mA,
        key: "matrixA"
    },
    {
        data: mB,
        key: "matrixB"
    }];

export const getReStructuredMatrix = (
    currMatrix: Matrix,
    [row, col]: [number, number]
): Matrix =>
    currMatrix.clone().resize([row, col], 0);

export const getMatrixAddition = (
    matrixA: Matrix,
    matrixB: Matrix
) =>
    add(matrixA, matrixB);

export const getMatrixMultiplication = (
    matrixA: Matrix,
    matrixB: Matrix
) =>
    multiply(matrixA, matrixB);

export const getMatrixScalarMultiplication = (
    matrixA: Matrix,
    value: number
) =>
    multiply(matrixA, value);