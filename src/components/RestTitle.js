// Imports
import React from 'react'
// Images
import foodPlate from '../img/food-plate.jpg'
// CSS
import '../css/style.css';
// Components
import {AvgRatingComponent} from "./RatingComponents";
// Dependencies
import {Button, Icon, Item } from "semantic-ui-react";

export default function RestTitle(props) {
  const {avgRating, active} = props;
  const {restaurantName, streetViewURL, details, address} = props.item;

  const photo = streetViewURL ? streetViewURL : (details.photoUrl ? details.photoUrl : foodPlate);

  return(
    <Item>
      <Item.Image src={photo} size='tiny' floated='left'/>

      <Item.Content>
        <Item.Header as='a'>{restaurantName}</Item.Header>
        <Item.Meta>
          <span className='restaurant'>{address}</span>
        </Item.Meta>
        <Item.Extra>
          <AvgRatingComponent avgRating={avgRating}/>
          <Button
            className='more-info'
            size='mini'
            floated='right'
          >
            {active ? 'Less' : 'More Info'}<Icon name='dropdown'/>
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>)
};