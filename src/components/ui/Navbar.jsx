import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';

const Navbar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch( startLogout() );
  }



  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          { name }
        </span>

        <button
          className="btn btn-outline-danger"
          onClick= { handleLogout }
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="ms-1">Salir</span>
        </button>
      </div>
      
    </div>
  )
}

export default Navbar
