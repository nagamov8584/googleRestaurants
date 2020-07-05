// Imports
import React from 'react'
// Dependencies
import {Rating} from 'semantic-ui-react'

const AvgRatingComponent = props => <Rating size='tiny' rating={props.avgRating} maxRating={5} disabled/>;
const SingleRatingComponent = props => <Rating size='tiny' icon='star' rating={props.rating} maxRating={5} disabled />;
const AddReviewRatingComponent = props => {

  const handleRate = (e, {rating}) => {
    const name = 'reviewStars';
    props.handleChange(e, {name, value: rating});
  };

  return(
  <Rating size='massive' icon='star' defaultRating={0} maxRating={5} onRate={handleRate} />)
};

export { AvgRatingComponent, SingleRatingComponent, AddReviewRatingComponent }
