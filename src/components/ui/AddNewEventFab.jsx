import React from 'react';
import { useDispatch } from 'react-redux';
import { eventClearActiveEvent } from '../../actions/eventsCalendar.action';
import { uiOpenModal } from '../../actions/ui.action';

const AddNewFab = () => {

  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch( eventClearActiveEvent() );
    dispatch( uiOpenModal() );
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleOnClick }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}

export default AddNewFab
