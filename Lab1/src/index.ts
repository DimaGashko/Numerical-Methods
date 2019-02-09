import MatrixDom from './components/MatrixDom/MatrixDom';

import 'normalize.css'
import './styles/index.sass';

const matrixDom = new MatrixDom();

matrixDom.addEvent('change-data', () => {
   console.log(matrixDom.getData());
});

matrixDom.addEvent('change-dimensions', () => {
   console.log(matrixDom.m, 'x', matrixDom.n); 
})

document.body.appendChild(matrixDom.root);

(<any>window).m = matrixDom;