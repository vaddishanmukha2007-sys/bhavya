
export interface Location {
  lat: number;
  lng: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface AnalysisParams {
  location: Location | null;
  dateRange: DateRange;
  vegetationIndex: string;
  userRole: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface AnalysisText {
  overview: string;
  phenologyTrends: string;
  ecologicalImpacts: string;
  predictions: string;
}

export interface AnalysisResult {
  analysisText: AnalysisText;
  timeSeriesData: ChartDataPoint[];
}
