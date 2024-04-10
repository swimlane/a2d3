import { Component, SimpleChanges, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import { ViewDimensions } from './types/view-dimension.interface';
import {animate, style, transition, trigger} from "@angular/animations";

interface GridPanel {
  class: ClassEnum;
  height: number;
  name: string;
  width: number;
  x: number;
  y: number;
}

enum ClassEnum {
  Odd = 'odd',
  Even = 'even'
}

@Component({
  selector: 'g[ngx-charts-grid-panel-series]',
  template: `
    <svg:g
      ngx-charts-grid-panel
      *ngFor="let gridPanel of gridPanels"
      @toggleHide
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleHide', [
      transition(':leave', [
        style({
          opacity: '0'
        }),
        animate('500ms', style({ opacity: '0' }))
      ]),
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate('500ms 300ms', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class GridPanelSeriesComponent implements OnChanges {
  gridPanels: GridPanel[];

  @Input() data: any[];

  @Input() dims: ViewDimensions;

  @Input() xScale: any;

  @Input() yScale: any;

  @Input() orient: BarOrientation;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.gridPanels = this.getGridPanels();
  }

  getGridPanels(): GridPanel[] {
    return this.data.map(d => {
      let offset;
      let width;
      let height;
      let x;
      let y;
      let className = ClassEnum.Odd;

      if (this.orient === BarOrientation.Vertical) {
        const position: number = this.xScale(d.name);
        const positionIndex = Number.parseInt((position / this.xScale.step()).toString(), 10);

        if (positionIndex % 2 === 1) {
          className = ClassEnum.Even;
        }
        offset = this.xScale.bandwidth() * this.xScale.paddingInner();
        width = this.xScale.bandwidth() + offset;
        height = this.dims.height;
        x = this.xScale(d.name) - offset / 2;
        y = 0;
      } else if (this.orient === BarOrientation.Horizontal) {
        const position = this.yScale(d.name);
        const positionIndex = Number.parseInt((position / this.yScale.step()).toString(), 10);

        if (positionIndex % 2 === 1) {
          className = ClassEnum.Even;
        }
        offset = this.yScale.bandwidth() * this.yScale.paddingInner();

        width = this.dims.width;
        height = this.yScale.bandwidth() + offset;
        x = 0;
        y = this.yScale(d.name) - offset / 2;
      }

      return {
        name: d.name,
        class: className,
        height,
        width,
        x,
        y
      };
    });
  }
}
