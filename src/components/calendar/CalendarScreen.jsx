import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import AddNewEventFab from '../ui/AddNewEventFab';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import Navbar from '../ui/Navbar';

import { messages } from '../../helpers/calendar-messages-es';
import { eventSetActive } from '../../actions/eventsCalendar.action';
import { uiOpenModal } from '../../actions/ui.action';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles.css'


import 'moment/locale/es';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const CalendarScreen = () => {

  const dispatch = useDispatch();
  
  const { events, activeEvent } = useSelector(state => state.calendar);

  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' )

  const onDoubleClik = (e) => {
    // console.log(e);
    dispatch( eventSetActive(e) );
    dispatch( uiOpenModal() );
    // console.log( 'abrir modal' );
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) );
    // dispatch( uiOpenModal() );
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem( 'lastView', e );
  }

  const onSelectSlot = (e) => {
    // console.log(e);
    dispatch( eventSetActive(null) );
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter= { eventStyleGetter }
        onDoubleClickEvent={ onDoubleClik }
        onSelectEvent={ onSelectEvent }
        onSelectSlot={ onSelectSlot }
        onView={ onViewChange }
        selectable = { true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
        
      />

      <AddNewEventFab />

      {
        ( activeEvent ) && <DeleteEventFab />
      }


      <CalendarModal />
    </div>
  )
}

export default CalendarScreen
