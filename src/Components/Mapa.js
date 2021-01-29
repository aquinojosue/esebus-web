import React, { useEffect, useState } from "react";
import {
  MapContainer,
  MapConsumer,
  Polyline,
  TileLayer,
  ZoomControl
} from "react-leaflet";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import useGeolocation from "../Hooks/useGeolocation";
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
  const hollywoodStudiosPolygon = [
    [
      [28.35390453844, -81.56443119049],
      [28.35390453844, -81.55619144439],
      [28.35983376526, -81.55619144439],
      [28.35983376526, -81.56443119049],
      [28.35390453844, -81.56443119049]
    ]
  ];

  return (
    <>
      <h2>Hola</h2>
      <MapContainer center={location.location} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution="&copy; Elesteam"
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1"
        />
        <Polyline color="blue" positions={hollywoodStudiosPolygon} />
        <MapConsumer>
          {(map) => {
            if (!location.default)
              map.flyTo(location.location, 17, { animate: true });
            console.log("map center: ", map.getCenter());
            return null;
          }}
        </MapConsumer>

        {/*<div className="leaflet-bottom leaflet-left">
        <Fab variant="extended" className="leaflet-control" onClick={localizar}>
          <NavigationIcon />
          Navigate
        </Fab>
      </div>*/}
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  );
}
