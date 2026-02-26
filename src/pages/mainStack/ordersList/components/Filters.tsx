import { CustomInput } from "@/components/CustomInput";
import { Dropdown } from "@/components/Dropdown";
import { COLORS, FONTS, SPACING } from "@/utils/styles";
import { useState } from "react";
import 'react-dropdown/style.css';
import styled from "styled-components";

const counties = ['New York', 'Los Angeles', 'Cook', 'Harris'];
const cities = ['Manhattan', 'Brooklyn', 'Queens', 'Long Island'];


export const Filters = () => {
    const [activeCounty, setActiveCounty] = useState(counties[0]);
    const [activeCity, setActiveCity] = useState(cities[0]);

    return (
        <FilterRow>
            <CustomInput fullWidth placeholder="Search..." label="Search" />
            <Dropdown
                label="County"
                options={counties}
                value={activeCounty}
                onChange={setActiveCounty}
            />
            <Dropdown
                label="City"
                options={cities}
                value={activeCity}
                onChange={setActiveCity}
            />
        </FilterRow>)
}

const FilterRow = styled.div`
  display: flex;
  gap: 20px;
  margin: ${SPACING.lg} 0;
  align-items: flex-end;
`;
