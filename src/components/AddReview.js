// Imports
import React from 'react'
// Custom Hooks
import useUpdate from "./hooks/useUpdate";
// Components
import {AddReviewRatingComponent} from './RatingComponents';
// Dependencies
import {Button, Form} from "semantic-ui-react";

export default function AddReview(props) {
  const [reviewStars, setReviewStars] = useUpdate('');
  const [reviewContent, setReviewContent] = useUpdate('');
  const [reviewersName, setReviewersName] = useUpdate('');

  function handleSubmit (e, {name, value}) {
    e.preventDefault();
    const {restaurant, handleNewData, handleClose} = props;

    const newReview = {
      "id": 'rev' + restaurant.details.reviews.length,
      "name": reviewersName,
      "stars": reviewStars,
      "comment": reviewContent
    };

    handleNewData(newReview, 'review');
    handleClose(e, {name, value});
  }

  return(
    <Form onSubmit={handleSubmit} name='addReviewModalOpen' value={false}>
      <Form.Field required>
        <label>How many stars?</label>
        <AddReviewRatingComponent handleChange={setReviewStars} />
      </Form.Field>
      <Form.Field required>
        <label>What did you like in particular?</label>
        <Form.TextArea
          placeholder='Tell us your thoughts. (min. 5 characters)'
          name='reviewContent'
          type='text'
          value={reviewContent}
          onChange={setReviewContent}
        />
      </Form.Field>
      <Form.Field required>
        <label>Your Name</label>
        <Form.Input
          placeholder="e.g. John Dough (min. 3 characters)"
          name='reviewersName'
          value={reviewersName}
          onChange={setReviewersName}
        />
      </Form.Field>

      <Button
        disabled={reviewStars === '' ||
                  reviewersName.length < 3 ||
                  reviewContent.length < 5}
        positive
      >
        Add Review
      </Button>
    </Form>
  )
}