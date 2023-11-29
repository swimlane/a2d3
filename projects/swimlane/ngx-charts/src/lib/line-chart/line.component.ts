import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  PLATFORM_ID,
  Inject,
  OnInit
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
import { Series } from '../models/chart-data.model';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'g[ngx-charts-line]',
  template: `
    <svg:g *ngIf="!isSSR">
      <svg:path
        [@animationState]="'active'"
        class="line"
        [attr.d]="initialPath"
        [attr.fill]="fill"
        [attr.stroke]="stroke"
        stroke-width="1.5px"
      />
    </svg:g>
    <svg:g *ngIf="isSSR">
      <svg:path class="line" [attr.d]="initialPath" [attr.fill]="fill" [attr.stroke]="stroke" stroke-width="1.5px" />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 2000
        }),
        animate(
          1000,
          style({
            strokeDashoffset: 0
          })
        )
      ])
    ])
  ]
})
export class LineComponent implements OnChanges, OnInit {
  @Input() path: string;
  @Input() stroke: string;
  @Input() data: Series;
  @Input() fill: string = 'none';
  @Input() animations: boolean = true;

  // @Output() select = new EventEmitter();

  initialized: boolean = false;
  initialPath: string;

  isSSR = false;

  constructor(private element: ElementRef, @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.isSSR = false // skip;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.initialized = true;
      this.initialPath = this.path;
    } else {
      this.updatePathEl();
    }
  }

  updatePathEl(): void {
    const node = select(this.element.nativeElement).select('.line');

    if (this.animations) {
      node.transition().duration(750).attr('d', this.path);
    } else {
      node.attr('d', this.path);
    }
  }
}
