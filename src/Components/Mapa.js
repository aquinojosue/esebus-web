import React, { useState, useEffect } from "react";
import useGeolocation from "../Hooks/useGeolocation";
import {
  MapContainer,
  Polyline,
  TileLayer,
  ZoomControl,
  Popup
} from "react-leaflet";
import RouteInfo from './RouteInfo'

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
  const newUrl = "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=Muf2AN1SITcFSCIK02FatUPPAWIXScDl56L1ADaLMGOLeXvJ6tDFYPpSLC7Qwlds";
  const oldUrl = "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  return (
    <>
      <MapContainer  center={center} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution="&copy; Elesteam"
          url={newUrl}
        />
        {props.filteredRoutes ?
          props.filteredRoutes.map((ruta, index)=>{
            return(
                <div key={index}>
                    <Polyline
                        color={ruta.colorVuelta}
                        key={ruta.codigoRuta+"_ida_"+Math.random()}
                        positions={[
                            ruta.rutaVuelta.map((direccion) => [direccion[1], direccion[0]])
                        ]}
                        weight="5"
                        smoothFactor="7"
                    >
                        <Popup>
                            <strong>{ruta.nombreRuta}</strong> Ida
                        </Popup>
                    </Polyline>
                    <Polyline
                    color={ruta.colorIda}
                    
                    key={ruta.codigoRuta+"_vuelta_"+Math.random()}
                    positions={[
                        ruta.rutaIda.map((direccion) => [direccion[1], direccion[0]])
                    ]}
                    smoothFactor="7"
                    weight="5"
                    >
                        <Popup>
                            <strong>{ruta.nombreRuta}</strong> Vuelta
                        </Popup>
                    </Polyline>
                </div>
            )
          })
        :""}
        {
            /**
             * this would be only if we need to go to gps location
        <MapConsumer>
          {(map) => {
            if (!location.default)
              map.flyTo(location.location, 17, { animate: true });
            return null;
          }}
        </MapConsumer>
             */
        }

        <ZoomControl className="leaflet-control" position="topright" />
      </MapContainer>
    </>
  );
}
