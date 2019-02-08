import EventListener from '../EventListener/EventListener';
import * as microTemplate from 'micro-template';

import * as matrixDomTemplate from './MatrixDom.pug';
import './MatrixDom.sass';

microTemplate.template.variable = 't';

type ViewType = 'cell' | 'area';

interface IElements {
   viewButton: HTMLElement,
   resetButton: HTMLElement,
}

export default class MatrixDom extends EventListener {
   private _viewType: ViewType = 'cell';

   private _defaultMatrix: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
   ];

   private _matrix: number[][] = this._defaultMatrix;

   private _title: string = 'MatrixDom';

   private _root: HTMLElement = null;

   /** HTML элементы компонента */
   private els: IElements = {
      viewButton: null,
      resetButton: null,
   }

   constructor() {
      super();

      this.init();
   }

   private init(): void {
      this._createRoot();
      this._initDelegatedEvent();

      this.render();
   }

   private _initDelegatedEvent() { 
      this._root.addEventListener('click', (event) => { 
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixDom__view')) {
            this.onView();
         
         } else if (targ.classList.contains('matrixDom__reset')) { 
            this.onReset();
         } 
      });
   }

   private _initElementEvents() {
      
   }

   private onView() { 
      this.toggleViewType();
   }

   private onReset() { 
      this.resetData();
   }

   private render(): void {
      this._renderHTML();
      this._getElements();

      this._initElementEvents();
   }

   private _getElements() {
      this.els.viewButton = this.root.querySelector('.matrixDom__view');
      this.els.resetButton = this.root.querySelector('.matrixDom__reset');
   }

   private _renderHTML() {
      this._root.innerHTML = microTemplate.template(matrixDomTemplate, this);
   } 

   private _createRoot() {
      this._root = document.createElement('div');
   }

   public toggleViewType() {
      this.viewType = (this.viewType === 'cell')
         ? 'area' : 'cell';
      
      this.render();
   }

   public resetData() {
      this._matrix = this._defaultMatrix;
      
      this.render();
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
      if (this._title === val) return;

      this._title = val;

      this.render();
   }

   public get viewType(): ViewType {
      return this._viewType;
   }

   public set viewType(val: ViewType) {
      if (this._viewType === val) return;

      this._viewType = val;

      this.render();
   }
}