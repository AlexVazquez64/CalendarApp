import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { showSwalError } from "../helpers/showSwalError";


export const startLogin = ( email, password ) => {
  return async( dispatch ) => {
    
    const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
    const body = await resp.json();

    if( body.ok ) {
      localStorage.setItem( 'token', body.token );
      localStorage.setItem( 'token-init.date', new Date().getTime() );

      dispatch( login({
        uid: body.uid,
        name: body.name
      }) );

    } else {
      showSwalError( body.msg );
    }
  }
}

export const startRegister = ( name, email, password ) => {
  return async( dispatch ) => {
    
    const resp = await fetchWithoutToken( 'auth/new', { name, email, password }, 'POST' );
    const body = await resp.json();
    
    if( body.ok ) {
      localStorage.setItem( 'token', body.token );
      localStorage.setItem( 'token-init.date', new Date().getTime() );
      
      dispatch( login({
        uid: body.uid,
        name: body.name
      }) );
      
    } else {
      showSwalError( body.msg );
    }
  }
}

export const startChecking = () => {
  return async( dispatch ) => {

    const resp = await fetchWithToken( 'auth/renew' );
    const body = await resp.json();
    
    if( body.ok ) {
      localStorage.setItem( 'token', body.token );
      localStorage.setItem( 'token-init.date', new Date().getTime() );
      
      dispatch( login({
        uid: body.uid,
        name: body.name
      }) );
      
    } else {
      dispatch( checkingFinish() );
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
});

const login = ( user ) => ({
  type: types.authLogin,
  payload: user
});

export const startLogout = () => {
  return ( dispatch ) => {

    localStorage.clear();
    dispatch( logout() );
  }
}

const logout = () => ({
  type: types.authLogout
});