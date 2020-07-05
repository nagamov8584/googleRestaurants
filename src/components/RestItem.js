// Imports
import React, {useEffect, useState, useRef} from 'react';
// Components
import RestTitle from "./RestTitle";
import RestItemCont from "./RestItemCont";
// Dependencies
import {Accordion} from "semantic-ui-react";

export default function RestItem(props) {
  const {activeRest, handleNewData, restaurant, windowWidth} = props;
  const [scrollFlag, setScrollFlag] = useState(true);
  const restItemRef = useRef(null);

  useEffect(() => {
    if(activeRest === -1) {
      setScrollFlag(true);
    }
    if(scrollFlag) {
      if(activeRest === restaurant.id) {
        scrollToItem();
        setScrollFlag(false);
      }
    }
  },[activeRest, scrollFlag, restaurant.id]);

  function handleAccordionClick(e, titleProps) {
    scrollToItem();
    const {index} = titleProps;
    props.handleActiveRest(index);
  }

  function scrollToItem() {
    setTimeout(() =>
    restItemRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    }), 220);
  }

  const {id, avgRating} = restaurant;

  return(
    <div ref={restItemRef}>
      <Accordion className='mb-2' styled>
        <Accordion.Title
          active={activeRest === id}
          index={id}
          onClick={handleAccordionClick}>
          <RestTitle
            active={activeRest === id}
            item={restaurant}
            avgRating={avgRating}
          />
        </Accordion.Title>
        {activeRest === id &&
        <Accordion.Content active={activeRest === id}>
          <RestItemCont
            restaurant={restaurant}
            windowWidth={windowWidth}
            handleNewData={handleNewData}
          />
        </Accordion.Content>
        }
      </Accordion>
    </div>
  )
}