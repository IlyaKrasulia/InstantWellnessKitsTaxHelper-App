import { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import { Table } from "./components/Table";
import { OrderListItem } from "@/utils/types";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";

export const OrdersList = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await api.get(Endpoints.GET_ORDERS);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [])

  console.log(orders);
  

  return (
    <div>
      <Filters />
      <Table />
    </div>
  );
};
