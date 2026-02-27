import { format } from "date-fns";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { SPACING } from "@/utils/styles";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ManualOrderData, manualOrderSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";
import { toast } from "react-toastify";

export const CreateManualOrder = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ManualOrderData>({
    resolver: zodResolver(manualOrderSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ManualOrderData) => {
    try {
      const date = new Date();
      const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");

      api
        .post(Endpoints.POST_ORDER, {
          latitude: data.lat,
          longitude: data.lon,
          subtotal: data.subtotal,
          timestamp: formattedDate,
        })
        .then((res) => {
          toast.success(res.data.message || "Order created successfully!");
          reset();
        })
        .catch((err) => {
          toast.error("Unvalid input data. Please check your entries.");
        });
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Invalid input data. Please check your entries.");
    }
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
            hasError={Boolean(errors.lat)}
            {...register("lat")}
          />
          <CustomInput
            sizeVariant="large"
            fullWidth
            label="Longitude (lon)"
            placeholder="e.g. 30.5234"
            error={errors.lon?.message}
            hasError={Boolean(errors.lon)}
            {...register("lon")}
          />
        </TopInputs>
        <CustomInput
          sizeVariant="large"
          fullWidth
          label="Subtotal Amount"
          placeholder="0.00"
          error={errors.subtotal?.message}
          hasError={Boolean(errors.subtotal)}
          {...register("subtotal")}
        />
      </div>
      <Footer>
        <CustomButton
          onClick={() => reset()}
          type="button"
          size="large"
          variant="error"
          style={{ width: "100%" }}
        >
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
