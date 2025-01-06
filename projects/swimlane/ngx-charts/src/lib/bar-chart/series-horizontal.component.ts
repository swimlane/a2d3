import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { DataItem, StringOrNumberOrDate } from '../models/chart-data.model';
import { ColorHelper } from '../common/color.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { BarChartType } from './types/bar-chart-type.enum';
import { Bar } from './types/bar.model';
import { D0Types } from './types/d0-type.enum';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { ScaleType } from '../common/types/scale-type.enum';

@Component({
  selector: 'g[ngx-charts-series-horizontal]',
  template: `
    <svg:g
      ngx-charts-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="barOrientation.Horizontal"
      [roundEdges]="bar.roundEdges"
      (select)="click($event)"
      [gradient]="gradient"
      [isActive]="isActive(bar.data)"
      [ariaLabel]="bar.ariaLabel"
      [animations]="animations"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data"
      [noBarWhenZero]="noBarWhenZero"
    ></svg:g>
    <svg:g *ngIf="showDataLabel">
      <svg:g
        ngx-charts-bar-label
        *ngFor="let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy"
        [barX]="b.x"
        [barY]="b.y"
        [barWidth]="b.width"
        [barHeight]="b.height"
        [value]="b.total"
        [valueFormatting]="dataLabelFormatting"
        [dataLabelPosition]="dataLabelPosition"
        [orientation]="barOrientation.Horizontal"
        (dimensionsChanged)="dataLabelWidthChanged.emit({ size: $event, index: i })"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SeriesHorizontal implements OnChanges {
  @Input() dims: ViewDimensions;
  @Input() type: BarChartType = BarChartType.Standard;
  @Input() series: DataItem[];
  @Input() xScale;
  @Input() yScale;
  @Input() colors: ColorHelper;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() activeEntries: DataItem[];
  @Input() seriesName: StringOrNumberOrDate;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() roundEdges: boolean;
  @Input() animations: boolean = true;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;
  @Input() dataLabelPosition: string;


  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() dataLabelWidthChanged = new EventEmitter<{ size: Event; index: number }>();

  tooltipPlacement: PlacementTypes;
  tooltipType: StyleTypes;
  bars: Bar[];
  barsForDataLabels: Array<{ x: number; y: number; width: number; height: number; total: number; series: string }> = [];

  barOrientation = BarOrientation;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.updateTooltipSettings();
    const d0 = {
      [D0Types.positive]: 0,
      [D0Types.negative]: 0
    };
    let d0Type: D0Types;
    d0Type = D0Types.positive;
    let total;
    if (this.type === BarChartType.Normalized) {
      total = this.series.map(d => d.value).reduce((sum, d) => (sum as any) + d, 0);
    }
    const xScaleMin = Math.max(this.xScale.domain()[0], 0);

    this.bars = this.series.map(d => {
      let value = d.value as any;
      const label = this.getLabel(d);
      const formattedLabel = formatLabel(label);
      const roundEdges = this.roundEdges;
      d0Type = value > 0 ? D0Types.positive : D0Types.negative;

      const bar: any = {
        value,
        label,
        roundEdges,
        data: d,
        formattedLabel
      };

      bar.height = this.yScale.bandwidth();

      if (this.type === BarChartType.Standard) {
        bar.width = Math.abs(this.xScale(value) - this.xScale(xScaleMin));
        if (value < 0) {
          bar.x = this.xScale(value);
        } else {
          bar.x = this.xScale(xScaleMin);
        }
        bar.y = this.yScale(label);
      } else if (this.type === BarChartType.Stacked) {
        const offset0 = d0[d0Type];
        const offset1 = offset0 + value;
        d0[d0Type] += value;

        bar.width = this.xScale(offset1) - this.xScale(offset0);
        bar.x = this.xScale(offset0);
        bar.y = 0;
        bar.offset0 = offset0;
        bar.offset1 = offset1;
      } else if (this.type === BarChartType.Normalized) {
        let offset0 = d0[d0Type];
        let offset1 = offset0 + value;
        d0[d0Type] += value;

        if (total > 0) {
          offset0 = (offset0 * 100) / total;
          offset1 = (offset1 * 100) / total;
        } else {
          offset0 = 0;
          offset1 = 0;
        }

        bar.width = this.xScale(offset1) - this.xScale(offset0);
        bar.x = this.xScale(offset0);
        bar.y = 0;
        bar.offset0 = offset0;
        bar.offset1 = offset1;
        value = (offset1 - offset0).toFixed(2) + '%';
      }

      if (this.colors.scaleType === ScaleType.Ordinal) {
        bar.color = this.colors.getColor(label);
      } else {
        if (this.type === BarChartType.Standard) {
          bar.color = this.colors.getColor(value);
          bar.gradientStops = this.colors.getLinearGradientStops(value);
        } else {
          bar.color = this.colors.getColor(bar.offset1);
          bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
        }
      }

      let tooltipLabel = formattedLabel;
      bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
      if (this.seriesName !== null && this.seriesName !== undefined) {
        tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
        bar.data.series = this.seriesName;
        bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
      }

      bar.tooltipText = this.tooltipDisabled
        ? undefined
        : `
        <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
        <span class="tooltip-val">${
          this.dataLabelFormatting ? this.dataLabelFormatting(value) : value.toLocaleString()
        }</span>
      `;

      return bar;
    });

    this.updateDataLabels();
  }

  updateDataLabels(): void {
    if (this.type === BarChartType.Stacked) {
      this.barsForDataLabels = [];
      const section: any = {};
      section.series = this.seriesName;
      const totalPositive = this.series.map(d => d.value).reduce((sum, d) => (d > 0 ? sum + d : sum), 0);
      const totalNegative = this.series.map(d => d.value).reduce((sum, d) => (d < 0 ? sum + d : sum), 0);
      section.total = totalPositive + totalNegative;
      section.x = 0;
      section.y = 0;
      // if total is positive then we show it on the right, otherwise on the left
      if (section.total > 0) {
        section.width = this.xScale(totalPositive);
      } else {
        section.width = this.xScale(totalNegative);
      }
      section.height = this.yScale.bandwidth();
      this.barsForDataLabels.push(section);
    } else {
      this.barsForDataLabels = this.series.map(d => {
        const section: any = {};
        section.series = this.seriesName ?? d.label;
        section.total = d.value;
        section.x = this.xScale(0);
        section.y = this.yScale(d.label);
        section.width = this.xScale(section.total) - this.xScale(0);
        section.height = this.yScale.bandwidth();
        return section;
      });
    }
  }

  updateTooltipSettings(): void {
    this.tooltipPlacement = this.tooltipDisabled ? undefined : PlacementTypes.Top;
    this.tooltipType = this.tooltipDisabled ? undefined : StyleTypes.tooltip;
  }

  isActive(entry: DataItem): boolean {
    if (!this.activeEntries) return false;

    const item = this.activeEntries.find(active => {
      return entry.name === active.name && entry.value === active.value;
    });

    return item !== undefined;
  }

  getLabel(dataItem: DataItem): StringOrNumberOrDate {
    if (dataItem.label) {
      return dataItem.label;
    }
    return dataItem.name;
  }

  trackBy(index: number, bar: Bar): string {
    return bar.label;
  }

  trackDataLabelBy(index: number, barLabel: any): string {
    return index + '#' + barLabel.series + '#' + barLabel.total;
  }

  click(data: DataItem): void {
    this.select.emit(data);
  }
}
