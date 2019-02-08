import MatrixDom from './components/MatrixDom/MatrixDom';

import 'normalize.css'
import './styles/index.sass';

const matrixDom = new MatrixDom();

document.body.appendChild(matrixDom.root);

(<any>window).m = matrixDom;