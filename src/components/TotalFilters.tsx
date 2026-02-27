import styled from "styled-components";
import { BORDER_RADIUS, COLORS, FONTS } from "@/utils/styles";
import { IFilters } from "@/pages/mainStack/OrdersList/components/Filters";

interface IProps {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}

export const TotalFilters = ({ filters, setFilters }: IProps) => {
  const handleUpdate = (key: keyof IFilters, value: any) => {
    const processedValue = value === "" ? null : Number(value);

    setFilters({
      ...filters,
      [key]: processedValue,
    });
  };

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <InputWrapper>
        <Label>Min Total</Label>
        <StyledInput
          type="number"
          placeholder="0.00"
          value={filters.MinTotal ?? ""}
          onChange={(e) => handleUpdate("MinTotal", e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Max Total</Label>
        <StyledInput
          type="number"
          placeholder="9999.99"
          value={filters.MaxTotal ?? ""}
          onChange={(e) => handleUpdate("MaxTotal", e.target.value)}
        />
      </InputWrapper>
    </div>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  border-radius: ${BORDER_RADIUS.medium};
  font-family: ${FONTS.family};
  font-size: 14px;
  color: ${COLORS.textPrimary};
  transition: all 0.2s ease;
  width: 150px;

  &:focus {
    outline: none;
    border-color: ${COLORS.primarySolid};
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Label = styled.label`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  font-size: 14px;
  color: ${COLORS.gray};
  padding-left: 4px;
  margin-bottom: 8px;
  display: block;
`;
