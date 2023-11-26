import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';

@Component({
  selector: 'g[ngx-charts-calendar-pie-cell]',
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <svg:rect
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        [attr.fill]="'rgba(200,200,200,0.03)'"
        class="cell"
        (click)="onClick()"
      />
      <svg:g [attr.transform]="textTransform">
        <svg:text
          [attr.font-size]="textFontSize + 'px'" 
          class="calendar-date"
        >
          {{ date }}
        </svg:text>
      </svg:g>
      <svg:g [attr.transform]="pieTransform">
        <ng-content></ng-content>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPieCellComponent implements OnChanges {
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() pieWidth: number;
  @Input() pieHeight: number;
  @Input() date: any;

  @Output() select: EventEmitter<number> = new EventEmitter();
  @Output() activate: EventEmitter<number> = new EventEmitter();
  @Output() deactivate: EventEmitter<number> = new EventEmitter();

  element: HTMLElement;
  transform: string;
  startOpacity: number;
  gradientId: string;
  gradientUrl: string;
  gradientStops: Gradient[];
  pieTransform: string;
  textTransform: string;
  textFontSize: number;

  barOrientation = BarOrientation;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(): void {
    this.transform = `translate(${this.x} , ${this.y})`;
    this.pieTransform = `translate(${this.width / 2 - this.pieWidth / 2}, ${this.height / 2 - this.pieHeight / 2})`;
    this.textTransform = `translate(${this.width / 50}, ${this.height / 50})`;
    this.textFontSize = Math.min(this.width, this.height) * 0.2;
  }

  onClick(): void {
    this.select.emit(this.date);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.date);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.date);
  }
}
