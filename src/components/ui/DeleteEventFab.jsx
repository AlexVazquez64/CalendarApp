import React from 'react';
import { useDispatch } from 'react-redux';

import { eventDeleted } from '../../actions/eventsCalendar.action';

const DeleteEventFab = () => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch( eventDeleted() );
  }

  return (
    <button
      className="bnt btn-danger fab-danger"
      onClick={ handleDelete }
    >
      <i className="fas fa-trash"></i>
      <span className="ms-2">Borrar evento</span>
    </button>
  )
}

export default DeleteEventFab
