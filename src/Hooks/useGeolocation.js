import React, { useState, useEffect } from "react";
function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 }
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message
      }
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocalización no soportada."
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}
export default useGeolocation;
