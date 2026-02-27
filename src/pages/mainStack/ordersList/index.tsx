import { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Table } from "./components/Table";
import { OrderListItem } from "@/utils/types";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";

const ITEMS_PER_PAGE = 13;

export const OrdersList = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    FromDate: "",
    ToDate: "",
    County: "",
    City: "",
    Jurisdiction: "",
    MinTotal: null,
    MaxTotal: null,
    SortBy: "Time",
    SortDirection: false,
    Source: "",
    OrderImportId: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(Endpoints.GET_ORDERS, {
          params: {
            PageSize: ITEMS_PER_PAGE,
            Page: currentPage,
            ...filters,
          },
        });

        setOrders(response.data.items);
        setTotalPages(
          response.data.total_count
            ? Math.ceil(response.data.total_count / ITEMS_PER_PAGE)
            : 0,
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <Filters />
      <Table
        orders={orders}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};
