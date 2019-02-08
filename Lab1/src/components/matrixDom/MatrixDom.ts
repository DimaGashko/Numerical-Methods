import EventListener from '../EventListener/EventListener';
import * as microTemplate from 'micro-template';

import * as matrixDomTemplate from './MatrixDom.pug';
import './MatrixDom.sass';

microTemplate.template.variable = 't';

export default class MatrixDom extends EventListener {
   private _matrix: number[][] = [];
   private _title: string = '';

   private _root: HTMLElement = null;

   constructor() {
      super();

      this.init();
      this.render();
   }

   private init(): void { 
      this._createRoot();
   }

   private render(): void {
      this._renderHTML();
   } 

   private _renderHTML() { 
      this._root.innerHTML = microTemplate.template(matrixDomTemplate, {
         title: 'MatrixDommmm',
      });
      console.log(microTemplate);
   }

   private _createRoot() { 
      this._root = document.createElement('div');
   }

   public get root(): HTMLElement { 
      return this._root;
   }
}