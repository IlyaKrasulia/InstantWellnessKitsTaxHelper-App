import styled, { keyframes } from "styled-components";
import { BORDER_RADIUS, COLORS, SPACING } from "@/utils/styles";

export const OrderDetailsSkeleton = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.md }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: SPACING.lg,
        }}
      >
        <Skeleton $width="60%" $height="28px" />
        <Skeleton $width="60px" $height="18px" />
      </div>

      <SkeletonGroup>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <Skeleton $width="30%" $height="14px" />
            <Skeleton $width="40%" $height="14px" />
          </div>
        ))}
      </SkeletonGroup>

      <Skeleton
        $width="120px"
        $height="12px"
        style={{ marginTop: SPACING.md }}
      />
      <SkeletonGroup>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <Skeleton $width="35%" $height="14px" />
            <Skeleton $width="25%" $height="14px" />
          </div>
        ))}
      </SkeletonGroup>
    </div>
  );
};

const pulse = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: -200% 0%; }
`;

export const Skeleton = styled.div<{
  $width?: string;
  $height?: string;
  $radius?: string;
}>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "20px"};
  border-radius: ${(props) => props.$radius || BORDER_RADIUS.small};

  background: linear-gradient(
    90deg,
    ${COLORS.border}50 25%,
    ${COLORS.border} 50%,
    ${COLORS.border}50 75%
  );
  background-size: 200% 100%;
  animation: ${pulse} 1.5s infinite linear;
`;

const SkeletonGroup = styled.div`
  background: rgba(240, 249, 255, 0.2);
  border-radius: ${BORDER_RADIUS.small};
  padding: ${SPACING.md};
`;
