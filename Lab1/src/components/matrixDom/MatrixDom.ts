import EventListener from '../EventListener/EventListener';
import * as microTemplate from 'micro-template';

import * as matrixDomTemplate from './MatrixDom.pug';
import './MatrixDom.sass';

microTemplate.template.variable = 't';

export default class MatrixDom extends EventListener {
   private _matrix: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
   ];

   private _title: string = 'MatrixDom';

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
      this._root.innerHTML = microTemplate.template(matrixDomTemplate, this);
   }

   private _createRoot() {
      this._root = document.createElement('div');
   }

   public get root(): HTMLElement { 
      return this._root;
   }

   public getData(): number[][] { 
      return this._matrix;
   }

   public setData(data: number[][]) { 
      this._matrix = data;

      this.render();
   }

   public get m(): number {
      return this._matrix.length;
   }

   public get n(): number {
      return (this.m) ? this._matrix[0].length : 0;
   }

   public get title(): string {
      return this._title;
   }

   public set title(val: string) {
      this._title = val;

      this.render();
   }
}