import { Component, Input, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Orientation } from '../types/orientation.enum';

@Component({
  selector: 'g[ngx-charts-axis-label]',
  template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisLabelComponent implements OnChanges {
  @Input() orient: Orientation;
  @Input() label: string;
  @Input() offset: number;
  @Input() width: number;
  @Input() height: number;

  x: number;
  y: number;
  transform: string;
  strokeWidth: string;
  textAnchor: string;
  element: ElementRef;
  textHeight = 25;
  margin = 5;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.strokeWidth = '0.01';
    this.textAnchor = 'middle';
    this.transform = '';

    switch (this.orient) {
      case Orientation.Top:
        this.y = -this.offset;
        this.x = this.width / 2;
        break;
      case Orientation.Bottom:
        this.y = this.offset;
        this.x = this.width / 2;
        break;
      case Orientation.Left:
        this.y = -(this.offset + this.textHeight + this.margin);
        this.x = -this.height / 2;
        this.transform = 'rotate(270)';
        break;
      case Orientation.Right:
        this.y = this.offset + this.margin;
        this.x = -this.height / 2;
        this.transform = 'rotate(270)';
        break;
      default:
    }
  }
}
