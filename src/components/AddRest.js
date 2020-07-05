import runtimeEnv from "@mars/heroku-js-runtime-env";
// Imports
import React, {useState} from 'react';
// Images
import logoImg from '../img/logo.png';
// Custom Hooks
import useUpdate from "./hooks/useUpdate";
// Dependencies
import {Form, Checkbox, Button, Modal, Image, Header} from 'semantic-ui-react';

// Production Environment
const proxyPrefix = process.env.NODE_ENV === 'production' ? '/google-proxy' : '';
const env = process.env.NODE_ENV === 'production' ? runtimeEnv() : process.env;
const REACT_APP_G_API_KEY = env.REACT_APP_G_API_KEY;

// TODO investigate why {} is supplied to isTermsChecked state instead of boolean

export default function AddRest(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useUpdate(false);

  const [restName, setRestName] = useUpdate('');
  const [phoneNumber, setPhoneNumber] = useUpdate('');
  const [imageUrl, setImageUrl] = useUpdate('');
  const [restUrl, setRestUrl] = useUpdate('');

  const {closeInfoWindow, newRestData, restaurants, handleNewData} = props;

  function handleCancel () {
    setIsModalOpen(false);
    setIsTermsChecked({value: false});
    props.closeInfoWindow();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = restaurants.length;
    const {address, lat, lng} = newRestData;

    const newRestaurant = {
      "id": id,
      "restaurantName": restName,
      "address": address,
      "lat": lat,
      "lng": lng,
      "streetViewURL": `${proxyPrefix}/maps/api/streetview?`+
        `size=500x300`+
        `&location=${lat},${lng}`+
        `&heading=151.78`+
        `&pitch=-0.76`+
        `&key=${REACT_APP_G_API_KEY}`,
      "isFromFile": true,
      "place_id": "",
      "avgRating": 0,
      "numberOfReviews": 0,
      "details": {
        "reviews": [],
        "photoUrl": imageUrl,
        "phoneNumber": phoneNumber,
        "link": restUrl,
      }
    };

    handleNewData(newRestaurant, 'restaurant');
    handleCancel();
  }

  return(
    <div>
      {console.log('isTermsChecked: ' + isTermsChecked)}
      <Button.Group>
        <Button
          onClick={setIsModalOpen}
          positive
          value={true}
          name='modalOpen'
        > Add </Button>
        <Button.Or />
        <Button onClick={closeInfoWindow}>Cancel</Button>
      </Button.Group>

      <Modal
        open={isModalOpen}
        onClose={handleCancel}
      >
        <Modal.Content image>
          <Image wrapped size='medium' src={logoImg} />

          <Modal.Description>
            <Header>Add New Restaurant Details</Header>
            <Form onSubmit={handleSubmit}>
              <Form.Field required>
                <label>Restaurant Name</label>
                <Form.Input
                  placeholder="e.g. Pizza Express (min. 4 characters)"
                  name='restName'
                  value={restName}
                  onChange={setRestName}
                />
              </Form.Field>
              <Form.Field>
                <label>Image URL</label>
                <Form.Input
                  placeholder='e.g. http://mcdonalds.com/main-photo.jpg'
                  name='imageUrl'
                  value={imageUrl}
                  onChange={setImageUrl}
                />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <Form.Input
                  placeholder='e.g. 07456066789'
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </Form.Field>
              <Form.Field>
                <label>Restaurant Website</label>
                <Form.Input
                  placeholder='e.g. http://www.restaurant-name.com'
                  name='restUrl'
                  value={restUrl}
                  onChange={setRestUrl}
                />
              </Form.Field>

              <Form.Field required>
                <Checkbox
                  checked={isTermsChecked}
                  name='isTermsChecked'
                  onClick={setIsTermsChecked}
                  value={!isTermsChecked}
                  label='I agree to the Terms and Conditions' required/>
              </Form.Field>
              <Button.Group>
                <Button
                  disabled={restName.length <= 3 || !isTermsChecked}
                  positive
                >
                  Submit
                </Button>
                <Button.Or />
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
              </Button.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}