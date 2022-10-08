import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Bike } from '../../../types';

interface MapProps {
  bike?: Bike;
  longitude?: number;
  latitude?: number;
  style?: React.CSSProperties;
}

export const Map = ({
  longitude = -75.567,
  latitude = 6.217,
  bike,
  style,
}: MapProps): JSX.Element => {
  return (
    <div className='map' style={style}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={style}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[latitude, longitude]}>
          {bike != null && (
            <Popup>
              {bike.model} <br /> {bike.color}
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
};
Map.displayName = 'Map';

export default Map;
