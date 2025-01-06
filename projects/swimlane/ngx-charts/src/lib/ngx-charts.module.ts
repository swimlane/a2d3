import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { BarChartModule } from './bar-chart/bar-chart.module';
import { BoxChartModule } from './box-chart/box-chart.module';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { HeatMapModule } from './heat-map/heat-map.module';
import { LineChartModule } from './line-chart/line-chart.module';
import { PolarChartModule } from './polar-chart/polar-chart.module';
import { NumberCardModule } from './number-card/number-card.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
import { TreeMapModule } from './tree-map/tree-map.module';
import { GaugeModule } from './gauge/gauge.module';
import { ngxChartsPolyfills } from './polyfills';
import { CalendarPieModule } from './calendar-pie/calendar-pie.module';
import { SankeyModule } from './sankey/sankey.module';

@NgModule({
  exports: [
    ChartCommonModule,
    AreaChartModule,
    BarChartModule,
    BoxChartModule,
    BubbleChartModule,
    HeatMapModule,
    CalendarPieModule,
    SankeyModule,
    LineChartModule,
    PolarChartModule,
    NumberCardModule,
    PieChartModule,
    TreeMapModule,
    GaugeModule
  ]
})
export class NgxChartsModule {
  constructor() {
    ngxChartsPolyfills();
  }
}
