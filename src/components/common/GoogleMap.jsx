import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "../../utilities/mapStyles";
import { Box, makeStyles, Typography } from "@material-ui/core";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  mapHeader: {
    position: "absolute",
    top: "1%",
    left: "1%",
    zIndex: "2",
  },
}));

export function GoogleMapContainer({ marker }) {
  const center = {
    lat: marker.lat,
    lng: marker.lng,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const classes = useStyles();
  const [markers, setMarkers] = useState([]);
  // const onMapClick = useCallback((event) => {
  //   setMarkers([
  //     ...markers,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <>
      <div className={classes.mapWrapper}>
        <Box display="flex" className={classes.mapHeader} alignItems="center">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            height="70"
            width="70"
          />
          <Typography variant="h5">Λειβαδιά Loayalty</Typography>
        </Box>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          options={options}
          //onClick={onMapClick}
        >
          <Marker
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        </GoogleMap>
      </div>
    </>
  );
}

export default GoogleMapContainer;
