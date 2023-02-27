import React, { useReducer } from 'react';

// Acciones
const FIELD = 'FIELD';
const LOGIN = 'LOGIN';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const LOGOUT = 'LOGOUT';

// Estado inicial
const initialState = {
  username: '',
  password: '',
  error: '',
  isLoading: false,
  isLogged: false

}

// Reducer
const loginReducer = (state, action) => {
  switch (action.type) {
    case FIELD:
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    
    case LOGIN:
      return {
        ...state,
        isLoading: true
      }

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true
      }

    case ERROR:
      return {
        ...state,
        error: 'Usuario o contraseña inválidos',
        isLoading: false,
        isLogged: false,
        username: '',
        password: ''
      }

    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        isLoading: false
      }

    default:
      break;
  }
}


// Login con reducer
const LoginUseReducer = () => {
  
  // Conecta el reducer con el estado
  const [state, dispatch] = useReducer(loginReducer, initialState)
  
  // Obtiene todas las variables del estado
  const { username, password, error, isLoading, isLogged } = state;

  // Submit
  const submit = async(e) => {
    e.preventDefault();
    // Despacha la accion LOGIN
    dispatch({type: LOGIN});   
    try{
      await function login({username, password}){
        new Promise((resolve,reject) => {
          setTimeout(() => {
            if(username === 'admin' && password === 'admin'){
              resolve();
            }else{
              reject();
            }
          }, 2000);
        })
      }
      // Despacha la accion SUCCESS si esta todo en orden, de lo contrario despacha ERROR
      dispatch({type: SUCCESS});
    } catch (error) {
      dispatch({type: ERROR});
    }
  } 

  const logout = () => {
    dispatch({type: LOGOUT});
  }

  return (
    <div className='App'>
      <div>
        {
          isLogged ? (
            <div>
              <h1>Bienvenido, {username}</h1>
              <button onClick={logout}>Salir</button>
            </div>
          )
          :
          (
            <form onSubmit={submit}>
              {
                error && <p style={{color: 'tomato'}}>{error}</p>
              }
              <input 
              type='text' 
              placeholder='Usuario' 
              value={username} 
              onChange={ (e) => dispatch({
                type: FIELD, 
                fieldName: 'username', 
                payload: e.currentTarget.value
              })}
              />
              <input 
              type='password' 
              placeholder='Contraseña' 
              value={password} 
              onChange={ (e) => dispatch({
                type: FIELD, 
                fieldName: 'password', 
                payload: e.currentTarget.value
              })}
              />
              <button type='submit'>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesion'}
              </button>

            </form>
          )
        }
      </div>
    </div>
  );
}

export default LoginUseReducer;
