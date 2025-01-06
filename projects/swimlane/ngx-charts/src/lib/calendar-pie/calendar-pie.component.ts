import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { scaleBand } from 'd3-scale';

import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { getScaleType } from '../common/domain.helper';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { ScaleType } from '../common/types/scale-type.enum';

@Component({
  selector: 'ngx-charts-calendar-pie',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [animations]="animations"
      [legendOptions]="legendOptions"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g [attr.transform]="transform" class="calendar-pie chart">
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          [wrapTicks]="wrapTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-calendar-pie-cell-series
          [xScale]="xScale"
          [yScale]="yScale"
          [data]="formattedResult"
          [animations]="animations"
          [tooltipDisabled]="tooltipDisabled"
          [scheme]="scheme"
          [customColors]="customColors"
          [colors]="colors"
          (select)="onClick($event)"
          (activate)="onActivate($event, undefined)"
          (deactivate)="onDeactivate($event, undefined)"
        >
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarPieComponent extends BaseChartComponent {
  @Input() legend: boolean;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() xAxis: boolean;
  @Input() innerPadding: number | number[] | string | string[] = 8;
  @Input() trimXAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() xAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() tooltipDisabled: boolean = false;
  @Input() activeEntries: any[] = [];
  @Input() wrapTicks = false;
  @Input() startSunday: boolean = false;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  dims: ViewDimensions;
  xDomain: string[];
  yDomain: string[];
  valueDomain: any[];
  xScale: any;
  yScale: any;
  colors: ColorHelper;
  transform: string;
  margin: number[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  legendOptions: LegendOptions;
  scaleType: ScaleType = ScaleType.Ordinal;
  formattedResult: any[];

  update(): void {
    super.update();

    this.xDomain = this.getXDomain();

    this.formatDates();
    this.formattedResult = this.formatData();

    this.yDomain = this.getYDomain();
    this.valueDomain = this.getValueDomain();

    this.scaleType = getScaleType(this.valueDomain, false);

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: false,
      xAxisHeight: this.xAxisHeight,
      showXLabel: false,
      showLegend: this.legend,
      legendType: this.scaleType as any,
      legendPosition: this.legendPosition
    });

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

  }

  formatData(): any[] {
    let startDayOfWeek = this.results[0].name.getDay();
    if (!this.startSunday) {
      startDayOfWeek = (startDayOfWeek + 6) % 7;
    }

    const result = [];
    for (let i = 0; i < 7; i++) {
      result.push({
        name: this.xDomain[i],
        series: []
      })
    }

    for (let i = 0; i < this.results.length; i++) {
      result[(i + startDayOfWeek) % 7].series.push({
        'name': Math.floor((i + startDayOfWeek) / 7),
        'value': this.results[i],
        'date': this.results[i].name.getDate()
      });
    }

    return result;
  }

  getXDomain(): string[] {
    if (this.startSunday) {
      return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }
    return [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  }

  getYDomain(): string[] {
    const domain = [];

    let weeks = 0;
    for (const group of this.formattedResult) {
      weeks = Math.max(weeks, group.series.length);
    }

    for (let i = weeks - 1; i > -1; i--) {
      domain.push(i);
    }

    return domain;
  }

  getValueDomain(): any[] {
    const domain = [];

    for (const group of this.formattedResult) {
      for (const d of group.series) {
        for (const value of d.value.series) {
          if (!domain.includes(value.name)) {
            domain.push(value.name);
          }
        }
      }
    }
    return domain;
  }

  /**
   * Converts the input to gap paddingInner in fraction
   * Supports the following inputs:
   *    Numbers: 8
   *    Strings: "8", "8px", "8%"
   *    Arrays: [8,2], "8,2", "[8,2]"
   *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
   *
   * @memberOf CalendarPieComponent
   */
  getDimension(value: string | number | Array<string | number>, index: number = 0, N: number, L: number): number {
    if (typeof value === 'string') {
      value = value
        .replace('[', '')
        .replace(']', '')
        .replace('px', '')
        // tslint:disable-next-line: quotemark
        .replace("'", '');

      if (value.includes(',')) {
        value = value.split(',');
      }
    }
    if (Array.isArray(value) && typeof index === 'number') {
      return this.getDimension(value[index], null, N, L);
    }
    if (typeof value === 'string' && value.includes('%')) {
      return +value.replace('%', '') / 100;
    }
    return N / (L / +value + 1);
  }

  getXScale(): any {
    const f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
    return scaleBand().rangeRound([0, this.dims.width]).domain(this.xDomain).paddingInner(f);
  }

  getYScale(): any {
    const f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
    return scaleBand().rangeRound([this.dims.height, 0]).domain(this.yDomain).paddingInner(f);
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain, this.customColors);
  }

  getLegendOptions(): LegendOptions {
    return {
      scaleType: this.scaleType,
      domain: this.valueDomain,
      colors: this.scaleType === ScaleType.Ordinal ? this.colors : this.colors.scale,
      title: this.scaleType === ScaleType.Ordinal ? this.legendTitle : undefined,
      position: this.legendPosition
    };
  }

  updateXAxisHeight({ height }: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(event, group, fromLegend: boolean = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    const items = [];
    for (const col of this.formattedResult) {
      for (const i of col.series) {
        if (fromLegend && i.label === item.name) {
          items.push(i);
        } else if (i.name === item.name && i.series === item.series) {
          items.push(i);
        }
        
      }
    }

    this.activeEntries = [...items];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(event, group, fromLegend: boolean = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    this.activeEntries = this.activeEntries.filter(i => {
      if (fromLegend) {
        return i.label !== item.name;
      } else {
        return !(i.name === item.name && i.series === item.series);
      }
    });

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}
