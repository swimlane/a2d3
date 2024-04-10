import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { select } from 'd3-selection';
import { Series } from '../models/chart-data.model';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'g[ngx-charts-line]',
  template: `
    <svg:g *ngIf="!isSSR">
      <svg:path
        @toggleAnimation
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
    trigger('toggleAnimation', [
      transition(':enter', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
        }),
        animate(
          '800ms 500ms',
          style({
            strokeDasharray: 2000,
            strokeDashoffset: 0,
          })
        )
      ]),
      transition(':leave', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 0,
        }),
        animate(
          '800ms',
          style({
            strokeDasharray: 2000,
            strokeDashoffset: -2000,
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
      this.isSSR = true;
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
