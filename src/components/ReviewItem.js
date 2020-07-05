// Imports
import React, {useEffect, useState} from 'react'
// CSS
import '../css/style.css';
// Components
import {SingleRatingComponent} from "./RatingComponents";
// Dependencies
import {Grid, Image, Header, GridColumn} from 'semantic-ui-react'

export default function ReviewItem(props) {
  const PLACEHOLDER_URL = 'https://bit.ly/2VPaipa';
  const {image_url, name, comment, stars} = props.item;

  const [isReviewLong, setIsReviewLong] = useState(false);
  const [isFullReviewDisplayed, setIsFullReviewDisplayed] = useState(false);
  const [excerptReview, setExcerptReview] = useState('');

  function shortenString(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + '... ';
  }

  function toggleView() {
    setIsFullReviewDisplayed(prevState => !prevState);
  }

  useEffect(() => {
    if (comment.length > 255) {
      const excerptReview = shortenString(comment, 255);
      setIsReviewLong(true);
      setExcerptReview(excerptReview);
    }
  },[comment]);

  return(
    <Grid centered>
      <GridColumn width={4} only='computer tablet'>
        <Image
          className='center-image'
          size='small'
          src={image_url ? image_url : PLACEHOLDER_URL}
        />
      </GridColumn>

      <GridColumn width={12} only='computer tablet'>
        <Header as='h4'>{name} <SingleRatingComponent rating={stars} /></Header>
        <div>
          {!isReviewLong ? comment : isFullReviewDisplayed ? comment : excerptReview}
          {isReviewLong ? isFullReviewDisplayed ?
            <p className='paragraph-link' onClick={toggleView}>show less</p> :
            <p className='paragraph-link' onClick={toggleView}>read more</p> :
            ''
          }
        </div>
      </GridColumn>

      <GridColumn textAlign='center' width={16} only='mobile'>
          <Header as='h4'>{name} <SingleRatingComponent rating={stars} /></Header>
          <div>
            {!isReviewLong ? comment : isFullReviewDisplayed ? comment : excerptReview}
            {isReviewLong ? isFullReviewDisplayed ?
              <p className='paragraph-link' onClick={toggleView}>show less</p> :
              <p className='paragraph-link' onClick={toggleView}>read more</p> :
              ''
            }
          </div>
      </GridColumn>
    </Grid>
  )
}