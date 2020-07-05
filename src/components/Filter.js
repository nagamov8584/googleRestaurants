// Imports
import React from 'react'
// Dependencies
import {Container, Button, Rating} from "semantic-ui-react";

export default function Filter(props) {
  const {ratingMin, ratingMax, handleMinRate, handleMaxRate, handleItemClick} = props;

  return(
    <Container>
      <p>Choose your range:</p>
      <h5>Minimum rating</h5>
      <Rating
        clearable={true}
        rating={ratingMin}
        size="huge"
        maxRating={5}
        onRate={handleMinRate}
      />
      <p style={{fontSize: '9px'}}> *to clear selection, click on it again </p>
      <h5>Maximum rating</h5>
      <Rating
        rating={ratingMax}
        size="huge"
        maxRating={5}
        onRate={handleMaxRate}
      />
      <div style={{marginTop: '1.3rem'}}>
        <Button
          positive
          name='Restaurants'
          onClick={handleItemClick}
        >Filter</Button>
        <Button
          negative
          name='Restaurants'
          value='reset'
          onClick={handleItemClick}
        >Reset</Button>
      </div>
    </Container>
  )
}