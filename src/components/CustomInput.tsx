import styled from "styled-components";
import { COLORS, FONTS } from "@styles";
import { InputHTMLAttributes } from "react";

const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  font-family: "Gilroy-Medium", sans-serif;
  font-size: 14px;
  color: ${COLORS.textSecondary};
  padding-left: 4px;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  font-family: "Gilroy-Regular", sans-serif;
  font-size: 16px;
  padding: 14px 16px;
  background-color: ${COLORS.surface};
  border: 1px solid
    ${(props) => (props.$hasError ? COLORS.error : COLORS.border)};
  border-radius: 12px;
  color: ${COLORS.textPrimary};
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${COLORS.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primarySolid};
    box-shadow: 0 0 0 4px ${COLORS.hoverOverlay};
  }

  &:disabled {
    background-color: ${COLORS.background};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-family: ${FONTS.family};
  font-size: 12px;
  color: ${COLORS.error};
  padding-left: 4px;
`;

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const CustomInput = ({
  label,
  error,
  fullWidth = false,
  ...props
}: IProps) => {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput $hasError={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};
