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