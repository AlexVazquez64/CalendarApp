import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          Hector Alejandro
        </span>

        <button className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i>
          <span className="ms-1">Salir</span>
        </button>
      </div>
      
    </div>
  )
}

export default Navbar
