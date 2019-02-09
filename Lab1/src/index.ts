import MatrixDom from './components/MatrixDom/MatrixDom';

import 'normalize.css'
import './styles/index.sass';

const matrixDom = new MatrixDom();

matrixDom.minM = 2;
matrixDom.minN = 3;
 
matrixDom.maxM = 150;
matrixDom.maxN = 98;

document.body.appendChild(matrixDom.root);

(<any>window).m = matrixDom;