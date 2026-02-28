import { compile, Endpoints } from "@/api/endpoints";
import api from "@/api/instance";
import { IOrderImportResponse } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImportDashboard } from "./components/ImportDashboard";

export const ImportDetails = () => {
  const { id } = useParams();

  const [importDetails, setImportDetails] =
    useState<IOrderImportResponse | null>(null);

  useEffect(() => {
    const fetchImportDetails = async () => {
      try {
        const url = compile(Endpoints.GET_IMPORTS_BY_ID, {
          id,
        });

        const response = await api.get(url);
        setImportDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImportDetails();
  }, [id]);

  if (!importDetails) {
    return <div>Loading...</div>;
  }

  return <ImportDashboard imports={importDetails} />;
};
