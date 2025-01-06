import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaChartRiverComponent } from './area-chart-river.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaChartRiverComponent, AreaSeriesComponent],
  exports: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaChartRiverComponent, AreaSeriesComponent]
})
export class AreaChartModule {}
