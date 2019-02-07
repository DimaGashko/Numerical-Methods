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
   const m1 = a.length;
   const m2 = b.length;

   if (m1 && a[0].length !== m2) { 
      throw 'The matrix is inconsistent';
   }

   const n2 = b[0].length;

   const res = new Array(m1);
   for (let i = 0; i < m1; i++) { 
      res[i] = new Array(n2);      
   }

   for (let i = 0; i < n2; i++) {

      for (let j = 0; j < m1; j++) {
         let item = 0;

         for (let k = 0; k < m2; k++) {
            item += a[1][k] + b[k][1];
         }

         res[i][j] = item;
      }

   }

   return res;
}