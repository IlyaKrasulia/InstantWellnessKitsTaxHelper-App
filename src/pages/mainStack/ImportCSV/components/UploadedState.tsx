import { CustomButton } from "@/components/CustomButton";
import { COLORS, FONT_SIZES, FONTS, SPACING } from "@/utils/styles";
import { Ban, File } from "lucide-react";
import { useMemo } from "react";
import styled from "styled-components";

interface IProps {
  filename: string;
  filesize: number;
  isError: boolean;
  errorMsg?: string;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const UploadedState = ({
  filename,
  filesize,
  isError,
  onSubmit,
  isLoading,
}: IProps) => {
  const formatedSize = useMemo(() => filesize.toLocaleString(), [filesize]);

  return (
    <>
      <div>
        {isError ? (
          <Ban
            size={50}
            color={COLORS.error}
            style={{ display: "block", margin: "0 auto" }}
          />
        ) : (
          <File
            size={50}
            color={COLORS.textPrimary}
            style={{ display: "block", margin: "0 auto" }}
          />
        )}

        <UploadInfoTitle>{filename}</UploadInfoTitle>
        <UploadInfoInfo>{formatedSize} KB</UploadInfoInfo>

        <CustomButton
          variant="secondary"
          style={{ display: "block", margin: "0 auto", marginTop: SPACING.md }}
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isError ? "Try Another File" : "Select other file"}
        </CustomButton>
        <CustomButton
          variant="success"
          style={{ display: "block", margin: "0 auto", marginTop: SPACING.md }}
          onClick={(e) => {
            e.stopPropagation();
            onSubmit();
          }}
          isLoading={isLoading}
        >
          Submit
        </CustomButton>
      </div>
      <HintText>
        Your data is processed locally for report generation and is protected by
        industry-standard encryption.
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
