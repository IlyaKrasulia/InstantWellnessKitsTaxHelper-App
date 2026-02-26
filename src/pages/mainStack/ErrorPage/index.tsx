import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CloudOff, Home } from "lucide-react";
import { BORDER_RADIUS, COLORS, FONTS, SPACING } from "@/utils/styles";
import { CustomButton } from "@/components/CustomButton";
import { RouteNames } from "@/utils/routes";
import { MainBG } from "@/components/MainBG";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const onOpenHome = () => {
    navigate(RouteNames.IMPORT);
  };

  return (
    <MainBG>
      <GlassContainer>
        <CloudOff size={80} color={COLORS.primarySolid} />
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorDescription>
          Oops! It seems this cloud doesn't exist. The page you are looking for
          might have been moved or deleted.
        </ErrorDescription>

        <CustomButton onClick={onOpenHome} variant="primary">
          <Home size={18} style={{ marginRight: "8px" }} />
          Return to Home
        </CustomButton>
      </GlassContainer>
    </MainBG>
  );
};

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: ${BORDER_RADIUS.large};
  padding: ${SPACING.xl};
  text-align: center;
  max-width: 500px;
`;

const ErrorTitle = styled.h2`
  color: ${COLORS.textPrimary};
  margin-bottom: ${SPACING.md};
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.bold};
`;

const ErrorDescription = styled.p`
  color: ${COLORS.textSecondary};
  margin-bottom: ${SPACING.lg};
  line-height: 1.6;
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.regular};
`;
