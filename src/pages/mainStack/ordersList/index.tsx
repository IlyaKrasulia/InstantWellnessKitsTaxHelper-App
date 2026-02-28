import { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Table } from "./components/Table";
import { OrderListItem } from "@/utils/types";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 13;

export const OrdersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number(searchParams.get('page')) || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    FromDate: searchParams.get('FromDate') || "",
    ToDate: searchParams.get('ToDate') || "",
    County: searchParams.get('County') || "",
    City: searchParams.get('City') || "",
    Jurisdiction: "",
    MinTotal: searchParams.get('MinTotal') ? Number(searchParams.get('MinTotal')) : null,
    MaxTotal: searchParams.get('MaxTotal') ? Number(searchParams.get('MaxTotal')) : null,
    SortBy: searchParams.get('SortBy') || "Price",
    SortDescending: searchParams.get('SortDescending') || "True",
    Source: searchParams.get('Source') || "All",
    OrderImportId: "",
  });

  const [filtersDebounced] = useDebounce(filters, 1400);

  useEffect(() => {
    const params: Record<string, string> = {
      page: currentPage.toString(),
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== null && value !== "") {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    };

    setSearchParams(params);
  }, [filters, currentPage, setSearchParams]);

  useEffect(() => {
    console.log('call');
    
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(Endpoints.GET_ORDERS, {
          params: {
            PageSize: ITEMS_PER_PAGE,
            Page: currentPage,
            ...filtersDebounced,
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
  }, [currentPage, filtersDebounced]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Table
        orders={orders}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};
