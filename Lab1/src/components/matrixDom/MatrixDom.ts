import EventListener from '../EventListener/EventListener';
import * as microTemplate from 'micro-template';

import * as mainTmpl from './templates/mainTmpl.pug';
import * as dataTmpl from './templates/dataTmpl.pug';
import * as controlsTmpl from './templates/controlsTmpl.pug';

import './MatrixDom.sass';

microTemplate.template.variable = 't';

type ViewType = 'cell' | 'area';

interface IElements {
   data: HTMLElement,
   controls: HTMLElement,
   title: HTMLElement,
   area: HTMLElement,
   viewButton: HTMLElement,
   resetButton: HTMLElement,
   mDimensions: HTMLInputElement,
   nDimensions: HTMLInputElement,
}

export default class MatrixDom extends EventListener {
   private _viewType: ViewType = 'cell';

   private _defaultMatrix: number[][] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
   ];

   private _matrix: number[][] = this._defaultMatrix;

   private _m: number = this._defaultMatrix.length;
   private _n: number = this._defaultMatrix[0].length;

   private _title: string = 'Matrix A:';

   private _root: HTMLElement = null;

   /** HTML элементы компонента */
   private els: IElements = {
      data: null,
      controls: null,
      title: null,
      area: null,
      viewButton: null,
      resetButton: null,
      mDimensions: null,
      nDimensions: null,
   }

   // Базовый шаблон
   private mainTmpl = mainTmpl; 

   // Шаблон данных (непосредственно матрицы)
   private dataTmpl = dataTmpl;

   // Шаблон панели управления
   private controlsTmpl = controlsTmpl;

   constructor() {
      super();

      this.init();
   }

   private init(): void {
      this._createRoot();
      this._initDelegatedEvents();

      this.render();
   }

   private _initDelegatedEvents() {
      this._root.addEventListener('click', (event) => {
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixDom__view')) {
            this.onView();

         } else if (targ.classList.contains('matrixDom__reset')) {
            this.onReset();

         } 
      });

      this._root.addEventListener('keyup', (event) => {
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixCell__input')) {
            this.onCellChange(<HTMLInputElement>targ);
         }
      });
      

      this._root.addEventListener('change', (event) => {
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixDom__dimensionsControl')) {
            this.onDimensionsChange();
            
         } else if (targ.classList.contains('matrixCell__input')) {
            this.onCellChange(<HTMLInputElement>targ);
         }
      });
   }

   private onCellChange(cellInput: HTMLInputElement) { 
      const cell = cellInput.closest('.matrixCell');
      if (!cell) return

      const i = +cell.getAttribute('data-cell-i');
      const j = +cell.getAttribute('data-cell-j');
      const val = +cellInput.value;

      if (isNaN(i) || isNaN(j)) return;

      this.set(i, j, val); 
   }

   private onDimensionsChange() {
      const m = +this.els.mDimensions.value;
      const n = +this.els.nDimensions.value;

      this._setDimensions(m, n);
      this.renderData();
   }

   private onView() {
      this.toggleViewType();
   }

   private onReset() {
      this.resetData();
   }

   private render(): void {
      this._root.innerHTML = microTemplate.template(this.mainTmpl, this);
      
      this.els.data = this.root.querySelector('.matrixDom__data');
      this.els.controls = this.root.querySelector('.matrixDom__controls');
      this.els.title = this.root.querySelector('.matrixDom__title');

      this.renderData();
      this.renderControls();
   }

   private renderData() { 
      this.els.data.innerHTML = microTemplate
         .template(this.dataTmpl, this);

      this.els.area = this.root.querySelector('.matrixDom__area');

      this.correctAreaSize();
   }

   private renderControls() { 
      this.els.controls.innerHTML = microTemplate
         .template(this.controlsTmpl, this);
      
      this.els.viewButton = this.root.querySelector('.matrixDom__view');
      this.els.resetButton = this.root.querySelector('.matrixDom__reset');
      this.els.mDimensions = this.root.querySelector('.matrixDom__mDimensions');
      this.els.nDimensions = this.root.querySelector('.matrixDom__nDimensions');
   }
   
   private correctAreaSize() {
      if (this.viewType !== 'area') return;

      this.els.area.style.width = this.els.area.scrollWidth + 'px';
      this.els.area.style.height = this.els.area.scrollHeight + 'px';
   }

   private _createRoot() {
      this._root = document.createElement('div');
   }

   private _getAreaText(): string {
      return this.getData().map((row) => {
         return row.join(' ');
      }).join('\n');
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
      if (!this._matrix[i]) {
         this._matrix[i] = [];
      }

      this._matrix[i][j] = (!isNaN(val)) ? val : 0;

      this.emit('change-data');
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

      this._setDimensions(data.length, data[0].length);

      data.forEach((row, i) => {
         row.forEach((item, j) => {
            this.set(i, j, item);
         });
      });

      this.renderData();
      this.renderControls();

      this.emit('change-data');
   }

   private _setDimensions(m: number, n: number) {
      this._m = m ^ 0;
      this._n = n ^ 0;

      this.emit('change-dimensions');
   }

   public get m(): number {
      return this._m;
   }

   public set m(val: number) {
      this._setDimensions(val, this._n);
      this.renderData();
   }

   public get n(): number {
      return this._n;
   }

   public set n(val: number) {
      this._setDimensions(this._m, val);
      this.render();       
   }

   public get title(): string {
      return this._title;
   }

   public set title(val: string) {
      if (this._title === val) return;

      this._title = val;

      if (!this.els.title) return;

      this.els.title.innerHTML = this._title;

      this.emit('change-title');
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