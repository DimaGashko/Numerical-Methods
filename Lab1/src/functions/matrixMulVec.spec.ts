import { expect, assert } from 'chai';
import matrixMulMatrix from './matrixMulMatrix';
import matrixMulVec from './matrixMulVec';

describe('matrixMulMatrix', () => {
   it('Ошибка при несогласованных матрицах', () => {
      assert.throws(() => {
         matrixMulVec([
            [1, 2],
            [1, 2],
            [1, 2]
         ], [1, 2, 3]);
      }, 'The matrix is inconsistent');
   });
   
   it('Test 1', () => {
      const res = matrixMulVec([
         [2, 4, 0],
         [-2, 1, 3],
         [-1, 0, 1],
      ], [-1, 2, -1]);

      expect(res).to.have.deep.members([
         [10],
         [-3],
         [-2]
      ]);
   });  
   
});