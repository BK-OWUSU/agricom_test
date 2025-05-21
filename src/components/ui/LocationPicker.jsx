// components/LocationPicker.js
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// Fix missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const LocationMarker = ({ position }) => {
  return position ? <Marker position={position} /> : null;
};

LocationMarker.propTypes = {
  position: PropTypes.array,
};

const GeocoderControl = ({ onSelect }) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e) {
        const { center } = e.geocode;
        map.setView(center, 15);
        onSelect([center.lat, center.lng]);
      })
      .addTo(map);

    return () => map.removeControl(geocoder);
  }, [map, onSelect]);

  return null;
};

GeocoderControl.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const ClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSelect([lat, lng]);
    },
  });
  return null;
};

ClickHandler.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const LocationPicker = ({ onSelect }) => {
  const [position, setPosition] = useState(null);

  const handleSelect = (coords) => {
    setPosition(coords);
    const formatted = `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
    onSelect(formatted);
  };

  return (
    <MapContainer
      center={[7.9465, -1.0232]} // Ghana default
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
      <GeocoderControl onSelect={handleSelect} />
      <ClickHandler onSelect={handleSelect} />
    </MapContainer>
  );
};

LocationPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default LocationPicker;
