import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { select } from 'd3-selection';
import { id } from '../../utils/id';
import { ScaleType } from '../types/scale-type.enum';
import { ViewDimensions } from '../types/view-dimension.interface';

@Component({
  selector: 'g[ngx-charts-timeline]',
  template: `
    <svg:g class="timeline" [attr.transform]="transform">
      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        />
      </svg:filter>
      <svg:g class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>
      <svg:rect x="0" [attr.width]="view[0]" y="0" [attr.height]="height" class="brush-background" />
      <svg:g class="brush"></svg:g>
    </svg:g>
  `,
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timeline implements OnChanges {
  @Input() view: [number, number];
  @Input() declare results; // type this
  @Input() scheme; // type this
  @Input() customColors; // type this
  @Input() legend: boolean;
  @Input() autoScale: boolean;
  @Input() scaleType: ScaleType;
  @Input() height: number = 50;
  @Input() xScale: any;

  @Output() select = new EventEmitter();
  @Output() onDomainChange = new EventEmitter();

  element: HTMLElement;
  dims: ViewDimensions;
  xDomain: any[];
  brush: any;
  transform: string;
  initialized: boolean = false;
  filterId: string;
  filter: string;

  constructor(element: ElementRef, private cd: ChangeDetectorRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();

    if (!this.initialized) {
      this.addBrush();
      this.initialized = true;
    }
  }

  update(): void {
    this.dims = this.getDims();
    this.height = this.dims.height;
    const offsetY = this.view[1] - this.height;

    if (this.brush) {
      this.updateBrush();
    }

    this.transform = `translate(0 , ${offsetY})`;

    this.filterId = 'filter' + id().toString();
    this.filter = `url(#${this.filterId})`;

    this.cd.markForCheck();
  }

  getXDomain(): any[] {
    let values = [];

    for (const results of this.results) {
      for (const d of results.series) {
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    let domain = [];
    if (this.scaleType === ScaleType.Time) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === ScaleType.Linear) {
      values = values.map(v => Number(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }

    return domain;
  }

  getXScale() {
    let scale;

    if (this.scaleType === ScaleType.Time) {
      scale = scaleTime().range([0, this.dims.width]).domain(this.xDomain);
    } else if (this.scaleType === ScaleType.Linear) {
      scale = scaleLinear().range([0, this.dims.width]).domain(this.xDomain);
    } else if (this.scaleType === ScaleType.Ordinal) {
      scale = scalePoint().range([0, this.dims.width]).padding(0.1).domain(this.xDomain);
    }

    return scale;
  }

  addBrush(): void {
    if (this.brush) return;

    const height = this.height;
    const width = this.view[0];

    this.brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('brush end', ({ selection }) => {
        const newSelection = selection || this.xScale.range();
        const newDomain = newSelection.map(this.xScale.invert);

        this.onDomainChange.emit(newDomain);
        this.cd.markForCheck();
      });

    select(this.element).select('.brush').call(this.brush);
  }

  updateBrush(): void {
    if (!this.brush) return;

    const height = this.height;
    const width = this.view[0];

    this.brush.extent([
      [0, 0],
      [width, height]
    ]);
    select(this.element).select('.brush').call(this.brush);

    // clear hardcoded properties so they can be defined by CSS
    select(this.element)
      .select('.selection')
      .attr('fill', undefined)
      .attr('stroke', undefined)
      .attr('fill-opacity', undefined);

    this.cd.markForCheck();
  }

  getDims(): ViewDimensions {
    const width = this.view[0];

    const dims = {
      width,
      height: this.height
    };

    return dims;
  }
}
