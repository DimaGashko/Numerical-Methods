/**
 * Умножает две матрицы
 * 
 *```js
 * matrixMulNum([
 *    [1, -1],
 *    [2, 0],
 *    [3, 0],
 * ], [
 *  [1, 1],
 *  [2, 0],
 * ]); 
 * // [-1, 1],
 * // [2, 2],
 * // [3, 3],
 * ```
 * 
 * @param a первая матрица (в виде двумерного массива)
 * @param b вторая матрица (в виде двумерного массива)
*/
export default function matrixMulMatrix(a: number[][], b: number[][]): number[][] {
   if (a.length && a[0].length !== b.length) { 
      throw 'The matrix is inconsistent';
   }

   

   return [];
}