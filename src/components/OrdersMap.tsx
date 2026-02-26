import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { COLORS } from '@/utils/styles';

const orders = [
    { id: 1, lat: 50.45, lon: 30.52, city: "Kyiv", amount: 1200 },
    { id: 2, lat: 40.71, lon: -74.00, city: "New York", amount: 3500 },
];

const NY_STATE_CENTER: [number, number] = [42.8535, -75.8504];

export const OrdersMap = ({ orders }) => {
    return (
        <div style={{ 
      height: '600px', 
      borderRadius: '20px', 
      overflow: 'hidden', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)' 
    }}>
      <MapContainer 
        center={NY_STATE_CENTER} 
        zoom={10} 
        style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />

        <MarkerClusterGroup
          chunkedLoading
          disableClusteringAtZoom={10}
          maxClusterRadius={40}
        >
          {orders.map((order) => (
            <CircleMarker
              key={order.id}
              center={[order.lat, order.lon]}
              pathOptions={{
                color: '#FFFFFF',      
                fillColor: '#38BDF8',  
                fillOpacity: 0.8,
                weight: 1,
              }}
              radius={4}
            >
              <Tooltip sticky>
                Order ID: {order.id} <br/> Value: ${order.amount}
              </Tooltip>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
    );
};