import runtimeEnv from "@mars/heroku-js-runtime-env";

import React, {useState} from 'react';
// Dependencies
import {GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
// Components
import AddRest from "./AddRest";
import RestMarker from "./RestMarker";
// Icons
import markerUserIcon from "../img/marker-user.png";
import markerCenterIcon from "../img/marker-center.png";

// Map Style
const styles = require('../data/GoogleMapStyles.json');

// Production Environment
const env = process.env.NODE_ENV === 'production' ? runtimeEnv() : process.env;
const REACT_APP_G_API_KEY = env.REACT_APP_G_API_KEY;

export default function MapGoogle(props) {
  const {center, userMarker, openInfoWindow, closeInfoWindow, activeRest, handleActiveRest,
         mapState, restaurants, handleNewData } = props;
  const {lat, lng} = props.userLocation;
  const [map, setMap] = useState();

  function onDragEnd() {
    props.handleCenterChange( {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    });
  }

  function onZoomChanged() {
    if(map){
      const zoom = map.getZoom();
      props.handleZoomChange(zoom);
    }
  }

  return (
    <div>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={REACT_APP_G_API_KEY}
      >
        <GoogleMap
          onLoad={map => {setMap(map)}}
          id='restaurants-map'
          mapContainerStyle={{
            height: "100vh",
            width: "100%"
          }}
          zoom={15}
          center={center}
          onRightClick={e => openInfoWindow(e)}
          onDragEnd={onDragEnd}
          onZoomChanged={onZoomChanged}
          options={{
            disableDefaultUI: true,
            keyboardShortcuts: false,
            scaleControl: true,
            scrollWheel: true,
            draggable: true,
            styles: styles
          }}
        >
          {/* Load user Marker */}
          {userMarker &&
          <Marker
            icon={{url: markerUserIcon}}
            position={{lat, lng}}
          />
          }

          {/* Center Marker */}
          {center && ((center.lat !== lat) && (center.lng !== lng)) &&
          <Marker
            defaultClickable={false}
            icon={{url: markerCenterIcon}}
            position={{lat: center.lat, lng: center.lng}}
          />
          }

          {/* Load Restaurant Markers */}
          {props.restaurants.map( (r, id) =>
            <RestMarker
              key={id}
              position={{lat: r.lat, lng: r.lng}}
              index={r.id}
              restaurant={r}
              activeRest={activeRest}
              handleActiveRest={handleActiveRest}
            />)
          }

          {/* Load Add Restaurant InfoWindow on right click */}
          {mapState.isRestAddButtonDisplayed &&
          <InfoWindow
            position={{lat: mapState.newRestData.lat, lng: mapState.newRestData.lng}}
            onCloseClick={closeInfoWindow}
          >
            <div>
              <h4>Add restaurant</h4>
              <p>{mapState.newRestData.address}</p>
              <AddRest
                restaurants={restaurants}
                newRestData={mapState.newRestData}
                closeInfoWindow={closeInfoWindow}

                handleNewData={handleNewData}
              />
            </div>
          </InfoWindow>
          }

        </GoogleMap>
      </LoadScript>
    </div>
  )
};