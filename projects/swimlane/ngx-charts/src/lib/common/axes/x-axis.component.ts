import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import { ViewDimensions } from '../types/view-dimension.interface';

@Component({
  selector: 'g[ngx-charts-x-axis]',
  template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        [wrapTicks]="wrapTicks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="xOrient"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {
  @Input() xScale;
  @Input() dims: ViewDimensions;
  @Input() trimTicks: boolean;
  @Input() rotateTicks: boolean = true;
  @Input() maxTickLength: number;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel: boolean;
  @Input() labelText: string;
  @Input() ticks: any[];
  @Input() xAxisTickCount: number;
  @Input() xOrient: Orientation = Orientation.Bottom;
  @Input() xAxisOffset: number = 0;
  @Input() wrapTicks = false;

  @Output() dimensionsChanged = new EventEmitter();

  xAxisClassName: string = 'x axis';

  tickArguments: number[];
  transform: string;
  labelOffset: number = 0;
  fill: string = 'none';
  stroke: string = 'stroke';
  tickStroke: string = '#ccc';
  strokeWidth: string = 'none';
  padding: number = 5;

  readonly orientation = Orientation;

  @ViewChild(XAxisTicksComponent) ticksComponent: XAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    if (this.xOrient === Orientation.Bottom) {
      this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;
    } else {
      this.transform = `translate(0,${this.xAxisOffset + this.padding})`;
    }

    if (typeof this.xAxisTickCount !== 'undefined') {
      this.tickArguments = [this.xAxisTickCount];
    }
  }

  emitTicksHeight({ height }): void {
    if (height + 25 + 5 !== this.labelOffset && this.xOrient === Orientation.Bottom) {
      this.labelOffset = height + 25 + 5;
      setTimeout(() => {
        this.dimensionsChanged.emit({ height });
      }, 0);
    }
    else if (height + 25 !== this.labelOffset) {
      this.labelOffset = height + 25;
      setTimeout(() => {
        this.dimensionsChanged.emit({ height });
      }, 0);
    }
  }
}
