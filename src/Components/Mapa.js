import React, { useEffect, useState } from "react";
import useGeolocation from "../Hooks/useGeolocation";
import rutas from "../Data/rutas.json";
import {
  MapContainer,
  MapConsumer,
  Polyline,
  TileLayer,
  ZoomControl
} from "react-leaflet";
export default function Mapa(props) {
  const [location, setLocation] = useState({
    default: true,
    location: [28.365724898272077, -81.55254364013672]
  });

  const newLocation = useGeolocation();
  function localizar() {
    if (newLocation.loaded && !newLocation.error) {
      setLocation({
        default: false,
        location: [newLocation.coordinates.lat, newLocation.coordinates.lng]
      });
    } else {
      alert(newLocation.error.message);
    }
  }
  const zoom = 14;
  const center = [13.735461, -89.08062];
  const color = rutas[0].colorVuelta;

  return (
    <>
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution="&copy; Elesteam"
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Polyline
          color={color}
          positions={[
            rutas[0].rutaVuelta.map((direccion) => [direccion[1], direccion[0]])
          ]}
        />
        <Polyline
          color={rutas[0].colorIda}
          positions={[
            rutas[0].rutaIda.map((direccion) => [direccion[1], direccion[0]])
          ]}
        />
        <MapConsumer>
          {(map) => {
            if (!location.default)
              map.flyTo(location.location, 17, { animate: true });
            console.log("map center: ", map.getCenter());
            return null;
          }}
        </MapConsumer>

        {
          <div className="leaflet-bottom leaflet-right">
            <ZoomControl className="leaflet-control" position="bottomleft" />
            <button className="leaflet-control" onClick={localizar}>
              Algo
            </button>
          </div>
        }
      </MapContainer>
    </>
  );
}
