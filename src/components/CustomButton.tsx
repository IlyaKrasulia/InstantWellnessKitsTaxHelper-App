import { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";
import { COLORS, FONTS } from "@styles";

const SIZES = {
  small: css`
    padding: 0 8px;
    height: 40px;
    font-size: 14px;
    border-radius: 10px;
  `,
  medium: css`
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 14px;
  `,
  large: css`
    padding: 16px 32px;
    font-size: 18px;
    border-radius: 16px;
  `,
};

const VARIANTS = {
  primary: css`
    background: ${COLORS.primarySolid};
    color: ${COLORS.white};
    box-shadow: 0 4px 15px rgba(192, 183, 229, 0.25);
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(192, 183, 229, 0.35);
    }
  `,
  secondary: css`
    background-color: ${COLORS.surface};
    color: ${COLORS.textPrimary};
    border: 1px solid ${COLORS.border};
    &:hover {
      background-color: ${COLORS.background};
      border-color: ${COLORS.textMuted};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${COLORS.textSecondary};
    &:hover {
      background-color: ${COLORS.hoverOverlay};
      color: ${COLORS.primarySolid};
    }
  `,
  success: css`
    background-color: ${COLORS.success};
    color: ${COLORS.white};
  `,
  error: css`
    background-color: ${COLORS.error};
    color: ${COLORS.white};
  `,
};

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
`;

const StyledButton = styled.button<StyledButtonProps>`
  font-family: ${FONTS.family};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 0;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  ${(props) => SIZES[props.$size]}
  ${(props) => VARIANTS[props.$variant]}

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background: ${COLORS.textMuted};
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

type ButtonSize = keyof typeof SIZES;
type ButtonVariant = keyof typeof VARIANTS;

interface StyledButtonProps {
  $size: ButtonSize;
  $variant: ButtonVariant;
  $fullWidth?: boolean;
}

export const CustomButton = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  isLoading = false,
  ...props
}: IProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </StyledButton>
  );
};
