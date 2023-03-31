import { Matrix } from "mathjs";

export const getReStructuredMatrix = (
    currMatrix: Matrix,
    [row, col]: [number, number]
): Matrix =>
    currMatrix.clone().resize([row, col], 0);
