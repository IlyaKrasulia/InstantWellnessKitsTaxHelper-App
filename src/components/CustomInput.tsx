import styled, { css } from "styled-components";
import { COLORS, FONTS } from "@styles";
import { InputHTMLAttributes } from "react";

const SIZES = {
  small: css`
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 10px;
  `,
  medium: css`
    padding: 14px 16px;
    font-size: 16px;
    border-radius: 12px;
  `,
  large: css`
    padding: 18px 20px;
    font-size: 18px;
    border-radius: 14px;
  `,
};

const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  font-family: "Gilroy-Medium", sans-serif;
  font-size: 14px;
  color: ${COLORS.gray};
  padding-left: 4px;
`;

interface StyledInputProps {
  $hasError?: boolean;
  $size: keyof typeof SIZES;
}

const StyledInput = styled.input<StyledInputProps>`
  font-family: "Gilroy-Regular", sans-serif;
  background-color: ${COLORS.surface};
  color: ${COLORS.textPrimary};
  border: 1px solid ${(props) => (props.$hasError ? COLORS.error : COLORS.border)};
  transition: all 0.2s ease-in-out;

  ${(props) => SIZES[props.$size]}

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
    opacity: 0.7;
  }
`;

const ErrorText = styled.span`
  font-family: ${FONTS.family};
  font-size: 12px;
  color: ${COLORS.error};
  padding-left: 4px;
`;

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hasError?: boolean;
  fullWidth?: boolean;
  sizeVariant?: keyof typeof SIZES;
}

export const CustomInput = ({
  label,
  error,
  fullWidth,
  hasError,
  sizeVariant = 'medium',
  ...props
}: IProps) => {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput $size={sizeVariant} $hasError={hasError} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};
