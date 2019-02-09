import MatrixDom from './components/MatrixDom/MatrixDom';

import 'normalize.css'
import './styles/index.sass';

const matrixDom = new MatrixDom();

matrixDom.minM = 1;
matrixDom.maxM = 1;

document.body.appendChild(matrixDom.root);

(<any>window).m = matrixDom;