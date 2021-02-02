import React, { useEffect, useState } from "react";
import useGeolocation from "../Hooks/useGeolocation";
import rutas from "../Data/rutas.json";
import RouteInfo from "./RouteInfo";

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
  const zoom = 13;
  const center = [13.705953500345197, -89.21219012823919];

  return (
    <>
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution="&copy; Elesteam"
          url="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          props.routes.map((ruta, index)=>{
            return(
              (ruta.shown)?
              <div key={index}>
                <Polyline
                  color={ruta.colorVuelta}
                  positions={[
                  ruta.rutaVuelta.map((direccion) => [direccion[1], direccion[0]])
                ]}
                />
                <Polyline
                  color={ruta.colorIda}
                  positions={[
                    ruta.rutaIda.map((direccion) => [direccion[1], direccion[0]])
                  ]}
                />
              </div>:""
            )
          })
        }
        <MapConsumer>
          {(map) => {
            if (!location.default)
              map.flyTo(location.location, 17, { animate: true });
            console.log("map center: ", map.getCenter());
            return null;
          }}
        </MapConsumer>

        <ZoomControl className="leaflet-control" position="bottomleft" />
        {
          <div className="leaflet-bottom leaflet-right">
            {/*
            <RouteInfo routes={props.routes} className="leaflet-control"/>
              <button className="leaflet-control" onClick={localizar}>
              Algo
            </button>
            */}
          </div>
        }
      </MapContainer>
    </>
  );
}
