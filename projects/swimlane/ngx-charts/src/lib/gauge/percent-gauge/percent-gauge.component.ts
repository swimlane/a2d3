import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { BaseChartComponent } from '../../common/base-chart.component';
import { calculateViewDimensions } from '../../common/view-dimensions.helper';
import { ColorHelper } from '../../common/color.helper';
import { ViewDimensions } from '../../common/types/view-dimension.interface';
import { ScaleType } from '../../common/types/scale-type.enum';
import { id } from '../../utils/id';

@Component({
  selector: 'ngx-charts-percent-gauge',
  template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g class="percent-gauge chart" (click)="onClick()">
        <svg:g [attr.transform]="transform">
          <mask [attr.id]="circleMaskId">
            <circle
              [attr.r]="radius"
              [style.stroke-width]="radius / 5"
              cx="0"
              cy="0"
              stroke="white"
              fill="transparent"
              [attr.stroke-dasharray]="circumference"
              transform="rotate(-90,0,0)"
              [style.stroke-dashoffset]="circumference * (1 - percent / 100)"
            />
          </mask>
          <text x="0" y="0" stroke="none" class="total" [style.font-size]="valueFontSize">
            {{ displayValue }}
          </text>
          <circle
            class="dashes-back"
            [style.stroke-width]="radius / 5"
            [attr.r]="radius"
            cx="0"
            cy="0"
            fill="none"
            [style.stroke-dasharray]="dashes"
          />

          <svg:g [attr.mask]="'url(#' + circleMaskId + ')'">
            <svg:g [attr.transform]="circleTransform">
              <svg:g *ngFor="let tic of ticks" [attr.transform]="tic.transform">
                <rect
                  [attr.y]="-tic.height / 2"
                  [attr.x]="-tic.width"
                  [attr.width]="tic.width"
                  [attr.height]="tic.height"
                  [attr.fill]="tic.fill"
                />
              </svg:g>
            </svg:g>
          </svg:g>

          <svg:g [attr.transform]="targetTransform">
            <circle
              class="target-circle-bg"
              [attr.r]="targetRadius"
              [style.stroke-width]="targetRadius / 10"
              [attr.cx]="-targetRadius / 2"
              [attr.cy]="-targetRadius / 2"
            />
            <circle
              *ngIf="percent >= target"
              class="target-circle"
              [attr.r]="targetRadius"
              [style.stroke-width]="targetRadius / 10"
              [attr.stroke]="targetColor"
              [attr.cx]="-targetRadius / 2"
              [attr.cy]="-targetRadius / 2"
            />
            <svg:g [attr.transform]="targetTextTransform">
              <text
                transform="translate(0, -4)"
                class="target-label"
                stroke="none"
                text-anchor="middle"
                [style.font-size]="12"
              >
                {{ targetLabel }}
              </text>
              <text
                transform="translate(0, 11)"
                class="target-value"
                stroke="none"
                text-anchor="middle"
                [style.font-size]="14"
              >
                {{ target }}%
              </text>
            </svg:g>
          </svg:g>
        </svg:g>
        <svg:g *ngIf="showLabel" [attr.transform]="labelTransform">
          <text class="gauge-label" x="50%" dominant-baseline="middle" text-anchor="middle" stroke="none">
            {{ label }}
          </text>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../../common/base-chart.component.scss', './percent-gauge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PercentGaugeComponent extends BaseChartComponent {
  @Input() max: number = 100;
  @Input() value: number = 0;
  @Input() target: number = 75;
  @Input() targetLabel: string = 'Target';
  @Input() label: string;
  @Input() valueFormatting: any;
  @Input() showLabel = true;

  defaultMargin: number[] = [20, 40, 20, 40];
  margin: number[] = [20, 40, 20, 40];
  dims: ViewDimensions;

  colors: ColorHelper;
  radius: number;
  transform: string;

  targetTransform: string;
  targetColor: string;
  targetRadius: number;
  targetTextTransform: string;

  circleMaskId: string;
  circleTransform: string;
  ticks: any[] = [];
  ticHeight: number;

  dashes: string;

  valueDomain: [number, number];
  valueFontSize: number;
  displayValue: string;
  percent: number;
  circumference: number;

  labelTransform: string;

  update(): void {
    super.update();

    this.circleMaskId = `circleMask${id()}`;

    this.margin = [...this.defaultMargin];
    if (this.showLabel) {
      this.margin[2] = 50;
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

    this.percent = this.getPercentage();
    this.ticHeight = Math.min(this.dims.width, this.dims.height) / 10;
    this.radius = Math.min(this.dims.width, this.dims.height) / 2 - this.ticHeight / 2;
    this.circumference = 2 * Math.PI * this.radius;
    this.dashes = `${this.radius / 60} ${this.circumference / 60 - this.radius / 60}`;
    this.valueFontSize = Math.floor(this.radius / 3);
    this.targetRadius = this.radius / 4;
    this.targetTextTransform = `translate(${-this.targetRadius / 2}, ${-this.targetRadius / 2}), scale(${
      this.targetRadius / 28
    })`;

    this.valueDomain = this.getValueDomain();
    this.displayValue = this.getDisplayValue();

    this.setColors();
    this.targetColor = this.colors.getColor((this.target / 100) * this.max);

    const xOffset = this.margin[3] + this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;

    this.transform = `translate(${xOffset}, ${yOffset})`;
    this.labelTransform = `translate(0, ${this.height / 2 + this.radius + this.margin[0] + this.ticHeight / 2 - 3})`;

    const angle = (this.target / 100) * Math.PI * 2 - Math.PI / 2;
    this.targetTransform = `translate(${this.radius * 0.97 * Math.cos(angle) + this.targetRadius / 2}, ${
      this.radius * 0.97 * Math.sin(angle) + this.targetRadius / 2
    })`;

    this.generateticks();

    this.cd.markForCheck();
  }

  generateCirclePoints(radius: number, numPoints: number): { x: number; y: number }[] {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      points.push({ x, y });
    }
    return points;
  }

  generateticks() {
    const numPoints = 60;
    const points = this.generateCirclePoints(this.radius, numPoints);
    this.ticks = [];
    this.circleTransform = `rotate(-90,0,0)`;
    for (let j = 0; j < points.length; j++) {
      const { x, y } = points[j];
      let progress = j / numPoints;
      if (progress === 1) {
        progress = 0;
      }
      this.ticks.push({
        height: this.ticHeight,
        width: this.radius / 60,
        fill: this.colors.getColor(progress * this.max),
        transform: `translate(${x}, ${y}), rotate(${360 * progress - 90})`
      });
    }
  }

  getValueDomain(): [number, number] {
    return [0, this.max];
  }

  getDisplayValue(): string {
    if (this.valueFormatting) {
      return this.valueFormatting(this.value);
    }
    return this.percent + '%';
  }

  getPercentage(): number {
    return Math.round((this.value / this.max) * 100);
  }

  onClick(): void {
    this.select.emit({
      name: 'Value',
      value: this.value
    });
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Linear, this.valueDomain, this.customColors);
  }
}
