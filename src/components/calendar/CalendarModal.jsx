import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui.action';
import { customStyles } from '../../helpers/center-modal-styles';

import './calendar.css';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/eventsCalendar.action';


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const startDate = moment().minutes(0).seconds(0).add(1, 'hours');
// const endDate = moment().minutes(0).seconds(0).add(2, 'hours');
const endDate2 = startDate.clone().add(1, 'hours');

const initEvent = {
  title: 'Titulo del evento',
  notes: '',
  start: startDate.toDate(),
  end: endDate2.toDate()
}

const CalendarModal = () => {

  const dispatch = useDispatch();

  const { modalOpen } = useSelector( state => state.ui );
  const { activeEvent } = useSelector( state => state.calendar );
  
  // const [ startValueDate, setStartValueDate ] = useState( startDate.toDate() );
  // const [ endValueDate, setEndtValueDate ] = useState( endDate2.toDate() );
  const [ titleValid, setTitleValid ] = useState( true );

  // El useState solo se utiliza cuando el estado se maneja en el mismo componente
  // const [ modalIsOpen, setModalIsOpen ] = useState( modalOpen );
  // Si queremos manejar el estado en todos los componentes se va a utilizar,
  // redux, thunk

  const [ formValues, setFormValues ] = useState( initEvent );
  const { title, notes, start, end } = formValues;

  useEffect(() => {

    ( activeEvent ) ? setFormValues( activeEvent ) : setFormValues( initEvent );

  }, [ activeEvent, setFormValues ])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [ target.name ]: target.value
    });

    ( title.trim().length < 6 ) ? setTitleValid( false ) : setTitleValid( true );
  }

  const handleStartDateChange = ( e ) => {
    // setStartValueDate( e );
    setFormValues({
      ...formValues,
      start: e
    });
  }

  const handleEndDateChange = ( e ) => {
    // setEndtValueDate( e );
    setFormValues({
      ...formValues,
      end: e
    });
  }

  const closeModal = () => {
    // TODO: Cerrar el modal
    dispatch( uiCloseModal() );
    // dispatch( eventSetActive(null) );
    dispatch( eventClearActiveEvent() );
    setFormValues( initEvent );
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();

    const momentStart = moment( start );
    const momentEnd = moment( end );

    if ( momentStart.isSameOrAfter( momentEnd ) ) {
      return Swal.fire({
        title: 'Error',
        text: 'La fecha fin debe de ser mayor a la fecha de inicio',
        icon: 'error'
      });
    }

    if ( !activeEvent ) {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: '12345',
            name: 'Alejandro'
          }
        })
      );
    } else {
      dispatch( eventUpdated( formValues ) );
      dispatch( eventClearActiveEvent() );
    }


    // TODO: realizar grabación 
    ( titleValid ) && dispatch( uiCloseModal() );
    
  }

  return (
    <Modal
      isOpen={ modalOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={ closeModal }
      style={ customStyles }
      closeTimeoutMS={ 200 }
      className="modal"
      overlayClassName="modal-fondo"
    >

      <h1> { ( activeEvent ) ? 'Editar evento' : 'Nuevo evento' } </h1>
      <hr />
      <form
        className="container"
        onSubmit={ handleSubmitForm }
      >

        <div className="mb-3">
          <label className="form-label">Fecha y hora inicio</label>
          <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            className="form-control"
            onChange={ handleStartDateChange }
            value={ start }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            minDate={ start }
            onChange={ handleEndDateChange }
            value={ end }
          />
        </div>

        <hr />
        <div className="mb-3">
          <label className="form-label">Titulo y notas</label>
          <input
            autoComplete="off"
            className={ `form-control ${ titleValid ? 'is-valid' : 'is-invalid' } ` }
            name="title"
            minLength="6"
            onChange={ handleInputChange }
            placeholder="Título del evento"
            required
            type="text"
            value={ title }
          />
          <div id="titleHelp" className="form-text text-muted">Una descripción corta</div>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            name="notes"
            onChange={ handleInputChange }
            placeholder="Notas"
            required
            rows="5"
            type="text"
            value={ notes }
          ></textarea>
          <div id="notesHelp" className="form-text text-muted">Información adicional</div>
        </div>

        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-outline-primary"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </div>

      </form>

    </Modal>
  )
}

export default CalendarModal