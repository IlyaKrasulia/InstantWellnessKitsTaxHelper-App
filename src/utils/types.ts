export interface OrderListItem {
  id: string; // Guid
  latitude: number;
  longitude: number;
  subtotal: number;
  timestamp: string; // ISO 8601 string
  composite_tax_rate: number;
  tax_amount: number;
  total_amount: number;
  breakdown: OrderTaxBreakdownDto | null;
  jurisdictions: OrderJurisdictionDto[];
}

export interface OrderJurisdictionDto {
  type: string; // JurisdictionType enum
  name: string;
  code: string | null;
}

export interface OrderTaxBreakdownDto {
  state_rate: number;
  county_rate: number | null;
  city_rate: number | null;
  special_rates: SpecialRateDto[];
}

export interface SpecialRateDto {
  name: string;
  rate: number;
}

export interface ITaxStats {
  [key: string]: number;
}

export interface IImportMetrics {
  orderImportId: string;
  sourceFileName: string;
  createdAt: string; // ISO Date string
  rowsTotal: number;
  rowsProcessed: number;
  rowsWithTax: number;
  rowsWithZeroTax: number;
  matchCityAndCounty: number;
  matchCountyOnly: number;
  matchNoMatch: number;
  totalSubtotal: number;
  totalTax: number;
  weightedAvgCompositeRate: number;
  copyingMs: number;
  spatialMs: number;
  taxResolveMs: number;
  computeMs: number;
  insertMs: number;
  totalMs: number;
  slowestStep: string;
  slowestStepMs: number;
}

export interface IOrderPoint {
  orderImportId: string;
  rowId: number;
  latitude: number;
  longitude: number;
}

export interface IOrderImportResponse {
  success: boolean;
  orderImportId: string;
  errorMessage: string | null;
  rowsWithZeroTax: number;
  zeroTaxReasons: ITaxStats;
  countyTaxesAppliedAndItsNumber: ITaxStats;
  cityTaxesAppliedAndItsNumber: ITaxStats;
  specialTaxesAppliedAndItsNumber: ITaxStats;
  composedTaxesResultsAndItsNumbers: ITaxStats;
  cityLookupMissesAndItsNumber: ITaxStats;
  metrics: IImportMetrics;
  pointsAdded: IOrderPoint[];
}

export interface ISpecialRate {
  name: string;
  rate: number;
}

export interface ITaxBreakdown {
  state_rate: number;
  county_rate: number;
  city_rate: number;
  special_rates: ISpecialRate[];
}

export interface IJurisdiction {
  type: "State" | "County" | "City" | "Special";
  name: string;
  code: string;
}

export interface IOrderDetail {
  id: string; // UUID
  orderImportId: string; // UUID
  rowId: number;
  latitude: number;
  longitude: number;
  subtotal: number;
  timestamp: string; // ISO 8601 Date
  createdAt: string; // ISO 8601 Date
  source: string;
  county: string;
  city: string;
  compositeTaxRate: number;
  taxAmount: number;
  totalAmount: number;
  breakdown: ITaxBreakdown;
  jurisdictions: IJurisdiction[];
}
