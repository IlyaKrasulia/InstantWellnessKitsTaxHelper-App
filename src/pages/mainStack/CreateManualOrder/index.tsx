import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { SPACING } from "@/utils/styles";
import styled from "styled-components";

export const CreateManualOrder = () => {
  return (
    <Container>
      <div>
        <TopInputs>
          <CustomInput
            sizeVariant="large"
            fullWidth
            label="Latitude (lat)"
            placeholder="e.g. 50.4501"
          />
          <CustomInput
            sizeVariant="large"
            fullWidth
            label="Longitude (lon)"
            placeholder="e.g. 30.5234"
          />
        </TopInputs>
        <CustomInput
          sizeVariant="large"
          fullWidth
          label="Subtotal Amount"
          placeholder="0.00"
          type="number"
        />
      </div>
      <Footer>
        <CustomButton
          size="large"
          variant="error"
          style={{ width: "100%" }}
        >
          Clear Form
        </CustomButton>
        <CustomButton size="large" style={{ width: "100%" }}>
          Save & Calculate
        </CustomButton>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const TopInputs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${SPACING.lg};
  margin: ${SPACING.lg} 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${SPACING.lg};
`;
