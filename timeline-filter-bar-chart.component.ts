/* eslint-disable @typescript-eslint/no-shadow */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import { brushX } from 'd3-brush';
import { select, selection } from 'd3-selection';
import {
  BaseChartComponent,
  calculateViewDimensions,
  ColorHelper,
  id,
  ScaleType,
  ViewDimensions
} from 'projects/swimlane/ngx-charts/src/public-api';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-charts-timeline-filter-bar-chart',
  template: `
 <ng-container>
 <button
            style ="float:right"
            (click)="onClickReset()"
          >
            <span>Go Back</span>
          </button>
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="false"
      [animations]="animations"

      class="timeline-filter-bar-chart"
    >
    <svg:defs>
      <svg:clipPath [attr.id]="clipPathId">
        <svg:rect 
        [attr.width]="dims.width"
        [attr.height]="dims.height*2"
     />   
      </svg:clipPath>
      </svg:defs>
      
    <!-- </svg:defs> -->
      <svg:g [attr.transform]="transform" class="chart">
      <svg:g [attr.clip-path]="clipPath">

        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        </svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          (dimensionsChanged)="updateYAxisWidth($event)
          "
        ></svg:g>
        <svg:g [attr.clip-path]="clipPath">
        <svg:g
          ngx-charts-series-vertical
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          [animations]="animations"
          [noBarWhenZero]="noBarWhenZero"
          [tooltipDisabled]="true"
        ></svg:g>
        </svg:g>
      </svg:g>
      
    
      <svg:g [attr.transform]="transform" class="timeline">
        <svg:filter [attr.id]="filterId">
          <svg:feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
          />
        </svg:filter>
        <svg:rect x="0" [attr.width]="dims.width" y="0" [attr.height]="dims.height" class="brush-background" />
        <svg:g class="brush"></svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../../../../projects/swimlane/ngx-charts/src/lib/common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineFilterBarChartComponent extends BaseChartComponent {
  @Input() autoScale = false;
  @Input() schemeType: ScaleType = ScaleType.Ordinal;
  @Input() valueDomain: number[];
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() gradient;
  @Input() showGridLines: boolean = true;
  @Input() animations: boolean = true;
  @Input() noBarWhenZero: boolean = true;

  @Output() onFilter = new EventEmitter();

  dims: ViewDimensions;
  xSet: any;
  xDomain: any;
  yDomain: any;
  seriesDomain: any;
  yScale: any;
  xScale: any;
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  timeScale: any;
  colors: ColorHelper;
  scaleType: string;
  transform: string;
  margin: any[] = [10, 20, 10, 0];
  initialized: boolean = false;
  filterId: any;
  filter: any;
  clipPath:string;
  clipPathId:string;
  brush: any;
  myRatio: any;
  

  update(): void {
    super.update();
    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: false,
      legendType: this.schemeType
    });

    if(this.width){
      this.myRatio =[{mul:1,left:0}];
    }
    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();
    this.timeScale = this.getTimeScale(this.xDomain, this.dims.width);
    this.xScale = this.getXScale(this.xSet, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    this.setColors();
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    
    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
    if (this.brush) {
      this.updateBrush();
    }

    this.filterId = 'filter' + id().toString();
    this.filter = `url(#${this.filterId})`;

    if (!this.initialized) {
      this.addBrush();
      this.initialized = true;
    }
  }

  getXDomain(): any[] {
    const values = [];

    for (const d of this.results) {
      if (!values.includes(d.name)) {
        values.push(d.name);
      }
    }

    this.scaleType = this.getScaleType(values);
    let domain = [];

    const min = new Date(Math.min(...values));
    min.setHours(0);
    min.setMinutes(0);
    min.setSeconds(0);

    const max = new Date(Math.max(...values));
    max.setHours(23);
    max.setMinutes(59);
    max.setSeconds(59);

    domain = [min.getTime(), max.getTime()];

    this.xSet = values;
    return domain;
  }

  getYDomain(): any[] {
    if (this.valueDomain) {
      return this.valueDomain;
    }

    const domain = [];

    for (const d of this.results) {
      if (domain.indexOf(d.value) < 0) {
        domain.push(d.value);
      }
      if (d.min !== undefined) {
        if (domain.indexOf(d.min) < 0) {
          domain.push(d.min);
        }
      }
      if (d.max !== undefined) {
        if (domain.indexOf(d.max) < 0) {
          domain.push(d.max);
        }
      }
    }

    let min = Math.min(...domain);
    const max = Math.max(...domain);
    if (!this.autoScale) {
      min = Math.min(0, min);
    }

    return [min, max];
  }

  getXScale(domain, width): any {
    return scaleBand().range([0, width]).paddingInner(0.1).domain(domain);
  }

  getTimeScale(domain, width): any {
    return scaleTime().range([0, width]).domain(domain);
  }

  getYScale(domain, height): any {
    const scale = scaleLinear().range([height, 0]).domain(domain);

    return scale;
  }

  getScaleType(values): ScaleType {
    return ScaleType.Time;
  }

  trackBy(index, item): string {
    return `${item.name}`;
  }

  setColors(): void {
    let domain;
    if (this.schemeType === ScaleType.Ordinal) {
      domain = this.xSet;
    } else {
      domain = this.yDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onClickReset(){
    this.update();
    this.clearSelection();
  }



  addBrush(): void {
    if (this.brush) return;

    const height = this.height;
    const width = this.width;

    this.brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('brush', ({ selection }) => {
        const newSelection = selection || this.xScale.range();
        const newDomain = newSelection.map(this.timeScale.invert);

        this.onFilter.emit(newDomain);
        this.cd.markForCheck();
      })
      .on('end',({ selection}) => {
        if(!selection){
          // this.initialized=false
          this.update();
          // this.cd.markForCheck();
        }else{
          const newSelection=selection||this.xScale.range();
          this.updateRange(newSelection);
          this.clearSelection();
          this.cd.markForCheck();
          // select(this.chartElement.nativeElement).select('.brush').select('.selection').style('display','none');
        }
      
      });


    select(this.chartElement.nativeElement).select('.brush').call(this.brush);
  }

updateRange(span){
// eslint-disable-next-line @typescript-eslint/no-shadow
let selection=span
console.log(this.myRatio);
if(this.myRatio.length>1){
  const ratio=this.myRatio.pop();

  const sel1=(selection[0]-ratio.left)/ratio.mul
  const sel2=(selection[1]-ratio.left)/ratio.mul
selection=[sel1,sel2];
}
const selectedWidth =selection[1]-selection[0];
const mul=this.dims.width/selectedWidth;
const left=selection[0]*mul;

const newWidth=this.dims.width*mul;
this.myRatio.push({mul:mul,left: -left});
//实现放缩：
this.xScale=scaleBand().range([-left,newWidth-left]).paddingInner(0.1).domain(this.xSet)

// this.timeScale=scaleTime().range([-left,newWidth-left]).domain(this.xDomain);

const newSelection=selection||this.xScale.range();
const newDomain=newSelection.map(this.timeScale.invert);
// this.timeScale=scaleTime().range([-left,newWidth-left]).domain(this.xDomain);
// this.timeScale=scaleTime().range([-left,newWidth-left]).domain([newDomain[0].getTime(),newDomain[1].getTime()]);
this.timeScale=scaleTime().range([0,this.dims.width]).domain([newDomain[0].getTime(),newDomain[1].getTime()]);
}

clearSelection(){
  select(this.chartElement.nativeElement)
  .select('.brush')
  .select('.selection')
  .style('display','none')
  .attr('x',null)
  .attr('y',null)
  .attr('width',null)
  .attr('height',null)
  select(this.chartElement.nativeElement)
 .select('.brush')
 .selectAll('.handle')
 .style('dispaly','none')
 .attr('x',null)
.attr('y',null)
.attr('width',null)
.attr('height',null);

}
  updateBrush(): void {
    if (!this.brush) return;

    const height = this.dims.height;
    const width = this.dims.width;

    this.brush.extent([
      [0, 0],
      [width, height]
    ]);
    select(this.chartElement.nativeElement).select('.brush').call(this.brush);

    // clear hardcoded properties so they can be defined by CSS
    select(this.chartElement.nativeElement)
      .select('.selection')
      .attr('fill', undefined)
      .attr('stroke', undefined)
      .attr('fill-opacity', undefined);

    this.cd.markForCheck();
  }
}
