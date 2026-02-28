import { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  COLORS,
  BORDER_RADIUS,
  SPACING,
  FONTS,
  FONT_SIZES,
} from "@/utils/styles";
import { IOrderDetail, IOrderImportResponse, IOrderPoint } from "@/utils/types";
import { compile, Endpoints } from "@/api/endpoints";
import api from "@/api/instance";
import { CustomButton } from "@/components/CustomButton";
import { OrdersMarkers } from "../../ImportCSV/components/OrdersMarkers";
import { OrderDetailsSkeleton } from "../../ImportCSV/components/OrderDetailsSkeleton";

export interface IOrder {
  id: string | number;
  lat: number;
  lon: number;
  amount: number;
  taxAmount: number;
  city: string;
  county: string;
  date: string;
  source: string;
}

interface IProps {
  imports: IOrderImportResponse;
}

export const ImportDashboard = ({ imports }: IProps) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrderDetail | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const requestSeq = useRef(0);

  const stats = useMemo(() => {
    const total = imports.metrics.totalSubtotal;
    const avgTax =
      imports.metrics.rowsTotal > 0
        ? (imports.metrics.totalTax / imports.metrics.rowsTotal).toFixed(2)
        : 0;

    return [
      {
        label: "Total Orders",
        value: imports.metrics.rowsTotal.toLocaleString(),
      },
      { label: "Total Amount", value: `$${total.toLocaleString()}` },
      { label: "Avg Tax Amount", value: `$${avgTax}` },
    ];
  }, [imports]);

  const handleMarkerClick = async (marker: IOrderPoint) => {
    const requestId = ++requestSeq.current;
    setIsDetailsLoading(true);

    try {
      const url = compile(Endpoints.GET_ORDER_ROW, {
        orderImportId: marker.orderImportId,
        rowId: marker.rowId,
      });

      const response = await api.get<IOrderDetail>(url);
      if (requestId === requestSeq.current) {
        setSelectedOrder(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (requestId === requestSeq.current) {
        setIsDetailsLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <MainContent>
        <MapContainer
          center={[42.85, -75.85]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; CARTO"
          />

          <OrdersMarkers
            orders={imports.pointsAdded}
            onMarkerClick={handleMarkerClick}
          />
        </MapContainer>

        <StatsGrid>
          {stats.map((stat, idx) => (
            <StatCard key={idx}>
              <StatLabel>{stat.label}</StatLabel>
              <StatValue>{stat.value}</StatValue>
            </StatCard>
          ))}
        </StatsGrid>
      </MainContent>

      <Sidebar>
        {isDetailsLoading ? (
          <OrderDetailsSkeleton />
        ) : selectedOrder ? (
          <DetailsContent>
            <SidebarTitle>Order Details</SidebarTitle>
            <InfoGroup>
              <DetailItem label="Order ID" value={`#${selectedOrder.id}`} />
              <DetailItem
                label="Total Amount"
                value={`$${selectedOrder.totalAmount}`}
              />
              <DetailItem label="Tax" value={`$${selectedOrder.taxAmount}`} />
              <DetailItem
                label="Location"
                value={`${selectedOrder.city ? `${selectedOrder.city}, ` : ""}${selectedOrder.county}`}
              />
              <DetailItem
                label="Date"
                value={new Date(selectedOrder.timestamp).toLocaleDateString()}
              />
              <DetailItem label="Source" value={selectedOrder.source} />
            </InfoGroup>

            <SectionTitle>Financial Summary</SectionTitle>
            <InfoGroup>
              <DetailItem
                label="Subtotal"
                value={`$${selectedOrder.subtotal.toFixed(2)}`}
              />
              <DetailItem
                label="Tax Amount"
                value={`$${selectedOrder.taxAmount.toFixed(2)}`}
              />
              <DetailItem
                label="Total Amount"
                value={`$${selectedOrder.totalAmount.toFixed(2)}`}
                $isBold
              />
              <DetailItem
                label="Composite Rate"
                value={`${(selectedOrder.compositeTaxRate * 100).toFixed(3)}%`}
              />
            </InfoGroup>

            <SectionTitle>Tax Breakdown</SectionTitle>
            <InfoGroup>
              <DetailItem
                label="State Rate"
                value={`${(selectedOrder.breakdown.state_rate * 100).toFixed(2)}%`}
              />
              <DetailItem
                label="County Rate"
                value={`${(selectedOrder.breakdown.county_rate * 100).toFixed(2)}%`}
              />
              <DetailItem
                label="City Rate"
                value={`${(selectedOrder.breakdown.city_rate * 100).toFixed(2)}%`}
              />

              {selectedOrder.breakdown.special_rates.map((rate, idx) => (
                <DetailItem
                  key={idx}
                  label={rate.name}
                  value={`${(rate.rate * 100).toFixed(2)}%`}
                />
              ))}
            </InfoGroup>

            <SectionTitle>Jurisdictions</SectionTitle>
            <JurisdictionList>
              {selectedOrder.jurisdictions.map((j, idx) => (
                <JurisdictionTag key={idx} title={`${j.type}: ${j.name}`}>
                  <span className="type">{j.name}</span>
                </JurisdictionTag>
              ))}
            </JurisdictionList>
            <CustomButton
              onClick={() => setSelectedOrder(null)}
              variant="secondary"
              style={{
                position: "sticky",
                bottom: 0,
                marginTop: SPACING.lg,
                width: "100%",
              }}
            >
              Close Details
            </CustomButton>
          </DetailsContent>
        ) : (
          <EmptySidebar>
            <p>Select a point on the map to see transaction details</p>
          </EmptySidebar>
        )}
      </Sidebar>
    </DashboardLayout>
  );
};

const DashboardLayout = styled.div`
  display: flex;
  height: 750px;
  gap: ${SPACING.lg};
  margin-top: ${SPACING.md};
`;

const MainContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
`;

const Sidebar = styled.aside`
  flex: 1;
  background: ${COLORS.surface};
  border-radius: ${BORDER_RADIUS.medium};
  border: 1px solid ${COLORS.border};
  padding: ${SPACING.lg};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${SPACING.md};
`;

const StatCard = styled.div`
  background: ${COLORS.surface};
  padding: ${SPACING.md};
  border-radius: ${BORDER_RADIUS.small};
  border-left: 4px solid ${COLORS.primarySolid};
  border: 1px solid ${COLORS.border};
`;

const DetailItem = ({
  label,
  value,
  $isBold,
}: {
  label: string;
  value: string;
  $isBold?: boolean;
}) => (
  <DetailRow $isBold={$isBold}>
    <span className="label">{label}</span>
    <span className="value">{value}</span>
  </DetailRow>
);

const DetailRow = styled.div<{ $isBold?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${COLORS.border};
  span {
    color: ${COLORS.textSecondary};
    font-size: 14px;
    font-family: ${FONTS.family};
  }
  strong {
    color: ${COLORS.textPrimary};
    font-size: 14px;
    font-family: ${FONTS.family};
    font-weight: ${(props) =>
      props.$isBold ? FONTS.weight.bold : FONTS.weight.medium};
  }
`;

const StatLabel = styled.span`
  font-family: ${FONTS.family};
  font-size: 12px;
  color: ${COLORS.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: ${SPACING.xs};
`;

const StatValue = styled.div`
  font-family: ${FONTS.family};
  font-size: ${FONT_SIZES.h2};
  font-weight: ${FONTS.weight.bold};
  color: ${COLORS.textPrimary};
`;

const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const SidebarTitle = styled.h2`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.bold};
  font-size: ${FONT_SIZES.h2};
  color: ${COLORS.textPrimary};
  margin-bottom: ${SPACING.lg};
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(240, 249, 255, 0.3);
  border-radius: ${BORDER_RADIUS.small};
  padding: 0 ${SPACING.md};
  margin-bottom: ${SPACING.xl};
`;

const EmptySidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: ${COLORS.textSecondary};
  padding: ${SPACING.xl};

  p {
    font-family: ${FONTS.family};
    font-size: 14px;
    line-height: 1.5;
  }

  &::before {
    content: "📍";
    font-size: 40px;
    margin-bottom: ${SPACING.md};
    opacity: 0.5;
  }
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: ${FONTS.weight.bold};
  color: ${COLORS.textSecondary};
  text-transform: uppercase;
  margin: ${SPACING.md} 0 ${SPACING.xs};
  letter-spacing: 0.5px;
`;

const JurisdictionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.sm};
  margin-top: ${SPACING.xs};
`;

const JurisdictionTag = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  padding: 6px 10px;
  border-radius: ${BORDER_RADIUS.small};

  .type {
    font-size: ${FONT_SIZES.small};
    color: ${COLORS.textSecondary};
    font-family: ${FONTS.family};
    text-transform: uppercase;
  }
`;
