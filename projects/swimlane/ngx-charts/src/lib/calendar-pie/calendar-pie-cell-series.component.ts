import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { DataItem } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { Color } from 'd3-color';
import { Tooltip } from '../common/tooltip-area.component';
import { ColorHelper } from '../common/color.helper';

interface Cell {
  cell: DataItem;
  data: any[];
  date: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'g[ngx-charts-calendar-pie-cell-series]',
  template: `
  <ng-template #defaultTooltipTemplate let-model="model">
    <xhtml:div class="area-tooltip-container">
      <xhtml:span class="tooltip-label">{{ model.data.label }}</xhtml:span>
      <xhtml:div *ngFor="let tooltipItem of model.data.series" class="tooltip-item">
        <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
        {{ getTooltipText(tooltipItem) }}
      </xhtml:div>
    </xhtml:div>
  </ng-template>
  <svg:g
    ngx-charts-calendar-pie-cell
    *ngFor="let c of cells; trackBy: trackBy"
    [x]="c.x"
    [y]="c.y"
    [date]="c.date"
    [width]="c.width"
    [height]="c.height"
    [pieWidth]="pieWidth"
    [pieHeight]="pieHeight"
    (select)="onClick(c.cell)"
    (activate)="activate.emit(c.cell)"
    (deactivate)="deactivate.emit(c.cell)"
    ngx-tooltip
    [tooltipDisabled]="tooltipDisabled"
    [tooltipPlacement]="placementTypes.Top"
    [tooltipType]="styleTypes.tooltip"
    [tooltipTemplate]="defaultTooltipTemplate"
    [tooltipContext]="c"
  >
    <svg:g
      ngx-charts-pie-chart
      class="pie-chart-calendar"
      [view]="[pieWidth, pieHeight]"
      [scheme]="scheme"
      [results]="c.data.series"
      [animations]="animations"
      [legend]="false"
      [explodeSlices]="false"
      [labels]="false"
      [doughnut]="false"
      [tooltipDisabled]="true"
      [calendar]="true"
      [customColors]="customColors"
      [margins]="[0, 0, 0, 0]">
    </svg:g>
  </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPieCellSeriesComponent implements OnChanges {
  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() tooltipDisabled: boolean = false;
  @Input() animations: boolean = true;
  @Input() scheme: string | Color = "cool";
  @Input() customColors: any;
  @Input() colors: ColorHelper;

  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate: EventEmitter<DataItem> = new EventEmitter();
  @Output() deactivate: EventEmitter<DataItem> = new EventEmitter();

  cells: Cell[];

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;
  pieWidth: number;
  pieHeight: number;
  width: number;
  height: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.width = this.xScale.bandwidth();
    this.height = this.yScale.bandwidth();

    this.cells = this.getCells();

    this.pieWidth = this.width * 0.7;
    this.pieHeight = this.height * 0.7;
  }

  getCells(): Cell[] {
    const cells = [];

    this.data.map(row => {
      row.series.map(cell => {
        const value = JSON.parse(JSON.stringify(cell.value));
        cell.series = row.name;

        for (const series of value.series) {
          series.series = series.name;
          series.color = this.colors ? this.colors.getColor(series.name) : "#000000";
        }

        cells.push({
          cell,
          x: this.xScale(row.name),
          y: this.yScale(cell.name),
          data: value,
          date: cell.date,
          width: this.width,
          height: this.height,
        });
      });
    });

    return cells;
  }

  getTooltipText(tooltipItem: Tooltip): string {
    let result: string = '';
    if (tooltipItem.series !== undefined) {
      result += tooltipItem.series;
    } else {
      result += '???';
    }
    result += ': ';
    if (tooltipItem.value !== undefined) {
      result += tooltipItem.value.toLocaleString();
    }
    return result;
  }

  trackBy(index: number, item): string {
    return item.label;
  }

  onClick(data): void {
    this.select.emit(data);
  }
}
