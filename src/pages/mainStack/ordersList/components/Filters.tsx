import { CustomButton } from "@/components/CustomButton";
import { DateFilters } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { TotalFilters } from "@/components/TotalFilters";
import { COUNTY_OPTIONS, NY_LOCATIONS } from "@/utils/locations";
import { SPACING } from "@/utils/styles";
import { Dispatch, SetStateAction, useMemo } from "react";
import "react-dropdown/style.css";
import styled from "styled-components";

const sortByOptions = ["Price", "Time", "TaxAmount"];
const sourceOptions = ["All", "Manual", "Import"];

const initialFilters: IFilters = {
  SortBy: "Price",
  SortDescending: "True",
  Source: "All",
  FromDate: "",
  ToDate: "",
  MinTotal: null,
  MaxTotal: null,
  County: "",
  City: "",
  OrderImportId: "",
  Jurisdiction: ""
};

export interface IFilters {
  FromDate: string;
  ToDate: string;
  County: string;
  City: string;
  Jurisdiction: string;
  MinTotal: null | number;
  MaxTotal: null | number;
  SortBy: string;
  SortDescending: string;
  Source: string;
  OrderImportId: string;
}

interface IProps {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const Filters = ({ filters, setFilters }: IProps) => {
  const handleUpdate = (key: keyof IFilters, value: string | number | null) => {
    setFilters((prev) => ({
    ...prev,
    [key]: value,
  }));
  };

  const availableCities = useMemo(
    () => (filters.County ? NY_LOCATIONS[filters.County] || [] : []),
    [filters],
  );

  const onClear = () => {
    setFilters(initialFilters);
  };

  return (
    <FilterRow>
      <Dropdown
        label="County"
        options={COUNTY_OPTIONS}
        value={filters?.County || "All"}
        onChange={(val) => {
          handleUpdate("County", val);
          handleUpdate("City", "");
        }}
      />

      {availableCities.length ? <Dropdown
        label="City"
        options={availableCities}
        value={filters?.City || "All"}
        onChange={(val) => handleUpdate("City", val)}
      /> : null}

      <Dropdown
        label="Sort By"
        options={sortByOptions}
        value={filters?.SortBy || "All"}
        onChange={(val) => handleUpdate("SortBy", val)}
      />

      <Dropdown
        label="Sort Descending"
        options={["True", "False"]}
        value={filters?.SortDescending || "True"}
        onChange={(val) => handleUpdate("SortDescending", val)}
      />

      <Dropdown
        label="Source"
        options={sourceOptions}
        value={filters?.Source || "All"}
        onChange={(val) => handleUpdate("Source", val)}
      />

      <DateFilters filters={filters} setFilters={setFilters} />

      <TotalFilters filters={filters} setFilters={setFilters} />

      <CustomButton size="small" variant="error" onClick={onClear}>Clear Filters</CustomButton>
    </FilterRow>
  );
};

const FilterRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin: ${SPACING.lg} 0;
  flex-wrap: wrap;
  row-gap: 10px;
`;
