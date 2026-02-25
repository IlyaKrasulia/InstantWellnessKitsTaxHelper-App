import { OrderListItem } from "@/utils/types";

export const MOCK_ORDERS: OrderListItem[] = [
  {
    id: "7c84ff-b2a1-4e81",
    latitude: 50.4501,
    longitude: 30.5234,
    subtotal: 1250.0,
    timestamp: "2026-02-26T10:30:00Z",
    composite_tax_rate: 0.0825,
    tax_amount: 103.13,
    total_amount: 1353.13,
    breakdown: null,
    jurisdictions: [{ type: "State", name: "California", code: "CA" }],
  },
  {
    id: "88c002-a4f2-11ed",
    latitude: 40.7128,
    longitude: -74.006,
    subtotal: 890.5,
    timestamp: "2026-02-25T14:20:00Z",
    composite_tax_rate: 0.045,
    tax_amount: 40.07,
    total_amount: 930.57,
    breakdown: null,
    jurisdictions: [{ type: "City", name: "New York", code: "NYC" }],
  },
  {
    id: "a1b2c3-d4e5-6789",
    latitude: 34.0522,
    longitude: -118.2437,
    subtotal: 450.75,
    timestamp: "2026-02-24T09:15:00Z",
    composite_tax_rate: 0.0725,
    tax_amount: 32.67,
    total_amount: 483.42,
    breakdown: null,
    jurisdictions: [
      { type: "County", name: "Los Angeles County", code: "LAC" },
    ],
  },
];
