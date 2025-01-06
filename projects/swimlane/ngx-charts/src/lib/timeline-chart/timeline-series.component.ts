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
import { TimelineChartType } from './types/timeline-chart-type.enum';
import { Bar } from '../bar-chart/types/bar.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { ScaleType } from '../common/types/scale-type.enum';

@Component({
  selector: 'g[ngx-charts-timeline-series]',
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
      [timelineChart]="true"
    ></svg:g>
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
export class TimelineSeriesComponent implements OnChanges {
  @Input() type: TimelineChartType = TimelineChartType.Standard;
  @Input() series: any[];
  @Input() xScale;
  @Input() yScale;
  @Input() colors: ColorHelper;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() activeEntries: any[];
  @Input() seriesName: StringOrNumberOrDate;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() roundEdges: boolean;
  @Input() animations: boolean = true;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;

  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

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

    this.bars = this.series.map(d => {
      const label = this.getLabel(d);
      const formattedLabel = formatLabel(label);
      const roundEdges = this.roundEdges;
      const bar: any = {
        label,
        roundEdges,
        data: d,
        formattedLabel
      };

      bar.height = this.yScale.bandwidth();
      bar.width = this.xScale(d.endTime) - this.xScale(d.startTime);
      bar.x = this.xScale(d.startTime);
      if (this.type === TimelineChartType.Standard) {
        bar.y = this.yScale(label);
      } else {
        bar.y = 0
      }

      if (this.colors.scaleType === ScaleType.Ordinal) {
        bar.color = this.colors.getColor(label);
      }

      let tooltipLabel = formattedLabel;
      bar.ariaLabel = formattedLabel + ' ' + d.startTime.toLocaleString() + d.endTime.toLocaleString();
      if (this.seriesName !== null && this.seriesName !== undefined) {
        tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
        bar.data.series = this.seriesName;
        bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
      }

      bar.tooltipText = this.tooltipDisabled
        ? undefined
        : `
        <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
        <span class="tooltip-val">${this.dataLabelFormatting ? this.dataLabelFormatting(d.startTime) : formatLabel(d.startTime)} - 
          ${this.dataLabelFormatting ? this.dataLabelFormatting(d.endTime) : formatLabel(d.endTime)}</span>
      `;

      return bar;
    });

    this.updateDataLabels();
  }

  updateDataLabels(): void {
    this.barsForDataLabels = this.series.map(d => {
      const section: any = {};
      section.series = this.seriesName ?? d.label;
      section.total = d.endTime;
      section.x = this.xScale(0);
      section.y = this.yScale(d.label);
      section.width = this.xScale(section.total) - this.xScale(0);
      section.height = this.yScale.bandwidth();
      return section;
    });
  }

  updateTooltipSettings(): void {
    this.tooltipPlacement = this.tooltipDisabled ? undefined : PlacementTypes.Top;
    this.tooltipType = this.tooltipDisabled ? undefined : StyleTypes.tooltip;
  }

  isActive(entry: any): boolean {
    if (!this.activeEntries) return false;

    let item;
    if (this.type === TimelineChartType.Standard) {
      item = this.activeEntries.find(active => {
        return entry.name === active.name && entry.value === active.value;
      });
    } else {
      item = this.activeEntries.find(active => {
        return entry.name === active.name && entry.series === active.series;
      });
    }
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
