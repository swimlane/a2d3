import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from './label.helper';
import { id } from '../utils/id';
import { ColorHelper } from './color.helper';
import { DataItem, Series, StringOrNumberOrDate } from '../models/chart-data.model';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { BarOrientation } from './types/bar-orientation.enum';
import { Gradient } from './types/gradient.interface';
import { ScaleType } from './types/scale-type.enum';
import { isPlatformServer } from '@angular/common';

export enum SeriesType {
  Standard = 'standard',
  Stacked = 'stacked'
}

export interface Circle {
  classNames: string[];
  value: string | number;
  label: string;
  data: DataItem;
  cx: number;
  cy: number;
  radius: number;
  height: number;
  tooltipLabel: string;
  color: string;
  opacity: number;
  seriesName: string;
  gradientStops: Gradient[];
  min: number;
  max: number;
}

@Component({
  selector: 'g[ngx-charts-circle-series]',
  template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="!isSSR && barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:rect
        *ngIf="isSSR && barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(250, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CircleSeriesComponent implements OnChanges, OnInit {
  @Input() data: Series;
  @Input() type: SeriesType = SeriesType.Standard;
  @Input() xScale;
  @Input() yScale;
  @Input() colors: ColorHelper;
  @Input() scaleType: ScaleType;
  @Input() visibleValue: boolean;
  @Input() activeEntries: any[];
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate: EventEmitter<{ name: StringOrNumberOrDate }> = new EventEmitter();
  @Output() deactivate: EventEmitter<{ name: StringOrNumberOrDate }> = new EventEmitter();

  areaPath: any;
  circle: Circle; // active circle
  barVisible: boolean = false;
  gradientId: string;
  gradientFill: string;

  barOrientation = BarOrientation;
  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  isSSR = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(#${this.gradientId})`;

    if (isPlatformServer(this.platformId)) {
      this.isSSR = false // skip;
    }
  }

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    this.circle = this.getActiveCircle();
  }

  getActiveCircle(): Circle {
    const indexActiveDataPoint = this.data.series.findIndex(d => {
      const label = d.name;
      return label && this.visibleValue && label.toString() === this.visibleValue.toString() && d.value !== undefined;
    });

    if (indexActiveDataPoint === -1) {
      // No valid point is 'active/hovered over' at this moment.
      return undefined;
    }

    return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
  }

  mapDataPointToCircle(d: any, i: number): Circle {
    const seriesName = this.data.name as string;

    const value = d.value;
    const label = d.name;
    const tooltipLabel = formatLabel(label);

    let cx;
    if (this.scaleType === ScaleType.Time) {
      cx = this.xScale(label);
    } else if (this.scaleType === ScaleType.Linear) {
      cx = this.xScale(Number(label));
    } else {
      cx = this.xScale(label);
    }

    const cy = this.yScale(this.type === SeriesType.Standard ? value : d.d1);
    const radius = 5;
    const height = this.yScale.range()[0] - cy;
    const opacity = 1;

    let color;
    if (this.colors.scaleType === ScaleType.Linear) {
      if (this.type === SeriesType.Standard) {
        color = this.colors.getColor(value);
      } else {
        color = this.colors.getColor(d.d1);
      }
    } else {
      color = this.colors.getColor(seriesName);
    }

    const data = Object.assign({}, d, {
      series: seriesName,
      value,
      name: label
    });

    return {
      classNames: [`circle-data-${i}`],
      value,
      label,
      data,
      cx,
      cy,
      radius,
      height,
      tooltipLabel,
      color,
      opacity,
      seriesName,
      gradientStops: this.getGradientStops(color),
      min: d.min,
      max: d.max
    };
  }

  getTooltipText({
    tooltipLabel,
    value,
    seriesName,
    min,
    max
  }: {
    tooltipLabel: string;
    value: any;
    seriesName: string;
    min: number;
    max: number;
  }): string {
    return `
      <span class="tooltip-label">${escapeLabel(seriesName)} • ${escapeLabel(tooltipLabel)}</span>
      <span class="tooltip-val">${value.toLocaleString()}${this.getTooltipMinMaxText(min, max)}</span>
    `;
  }

  getTooltipMinMaxText(min: number, max: number): string {
    if (min !== undefined || max !== undefined) {
      let result = ' (';
      if (min !== undefined) {
        if (max === undefined) {
          result += '≥';
        }
        result += min.toLocaleString();
        if (max !== undefined) {
          result += ' - ';
        }
      } else if (max !== undefined) {
        result += '≤';
      }
      if (max !== undefined) {
        result += max.toLocaleString();
      }
      result += ')';
      return result;
    } else {
      return '';
    }
  }

  getGradientStops(color: string): Gradient[] {
    return [
      {
        offset: 0,
        color,
        opacity: 0.2
      },
      {
        offset: 100,
        color,
        opacity: 1
      }
    ];
  }

  onClick(data: DataItem): void {
    this.select.emit(data);
  }

  isActive(entry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }

  activateCircle(): void {
    this.barVisible = true;
    this.activate.emit({ name: this.data.name });
  }

  deactivateCircle(): void {
    this.barVisible = false;
    this.circle.opacity = 0;
    this.deactivate.emit({ name: this.data.name });
  }
}
