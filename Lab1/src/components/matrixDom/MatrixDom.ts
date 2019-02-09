import EventListener from '../EventListener/EventListener';
import * as microTemplate from 'micro-template';

import * as matrixDomTemplate from './MatrixDom.pug';
import './MatrixDom.sass';

microTemplate.template.variable = 't';

type ViewType = 'cell' | 'area';

interface IElements {
   viewButton: HTMLElement,
   resetButton: HTMLElement,
   mDimensions: HTMLElement,
   nDimensions: HTMLElement,
}

export default class MatrixDom extends EventListener {
   private _viewType: ViewType = 'area';

   private _defaultMatrix: number[][] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
   ];

   private _matrix: number[][];

   private _m: number;
   private _n: number;

   private _title: string = 'Matrix A:';

   private _root: HTMLElement = null;

   /** HTML элементы компонента */
   private els: IElements = {
      viewButton: null,
      resetButton: null,
      mDimensions: null,
      nDimensions: null,
   }

   constructor() {
      super();

      this.init();
   }

   private init(): void {
      this._createRoot();
      this._initDelegatedEvent();

      this.resetData(); // call render inside
   }

   private _initDelegatedEvent() {
      this._root.addEventListener('click', (event) => {
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixDom__view')) {
            this.onView();

         } else if (targ.classList.contains('matrixDom__reset')) {
            this.onReset();

         } else if (targ.classList.contains('matrixDom__dimensionsControl')) {
            this.onDimensionsChange();

         }
      });
   }

   private _initElementEvents() {

   }

   private onDimensionsChange() {

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
      this.els.mDimensions = this.root.querySelector('.matrixDom__mDimensions');
      this.els.mDimensions = this.root.querySelector('.matrixDom__nDimensions');
   }

   private _renderHTML() {
      this._root.innerHTML = microTemplate.template(matrixDomTemplate, this);
   }

   private _createRoot() {
      this._root = document.createElement('div');
   }

   private _getAreaText(): string {
      return this.getData().map((row) => {
         
      });
   }

   /**
    * Возвращает значение i строки j столбца
    * 
    * Всегда возвращает значение.Если на переданных координатах ничего нет 
    * возвращает 0 (даже если i, j > m, n)
    * 
    * @param i номер строки
    * @param j номер столбца
    */
   private get(i: number, j: number): number {
      const row = this._matrix[i];
      if (!row) return 0;

      return row[j] || 0;
   }

   /**
    * Устанавливает значение в матрицу (устанавливает при любых значения i, j)
    * @param i номер строки
    * @param j номер столбца 
    * @param val значение
    */
   private set(i: number, j: number, val: number) {
      this._matrix[i][j] = val;
   }

   public toggleViewType() {
      this.viewType = (this.viewType === 'cell')
         ? 'area' : 'cell';

      this.render();
   }

   public resetData() {
      this.setData(this._defaultMatrix);
   }

   public get root(): HTMLElement {
      return this._root;
   }

   public getData(): number[][] {
      const res: number[][] = new Array(this._m);

      for (let i = 0; i < this._m; i++) {
         res[i] = new Array(this._n);

         for (let j = 0; j < this._n; j++) { 
            res[i][j] = this.get(i, j);
         }
      }
      
      return res;
   }

   public setData(data: number[][]) {
      if (data.length === 0 || data[0].length === 0) {
         this.resetData();
      }

      this._m = data.length;
      this._n = data[0].length;

      data.forEach((row, i) => {
         row.forEach((item, j) => {
            this.set(i, j, item);
         });
      });

      this.render();
   }

   public get m(): number {
      return this._m;
   }

   public set m(val: number) {
      this._m = val;
   }

   public get n(): number {
      return this._n;
   }

   public set n(val: number) {
      this._n = val;
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