import MatrixDom from './components/MatrixDom/MatrixDom';
import matrixMulMatrix from './calcFunctions/matrixMulMatrix';

import 'normalize.css'
import './styles/index.sass';

const matrixA = new MatrixDom({ m: 3, n: 3});
const matrixB = new MatrixDom({ m: 3, n: 3});
const matrixC = new MatrixDom({
   disabled: true,
});

document.body.appendChild(matrixA.root);
document.body.appendChild(matrixB.root);
document.body.appendChild(matrixC.root);

calc();

matrixA.addEvent('change-data', () => {
   calc();
});

matrixB.addEvent('change-data', () => {
   calc();
});

matrixA.addEvent('change-dimensions', () => { 
   matrixB.m = matrixA.n;
   calc();
});

matrixB.addEvent('change-dimensions', () => { 
   matrixA.n = matrixB.m;
   calc();
});

function calc() { 
   const res = matrixMulMatrix(matrixA.getData(), matrixB.getData());
   matrixC.setData(res);
}
