/* eslint-disable @typescript-eslint/no-empty-interface */

import { IVector2D } from './coordinates.model';

export type StringOrNumberOrDate = string | number | Date;

export interface DataItem {
  name: StringOrNumberOrDate;
  value: number;
  extra?: any;
  min?: number;
  max?: number;
  label?: string;
}

export interface SingleSeries extends Array<DataItem> {}

export interface Series {
  name: StringOrNumberOrDate;
  series: DataItem[];
}

export interface MultiSeries extends Array<Series> {}

export interface AreaChartDataItem extends DataItem {
  d0: number;
  d1: number;
}

export interface AreaChartSeries {
  name: StringOrNumberOrDate;
  series: AreaChartDataItem[];
}

export interface PieGridData {
  data: PieGridDataItem;
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface PieGridDataItem extends DataItem {
  percent: number;
  total: number;
  value: number;
}

export interface BubbleChartDataItem {
  name: StringOrNumberOrDate;
  x: StringOrNumberOrDate;
  y: StringOrNumberOrDate;
  r: number;
  extra?: any;
}

export interface BubbleChartSeries {
  name: StringOrNumberOrDate;
  series: BubbleChartDataItem[];
}

export interface BubbleChartMultiSeries extends Array<BubbleChartSeries> {}

export interface TreeMapDataItem {
  name: StringOrNumberOrDate;
  size?: number;
  children?: TreeMapDataItem[];
  extra?: any;
}

export interface TreeMapData extends Array<TreeMapDataItem> {}

export interface SankeyObject {
  source: string;
  target: string;
  value: number;
}

export interface SankeyData extends Array<SankeyObject> {}

export interface BoxChartSeries {
  name: StringOrNumberOrDate;
  series: DataItem[];
}

export interface BoxChartMultiSeries extends Array<BoxChartSeries> {}

export interface TimelineStandardDataItem {
  name: StringOrNumberOrDate;
  startTime: Date;
  endTime: Date;
}

export interface TimelineStandardData extends Array<TimelineStandardDataItem> {}

export interface TimelineStackedDataItem {
  name: StringOrNumberOrDate;
  series: TimelineStandardDataItem[];
}

export interface TimelineStackedData extends Array<TimelineStackedDataItem> {}

export interface IBoxModel {
  value: number | Date;
  label: StringOrNumberOrDate;
  data: DataItem[];
  formattedLabel: string;
  height: number;
  width: number;
  x: number;
  y: number;
  roundEdges: boolean;
  lineCoordinates: IVector2D[];
  quartiles: number[];
  tooltipText?: string;
  ariaLabel?: string;
  color?: string;
  // TODO: Replace by IColorGradient Interface
  gradientStops?: Array<{ offset: number; color: string; opacity: number }>;
}
