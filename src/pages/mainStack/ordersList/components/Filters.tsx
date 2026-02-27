import { CustomInput } from "@/components/CustomInput";
import { Dropdown } from "@/components/Dropdown";
import { COLORS, FONTS, SPACING } from "@/utils/styles";
import { OrderListItem } from "@/utils/types";
import { useState } from "react";
import "react-dropdown/style.css";
import styled from "styled-components";

const TAX_CITIES = [
  "Norwich",
  "Ogdensburg",
  "Rome",
  "Mount Vernon",
  "Glens Falls",
  "Salamanca",
  "Ogdensburg",
  "Rome",
  "Mount Vernon",
  "Glens Falls",
  "Salamanca",
  "Johnstown",
  "New Rochelle",
  "Oneida",
  "Saratoga Springs",
  "Yonkers",
  "White Plains",
  "Oswego",
  "Utica",
  "Gloversville",
  "Ithaca",
  "Olean",
  "Auburn",
];

const TAX_COUNTIES = [
  "Dutchess",
  "Schenectady",
  "Cortland",
  "Tioga",
  "St. Lawrence",
  "Bronx",
  "Orange",
  "Clinton",
  "Sullivan",
  "Otsego",
  "Ulster",
  "Suffolk",
  "Albany",
  "Montgomery",
  "Schuyler",
  "Chemung",
  "Cayuga",
  "Putnam",
  "Hamilton",
  "Wayne",
  "Delaware",
  "Erie",
  "Wyoming",
  "Onondaga",
  "Rensselaer",
  "Yates",
  "Richmond",
  "Queens",
  "Rockland",
  "Allegany",
  "Schoharie",
  "Oneida",
  "Warren",
  "Greene",
  "Tompkins",
  "Ontario",
  "Fulton",
  "Chenango",
  "Franklin",
  "Madison",
  "Chautauqua",
  "Monroe",
  "Jefferson",
  "Livingston",
  "Herkimer",
  "New York",
  "Lewis",
  "Broome",
  "Seneca",
  "Steuben",
  "Essex",
  "Oswego",
  "Cattaraugus",
  "Nassau",
  "Niagara",
  "Columbia",
  "Kings",
  "Orleans",
  "Westchester",
  "Saratoga",
  "Genesee",
  "Washington",
];

const counties = ["New York", "Los Angeles", "Cook", "Harris"];
const cities = ["Manhattan", "Brooklyn", "Queens", "Long Island"];

interface IFilters {
  FromDate: string;
  ToDate: string;
  County: string;
  City: string;
  Jurisdiction: string;
  MinTotal: null | number;
  MaxTotal: null | number;
  SortBy: string;
  SortDirection: boolean;
  Source: string;
  OrderImportId: string;
}

interface IProps {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}

export const Filters = ({ filters, setFilters }: IProps) => {
  const handleUpdate = (key: keyof IFilters, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <FilterRow>
      <Dropdown
        label="County"
        options={TAX_COUNTIES}
        // Беремо значення безпосередньо з об'єкта фільтрів
        value={filters.County}
        onChange={(val) => handleUpdate("County", val)}
      />

      <Dropdown
        label="City"
        options={TAX_CITIES}
        value={filters.City}
        onChange={(val) => handleUpdate("City", val)}
      />

      {/* <Dropdown
        label="Jurisdiction"
        options={jurisdictions}
        value={filters.Jurisdiction}
        onChange={(val) => handleUpdate("Jurisdiction", val)}
      /> */}
    </FilterRow>
  );
};

const FilterRow = styled.div`
  display: flex;
  gap: 20px;
  margin: ${SPACING.lg} 0;
  align-items: flex-end;
`;
