import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  COLORS,
  SPACING,
  FONTS,
  FONT_SIZES,
  BORDER_RADIUS,
} from "@/utils/styles";
import { IOrderDetail } from "@/utils/types";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";
import { openInGoogleMaps } from "@/utils/openGoogleMaps";

export const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<IOrderDetail | null>(null);

  const formatCurrency = (val: number) =>
    `$${val.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  const formatPercent = (val: number) => `${(val * 100).toFixed(3)}%`;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      api.get(`${Endpoints.GET_ORDERS}/${id}`).then((response) => {
        setData(response.data);
      });
    };

    fetchOrderDetails();
  }, []);

  if (!data) {
    return (
      <Container>
        <Header>
          <IDBadge>ID: {id}</IDBadge>
        </Header>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <TitleGroup>
          <IDBadge>ID: {data.id}</IDBadge>
        </TitleGroup>
      </Header>

      <Grid>
        <Card>
          <CardTitle>General Information</CardTitle>
          <DataGrid>
            <DataItem label="Source" value={data.source} />
            {data.city && <DataItem label="City" value={data.city} />}
            <DataItem label="County" value={data.county} />
            <DataItem
              label="Date"
              value={new Date(data.timestamp).toLocaleString()}
            />
            <DataItem
              label="Coordinates"
              value={`${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`}
              onClick={() => openInGoogleMaps(data.latitude, data.longitude)}
              $isLink
            />
          </DataGrid>
        </Card>

        <Card $highlight>
          <CardTitle>Financial Summary</CardTitle>
          <DataGrid>
            <DataItem label="Subtotal" value={formatCurrency(data.subtotal)} />
            <DataItem
              label="Tax Amount"
              value={formatCurrency(data.taxAmount)}
            />
            <DataItem
              label="Total Amount"
              value={formatCurrency(data.totalAmount)}
              $isTotal
            />
            <DataItem
              label="Composite Rate"
              value={formatPercent(data.compositeTaxRate)}
            />
          </DataGrid>
        </Card>

        <Card>
          <CardTitle>Tax Breakdown</CardTitle>
          <DataGrid>
            {data?.breakdown?.state_rate && (
              <DataItem
                label="State Rate"
                value={formatPercent(data.breakdown.state_rate)}
              />
            )}
            {data?.breakdown?.county_rate && (
              <DataItem
                label="County Rate"
                value={formatPercent(data.breakdown.county_rate)}
              />
            )}
            {data?.breakdown?.city_rate && (
              <DataItem
                label="City Rate"
                value={formatPercent(data.breakdown.city_rate)}
              />
            )}
            {data?.breakdown?.special_rates &&
              data.breakdown.special_rates.map((spec, index) => (
                <DataItem
                  key={index}
                  label={`Special: ${spec.name}`}
                  value={formatPercent(spec.rate)}
                />
              ))}
          </DataGrid>
        </Card>

        <Card>
          <CardTitle>Applied Jurisdictions</CardTitle>
          <JurisdictionGrid>
            {data.jurisdictions.map((j, idx) => (
              <JurisdictionCard key={idx}>
                <span className="j-type">{j.type}</span>
                <span className="j-name">{j.name}</span>
                <span className="j-code">{j.code}</span>
              </JurisdictionCard>
            ))}
          </JurisdictionGrid>
        </Card>
      </Grid>
    </Container>
  );
};

const DataItem = ({
  label,
  value,
  $isTotal,
  $isLink,
  onClick,
}: {
  label: string;
  value: string;
  $isTotal?: boolean;
  $isLink?: boolean;
  onClick?: () => void;
}) => (
  <Row
    $isTotal={$isTotal}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <Label>{label}</Label>
    <Value $isLink={$isLink}>{value}</Value>
  </Row>
);

const Container = styled.div`
  font-family: ${FONTS.family};
  margin-top: ${SPACING.xl};
`;

const Header = styled.div`
  margin-bottom: ${SPACING.xl};
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.md};
`;

const IDBadge = styled.span`
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: ${COLORS.textSecondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: ${SPACING.lg};
`;

const Card = styled.div<{ $highlight?: boolean }>`
  background: ${COLORS.surface};
  border-radius: ${BORDER_RADIUS.medium};
  padding: ${SPACING.lg};
  border: 1px solid
    ${(props) => (props.$highlight ? COLORS.primarySolid : COLORS.border)};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

const CardTitle = styled.h2`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${COLORS.textSecondary};
  margin-bottom: ${SPACING.lg};
  border-bottom: 1px solid ${COLORS.border};
  padding-bottom: ${SPACING.sm};
`;

const DataGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
`;

const Row = styled.div<{ $isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.$isTotal ? `${SPACING.sm} 0` : "0")};
  border-top: ${(props) =>
    props.$isTotal ? `2px solid ${COLORS.border}` : "none"};
  margin-top: ${(props) => (props.$isTotal ? SPACING.sm : "0")};
`;

const Label = styled.span`
  color: ${COLORS.textSecondary};
  font-size: ${FONT_SIZES.body};
`;

const Value = styled.span<{ $isLink?: boolean }>`
  color: ${COLORS.textPrimary};
  font-weight: 600;
  font-size: ${FONT_SIZES.body};
  text-decoration: ${(props) => (props.$isLink ? "underline" : "none")};
  cursor: ${(props) => (props.$isLink ? "pointer" : "default")};
`;

const JurisdictionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${SPACING.md};
`;

const JurisdictionCard = styled.div`
  background: ${COLORS.background};
  padding: ${SPACING.md};
  border-radius: ${BORDER_RADIUS.small};
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLORS.border};

  .j-type {
    font-size: ${FONT_SIZES.small};
    text-transform: uppercase;
    color: ${COLORS.textSecondary};
  }
  .j-name {
    font-size: ${FONT_SIZES.body};
    font-weight: 700;
    color: ${COLORS.textPrimary};
    margin: 4px 0;
  }
  .j-code {
    font-size: ${FONT_SIZES.small};
    color: ${COLORS.primarySolid};
    font-family: monospace;
  }
`;
