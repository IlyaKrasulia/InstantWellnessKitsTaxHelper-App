import { MOCK_ORDERS } from "@/mock/orders";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  FONTS,
  SHADOWS,
  SPACING,
} from "@/utils/styles";
import { MapPin } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const ITEMS_PER_PAGE = 5;

export const Table = () => {
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + ITEMS_PER_PAGE;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Order ID</Th>
              <Th>Location</Th>
              <Th>Subtotal</Th>
              <Th style={{ textAlign: "center" }}>Tax Rate</Th>
              <Th>Total</Th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <Tr key={order.id}>
                <Td>
                  {new Date(order.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Td>
                <Td>
                  <MonospaceText>#{order.id.slice(0, 8)}</MonospaceText>
                </Td>
                <Td>
                  <MonospaceText>
                    <MapPin size={14} color={COLORS.primarySolid} />
                    {order.latitude.toFixed(3)}, {order.longitude.toFixed(3)}
                  </MonospaceText>
                </Td>
                <Td>
                  <Amount>${order.subtotal.toLocaleString()}</Amount>
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <TaxBadge>
                    {(order.composite_tax_rate * 100).toFixed(2)}%
                  </TaxBadge>
                </Td>
                <Td>
                  <Amount style={{ color: COLORS.primarySolid }}>
                    ${order.total_amount.toLocaleString()}
                  </Amount>
                </Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <PaginationWrapper>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"

          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          disabledClassName="disabled"
        />
      </PaginationWrapper>
    </>
  );
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border-radius: ${BORDER_RADIUS.medium};
  border: 1px solid ${COLORS.border};
  margin-top: ${SPACING.lg};
  box-shadow: ${SHADOWS.soft};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: ${SPACING.md};
  font-family: ${FONTS.family};
  font-size: ${FONT_SIZES.small};
  text-transform: uppercase;
  color: ${COLORS.textSecondary};
  border-bottom: 2px solid ${COLORS.border};
  letter-spacing: 0.05em;
`;

const Tr = styled.tr`
  transition: all 0.2s ease;
  &:hover {
    background: ${COLORS.hoverOverlay};
  }
`;

const Td = styled.td`
  padding: ${SPACING.md};
  font-family: ${FONTS.family};
  font-size: ${FONT_SIZES.body};
  color: ${COLORS.textPrimary};
  border-bottom: 1px solid ${COLORS.border};
`;

const MonospaceText = styled.span`
  font-family: ${FONTS.family};
  font-size: ${FONT_SIZES.small};
  color: ${COLORS.textSecondary};
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
`;

const Amount = styled.span`
  font-family: ${FONTS.family};
`;

const TaxBadge = styled.span`
  background: rgba(56, 189, 248, 0.1);
  color: ${COLORS.primarySolid};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: ${FONT_SIZES.small};
`;

const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    list-style: none;
    gap: 8px;
    padding: ${SPACING.md} 0;
    justify-content: center;
    font-family: ${FONTS.family};
  }

  .page-item {
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    border: 1px solid ${COLORS.border};
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px);

    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${COLORS.hoverOverlay};
      border-color: ${COLORS.primarySolid};
    }
  }

  .page-link {
    display: block;
    color: ${COLORS.textSecondary};
    font-weight: ${FONTS.weight.medium};
  }

  .active {
    background: ${COLORS.primarySolid} !important;
    border-color: ${COLORS.primarySolid};
    .page-link {
      color: ${COLORS.white};
    }
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
