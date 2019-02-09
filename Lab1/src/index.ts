import MatrixDom from './components/MatrixDom/MatrixDom';

import 'normalize.css'
import './styles/index.sass';
import matrixPlusMatrix from './functions/matrixPlusMatrix';

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
   calc();
});

matrixA.addEvent('change-dimensions', () => { 
   matrixB.m = matrixA.m;
   matrixB.n = matrixA.n;
});

matrixB.addEvent('change-dimensions', () => { 
   matrixA.m = matrixB.m;
   matrixA.n = matrixB.n;
});

function calc() { 
   const res = matrixPlusMatrix(matrixA.getData(), matrixB.getData());
   matrixC.setData(res);
}
