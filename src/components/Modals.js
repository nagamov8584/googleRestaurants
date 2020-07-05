// Imports
import React, { useState } from 'react'
// Components
import AddReview from "./AddReview";
// Dependencies
import {Modal, Button, Icon, Header, Image} from 'semantic-ui-react'

const MoreReviews = () => {
  const[ modalOpen, setModelOpen ] = useState();

  return(
    <Modal
      basic
      size='small'
      open={modalOpen}
      onClose={() => setModelOpen(false)}
      trigger={<Button
                  onClick={() => setModelOpen(true)}
                  compact animated='vertical'
                  className='load-more-reviews'
                  color='blue'
                >
                  <Button.Content hidden>
                    <Icon name='arrow down'/>
                  </Button.Content>
                  <Button.Content visible>More reviews</Button.Content>
                </Button>}
    >
      <Header icon='browser' content='Like this feature?' />
      <Modal.Content>
        <h3>This feature is available only for subscribed users.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='green'
          onClick={() => setModelOpen(false)}
          inverted
        >
          <Icon name='checkmark' /> Got it
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

const AddReviewModal = props => {
  const[ modalOpen, setModelOpen ] = useState();
  const { restaurant, photoUrl, handleNewData } = props;

  return(
    <Modal
      open={modalOpen}
      onClose={() => setModelOpen(false)}
      trigger={<Button onClick={()=> setModelOpen(true)}
                animated
                compact
                color='green'
               >
                 <Button.Content hidden>Write it now!</Button.Content>
                 <Button.Content visible>
                   <Icon name='write'/>Add a Review
                 </Button.Content>
               </Button>}
    >
      <Modal.Header>Share your experience with us</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src={photoUrl} />
        <Modal.Description>
          <Header>Tell us what did you like about {restaurant.restaurantName}?</Header>
          <AddReview
            restaurant={restaurant}
            handleClose={() => setModelOpen(false)}
            handleNewData={handleNewData}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
};


export {MoreReviews, AddReviewModal}