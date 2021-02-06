import React, { useState } from "react";
import useGeolocation from "../Hooks/useGeolocation";
import {
  MapContainer,
  MapConsumer,
  Polyline,
  TileLayer,
  ZoomControl
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
  const nuevaUrl = "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=Muf2AN1SITcFSCIK02FatUPPAWIXScDl56L1ADaLMGOLeXvJ6tDFYPpSLC7Qwlds";
  const oldUrl = "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  return (
    <>
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution="&copy; Elesteam"
          url={nuevaUrl}
        />
        {
          props.routes.map((ruta, index)=>{
            {/** For some reason this breaks if I send a filtered list. */}
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
                    </div>
                :""
            )
          })
        }
        <MapConsumer>
          {(map) => {
            if (!location.default)
              map.flyTo(location.location, 17, { animate: true });
            return null;
          }}
        </MapConsumer>

        <ZoomControl className="leaflet-control" position="topright" />
        {/*
          <div className="leaflet-bottom leaflet-right">
              {
                  (props.routes.some(r=>r.shown)) ?
                  <div className="w-screen z-20 h-52 bg-white leaflet-control shadow-2xl m-5 mb-5 border-esebus-dark">
                  <RouteInfo routes={props.routes.filter(route=>route.shown)}/>
              </div>
              :""
              }
              
            {
            <RouteInfo routes={props.routes} className="leaflet-control"/>
              <button className="leaflet-control" onClick={localizar}>
              Algo
            </button>
            }
          </div>
        */}
      </MapContainer>
    </>
  );
}
