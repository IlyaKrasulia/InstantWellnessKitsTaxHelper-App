import { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Table } from "./components/Table";
import { IOrderImport } from "@/utils/types";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";
import { useDebounce } from "use-debounce";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { RouteNames } from "@/utils/routes";

const ITEMS_PER_PAGE = 13;

export const ImportsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [imports, setImports] = useState<IOrderImport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    FromDate: searchParams.get("FromDate") || "",
    ToDate: searchParams.get("ToDate") || "",
  });

  const [filtersDebounced] = useDebounce(filters, 1400);

  useEffect(() => {
    const params: Record<string, string> = {
      page: currentPage.toString(),
      ...Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== null && value !== "") {
            acc[key] = value.toString();
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    };

    setSearchParams(params);
  }, [filters, currentPage, setSearchParams]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(Endpoints.GET_IMPORTS, {
          params: {
            PageSize: ITEMS_PER_PAGE,
            Page: currentPage,
            ...filtersDebounced,
          },
        });

        setImports(response.data.items);
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

  const onClickImport = (id: string) => {
    navigate(generatePath(RouteNames.IMPORT_DETAILS, { id }));
  };

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Table
        imports={imports}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        onClickImport={(id) => onClickImport(id)}
      />
    </div>
  );
};
