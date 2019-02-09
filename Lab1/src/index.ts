import MatrixDom from './components/MatrixDom/MatrixDom';

import 'normalize.css'
import './styles/index.sass';

const matrixDom = new MatrixDom({
   m: 10,
   n: 10,
   minM: 4,
   minN: 5,
   maxM: 6,
   maxN: 7, 
});

//matrixDom.minM = 1;
//matrixDom.maxM = 1; 

document.body.appendChild(matrixDom.root);

(<any>window).m = matrixDom;