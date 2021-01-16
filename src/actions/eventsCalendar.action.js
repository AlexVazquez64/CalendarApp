
import { types } from '../types/types';

export const eventAddNew = ( Event ) => ({
  type: types.eventAddNew,
  payload: Event
  
});

export const eventSetActive = ( Event ) => ({
  type: types.eventSetActive,
  payload: Event
  
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
});

export const eventUpdated = ( Event ) => ({
  type: types.eventUpdated,
  payload: Event
});

export const eventDeleted = () => ({
  type: types.eventDeleted
});