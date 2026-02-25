import { COLORS, FONT_SIZES, FONTS, SPACING } from "@/utils/styles";
import { UploadIcon } from "lucide-react";
import styled from "styled-components";

export const EmpryState = () => {
  return (
    <>
      <div>
        <UploadIcon size={50} color={COLORS.textPrimary} style={{ display: "block", margin: "0 auto" }} />
        <UploadInfoTitle>Select a CSV file to upload</UploadInfoTitle>
        <UploadInfoInfo>or drag and drop it here</UploadInfoInfo>
      </div>
      <HintText>
        Maximum file size: 10MB. Only .csv files are supported.
      </HintText>
    </>
  );
};

const UploadInfoTitle = styled.h2`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.bold};
  font-size: ${FONT_SIZES.h2};
  margin-bottom: ${SPACING.sm};
  margin-top: ${SPACING.md};
  color: ${COLORS.textPrimary};
  text-align: center;
`;

const UploadInfoInfo = styled.h3`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  font-size: ${FONT_SIZES.body};
  color: ${COLORS.textSecondary};
  text-align: center;
`;

const HintText = styled.h4`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  font-size: ${FONT_SIZES.small};
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: ${SPACING.sm};
`;
