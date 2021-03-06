/**
 * Умножает две матрицы
 * 
 *```js
 * matrixMulNum([
 *    [2, 4, 0],
 *    [-2, 1, 3],
 *    [-1, 0, 1],
 * 
 * ], [1, 2, -1]); 
 * // [10],
 * // [-3],
 * // [-2],
 * ```
 * 
 * @param a матрица (в виде двумерного массива)
 * @param b вектор (в виде массива)
*/
export default function matrixMulVec(a: number[][], b: number[]): number[][] {
   const m1 = a.length;
   const m2 = b.length;

   if (m1 && a[0].length !== m2) { 
      throw 'The matrix and the vector are inconsistent';
   }

   const res = new Array(m1);
   for (let i = 0; i < m1; i++) { 
      res[i] = new Array(1);      
   }

   for (let j = 0; j < m1; j++) {
      let item = 0;

      for (let k = 0; k < m2; k++) {
         item += a[j][k] * b[k];
      }

      res[j][0] = item; 
   } 

   return res;
}