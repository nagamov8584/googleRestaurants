import runtimeEnv from "@mars/heroku-js-runtime-env";

// Imports
import React from 'react';
// CSS
import '../css/style.css';
// Components
import MapGoogle from "./MapGoogle";
// Dependencies
import Geocode from "react-geocode";
import {Button, Icon} from "semantic-ui-react";
import useObjectState from "./hooks/useObjectState";

// Production Environment
const env = process.env.NODE_ENV === 'production' ? runtimeEnv() : process.env;
const REACT_APP_G_API_KEY = env.REACT_APP_G_API_KEY;

export default function Map(props) {
  const emptyRestData = {address: '', lat: '', lng: ''};

  const [state, setState] = useObjectState({
    isRestAddButtonDisplayed: false,
    isRestAddModalOpen: false,
    newRestData: emptyRestData
  });

  function closeInfoWindow() {
    setState({
      isRestAddButtonDisplayed: false,
      newRestData: emptyRestData
    })
  }

  function openInfoWindow(e) {
    let restData = {};

    Geocode.setApiKey(REACT_APP_G_API_KEY);
    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      response => {
        const address = response.results[0].formatted_address;
        restData = {
          address: address,
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };

        setState({
          isRestAddButtonDisplayed: true,
          newRestData: restData
        });
      },
      error => {
        console.error('Geocode error: ' + error);
      }
    )
  }

  const {userLocation, restaurants, center, activeRest, handleRestSearch,
          handleActiveRest, handleCenterChange, handleNewData, handleZoomChange} = props;
  const {isRestSearchAllowed, isUserMarkerShown} = props.flags;

  return(
    <div>
      <MapGoogle
        restaurants={restaurants}
        center={center}
        userLocation={userLocation}
        userMarker={isUserMarkerShown}
        activeRest={activeRest}
        mapState={state}

        closeInfoWindow={closeInfoWindow}
        openInfoWindow={openInfoWindow}

        handleNewData={handleNewData}
        handleZoomChange={handleZoomChange}
        handleActiveRest={handleActiveRest}
        handleCenterChange={handleCenterChange}
      />
      <Button className='search-toggle-button' toggle active={isRestSearchAllowed} onClick={handleRestSearch}>
        {isRestSearchAllowed &&
        <p><Icon name='check square' />Search as I move the map</p>}
        {!isRestSearchAllowed &&
        <p><Icon name='square outline' />Search as I move the map</p>}
      </Button>
    </div>
  )
}