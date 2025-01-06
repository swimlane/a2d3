import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TimelineChartComponent } from './timeline-chart.component';
import { TimelineSeriesComponent } from './timeline-series.component';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import { TimelineStackedComponent } from './timeline-stacked-chart.component';
import { TimelineTooltip } from './timeline-tooltip.component';

@NgModule({
  imports: [ChartCommonModule, BarChartModule],
  declarations: [
    TimelineChartComponent,
    TimelineStackedComponent,
    TimelineSeriesComponent,
    TimelineTooltip
  ],
  exports: [
    TimelineChartComponent,
    TimelineStackedComponent,
    TimelineSeriesComponent
  ]
})
export class TimelineChartModule {}
