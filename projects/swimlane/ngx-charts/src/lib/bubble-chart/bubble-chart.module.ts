import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';
import { BubbleChart2DComponent } from './bubble-chart-2d.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [BubbleChartComponent, BubbleSeriesComponent, BubbleChart2DComponent],
  exports: [BubbleChartComponent, BubbleSeriesComponent, BubbleChart2DComponent]
})
export class BubbleChartModule {}
