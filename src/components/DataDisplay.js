// Imports
import React, {useState} from 'react'
// CSS
import '../css/style.css'
// Images
import logoImg from '../img/logo.png'
// Components
import Map from "./Map";
import Filter from './Filter'
import RestList from "./RestList";
// Dependencies
import {Menu, Segment, ItemGroup} from "semantic-ui-react";

export default function DataDisplay(props) {
  const [activeMenuItem, setActiveMenuItem] = useState('Restaurants');

  const handleMenuItemClick = (e, {name}) => {
    setActiveMenuItem(name);
    if(e.target.value === 'reset') {
      props.handleReset()
    }
  };

  const { restaurants, ratingMin, ratingMax, activeRest, handleActiveRest,
          handleNewData, handleMinRate, handleMaxRate, handleReset, center,
          userMarker, userLocation, handleZoomChange, handleRestSearch,
          handleCenterChange, flags, windowWidth } = props;

  return (
    <div className='data-display'>
        <Segment>
        <Menu size='mini'>
          <Menu.Item>
            <img src={logoImg} alt='logo'/>
          </Menu.Item>
          <Menu.Item
            name='Restaurants'
            active={activeMenuItem === 'Restaurants'}
            onClick={handleMenuItemClick} />
          {windowWidth < 768 &&
          <Menu.Item
            name='Map'
            active={activeMenuItem === 'Map'}
            onClick={handleMenuItemClick}
          />
          }
          <Menu.Menu position='right'>
            <Menu.Item
              name='Filter'
              active={activeMenuItem === 'Filter'}
              onClick={handleMenuItemClick}
            />
          </Menu.Menu>
        </Menu>
        </Segment>

      {activeMenuItem === 'Restaurants' &&
        <Segment>
          <ItemGroup divided>
            <RestList
              restaurants={restaurants.filter(rest =>
                rest.avgRating >= ratingMin &&
                rest.avgRating <= ratingMax)}
              activeRest={activeRest}
              flags={flags}
              windowWidth={windowWidth}

              handleNewData={handleNewData}
              handleActiveRest={handleActiveRest}
            />
          </ItemGroup>
        </Segment>
      }
      {activeMenuItem === 'Filter' &&
        <Segment>
          <Filter
            ratingMax={ratingMax}
            ratingMin={ratingMin}
            handleMinRate={handleMinRate}
            handleMaxRate={handleMaxRate}
            handleReset={handleReset}
            handleItemClick={handleMenuItemClick}
          />
        </Segment>
      }
      {windowWidth < 768 && activeMenuItem === 'Map' &&
        <Segment className='data-display-menu-segment'>
            <Map
              restaurants={restaurants.filter(rest =>
                rest.avgRating >= ratingMin &&
                rest.avgRating <= ratingMax)
              }
              center={center}
              flags={flags}
              userMarker={userMarker}
              userLocation={userLocation}
              activeRest={activeRest}

              handleRestSearch={handleRestSearch}
              handleNewData={handleNewData}
              handleZoomChange={handleZoomChange}
              handleActiveRest={handleActiveRest}
              handleCenterChange={handleCenterChange}
            />
        </Segment>
      }
    </div>
  )
}