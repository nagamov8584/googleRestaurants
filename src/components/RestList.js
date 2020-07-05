// Imports
import React from 'react'
// CSS
import '../css/style.css';
// Components
import RestItem from "./RestItem";
// Dependencies
import {Dimmer, Loader} from "semantic-ui-react";

export default function RestList(props) {

  function sortRestaurants() {
    // converts object into array (add sorting if you'd like)
    return Object.keys(props.restaurants).map(id => props.restaurants[id])
  }

  // Component Props
  const {activeRest, handleNewData, flags, restaurants, windowWidth, handleActiveRest} = props;
  const {isLoadingRestaurants} = props.flags;

  return(
    <div>
      <Dimmer.Dimmable dimmed={typeof flags === 'undefined' ? true : isLoadingRestaurants}>
        <Dimmer active={typeof flags === 'undefined' ? true : isLoadingRestaurants} inverted>
          <Loader>Loading Restaurants</Loader>
        </Dimmer>

        <p> Shortlisted Restaurants: {restaurants.length} </p>
        {
        sortRestaurants().map(restaurant =>
          <RestItem
            key={restaurant.id}
            restaurant={restaurant}
            activeRest={activeRest}
            windowWidth={windowWidth}
            handleNewData={handleNewData}
            handleActiveRest={handleActiveRest}
          />)
        }
      </Dimmer.Dimmable>
    </div>
  )
}