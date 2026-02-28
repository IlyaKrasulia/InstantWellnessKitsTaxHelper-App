import { COLORS } from "@/utils/styles";
import React from "react";
import { CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { IOrderPoint } from "@/utils/types";

interface IProps {
  orders: IOrderPoint[];
  onMarkerClick: (order: any) => void;
}

export const OrdersMarkers = React.memo(
  ({ orders, onMarkerClick }: IProps) => {

    const createClusterCustomIcon = (cluster: any) => {
        const count = cluster.getChildCount();
        let sizeClass = "cluster-small";
        let displayCount: string | number = count;
    
        if (count >= 1000) {
          sizeClass = "cluster-large";
          displayCount = `${(count / 1000).toFixed(1)}K+`;
        } else if (count > 50) {
          sizeClass = "cluster-medium";
        }
    
        return L.divIcon({
          html: `<span>${displayCount}</span>`,
          className: `custom-cluster-icon ${sizeClass}`,
          iconSize: L.point(0, 0),
        });
      };

    return (
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={60}
        iconCreateFunction={createClusterCustomIcon}
      >
        {orders.map((order) => (
          <CircleMarker
            key={order.rowId}
            center={[order.latitude, order.longitude]}
            pathOptions={{
              fillColor: COLORS.primarySolid,
              color: "#fff",
              weight: 1,
              fillOpacity: 0.8,
            }}
            radius={6}
            eventHandlers={{
              click: () => onMarkerClick(order),
            }}
          />
        ))}
      </MarkerClusterGroup>
    );
  },
);
