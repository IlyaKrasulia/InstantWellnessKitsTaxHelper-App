import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BORDER_RADIUS, COLORS, FONTS } from '@/utils/styles';
import { IFilters } from '@/pages/mainStack/OrdersList/components/Filters';

interface IProps {
    filters: IFilters;
    setFilters: (filters: IFilters) => void;
}

export const DateFilters = ({ filters, setFilters }: IProps) => {
    const fromDate = filters.FromDate ? new Date(filters.FromDate) : null;
    const toDate = filters.ToDate ? new Date(filters.ToDate) : null;

    const handleUpdate = (key: keyof IFilters, value: string) => {
        setFilters({
            ...filters,
            [key]: value,
        });
    };

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <DatePickerWrapper>
                <Label>From Date</Label>
                <DatePicker
                    selected={fromDate}
                    onChange={(date) => handleUpdate("FromDate", date?.toISOString())}
                    placeholderText="Select start date"
                    dateFormat="yyyy-MM-dd"
                />
            </DatePickerWrapper>

            <DatePickerWrapper>
                <Label>To Date</Label>
                <DatePicker
                    selected={toDate}
                    onChange={(date) => handleUpdate("ToDate", date?.toISOString())}
                    placeholderText="Select end date"
                    dateFormat="yyyy-MM-dd"
                    minDate={fromDate || undefined}
                />
            </DatePickerWrapper>
        </div>
    );
};

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 12px 16px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: ${BORDER_RADIUS.medium};
    font-family: ${FONTS.family};
    font-size: 14px;
    color: ${COLORS.textPrimary};
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${COLORS.primarySolid};
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }
  }

  .react-datepicker {
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    font-family: ${FONTS.family};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .react-datepicker__header {
    background-color: ${COLORS.surface};
    border-bottom: 1px solid ${COLORS.border};
  }

  .react-datepicker__day--selected {
    background-color: ${COLORS.primarySolid} !important;
    border-radius: 8px;
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
