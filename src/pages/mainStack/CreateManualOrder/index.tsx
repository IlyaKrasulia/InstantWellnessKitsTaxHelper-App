import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { SPACING } from "@/utils/styles";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ManualOrderData, manualOrderSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateManualOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ManualOrderData>({
    resolver: zodResolver(manualOrderSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ManualOrderData) => {
    console.log("Saving order:", data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TopInputs>
          <CustomInput
            sizeVariant="large"
            fullWidth
            label="Latitude (lat)"
            placeholder="e.g. 50.4501"
            error={errors.lat?.message}
            {...register("lat")}
          />
          <CustomInput
            sizeVariant="large"
            fullWidth
            label="Longitude (lon)"
            placeholder="e.g. 30.5234"
            error={errors.lon?.message}
            {...register("lon")}
          />
        </TopInputs>
        <CustomInput
          sizeVariant="large"
          fullWidth
          label="Subtotal Amount"
          placeholder="0.00"
          error={errors.subtotal?.message}
          {...register("subtotal")}
        />
      </div>
      <Footer>
        <CustomButton size="large" variant="error" style={{ width: "100%" }}>
          Clear Form
        </CustomButton>
        <CustomButton
          type="submit"
          disabled={!isValid}
          size="large"
          style={{ width: "100%" }}
        >
          Save & Calculate
        </CustomButton>
      </Footer>
    </Container>
  );
};

const Container = styled.form`
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
