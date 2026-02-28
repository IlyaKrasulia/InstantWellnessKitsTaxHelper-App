import { CustomButton } from "@/components/CustomButton";
import { SPACING } from "@/utils/styles";
import { Dispatch, SetStateAction } from "react";
import "react-dropdown/style.css";
import styled from "styled-components";
import { DateFilters } from "./DatePicker";

const initialFilters: IFilters = {
  FromDate: "",
  ToDate: "",
};

export interface IFilters {
  FromDate: string;
  ToDate: string;
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

  const onClear = () => {
    setFilters(initialFilters);
  };

  return (
    <FilterRow>
      <DateFilters filters={filters} setFilters={setFilters} />

      <CustomButton size="small" variant="error" onClick={onClear}>
        Clear Filters
      </CustomButton>
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
