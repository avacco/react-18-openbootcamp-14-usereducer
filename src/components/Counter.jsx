import React, { useReducer, useContext } from 'react';

// Se crean las acciones
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET     = 'RESET';

// Crea un contexto
const myContext = React.createContext(null);

// Minicomponente de contador que utiliza el contexto creado para acceder al valor de estado del contexto, reemplazando el local.
const Contador = () => {
 
  const state = useContext(myContext);

  return (
    <p>Contador: { state.count }</p>
   )
}

const Counter = () => {
  
    // Para utilizar el reducer, hay que crear un estado inicial
    const initialState = {
      count: 0
    }
  
    // Luego se crea el reducer asociado al estado
    const reducer = (state, action) => {

      // Evalua el tipo de accion con un switch
      // El contador incrementa o decrementa segun el valor del payload enviado
      switch (action.type) {
        case INCREMENT:
          return {
            ...state,
            count: state.count + action.payload.quantity
          }
          
        case DECREMENT:
          return {
            ...state,
            count: state.count - action.payload.quantity
          }

        case RESET:
          return {
            count: 0
          }
      
        default:
          return state;
      }
    }

  // Asigna useReducer a las acciones de state, reducer y dispatch
  const [state, dispatch] = useReducer(reducer, initialState)
    
  return (
    // Encierra dentro del contexto el contador 
    // Al hacer click en los botones de incrementar o reducir, despacha la acción del tipo correspondiente con una payload indicando la cantidad a incrementar/reducir
    // El boton de restaurar despacha la acción de RESET, que deja el contador en 0.
    <myContext.Provider value={state}>
      <div>
        <Contador/>
        <button onClick={
          () => dispatch({type: INCREMENT,
                          payload: {
                            quantity: 1
                          }
                        })
          }
        >
          Incrementar 1
        </button>
        <button onClick={
          () => dispatch({type: DECREMENT,
                          payload: {
                            quantity: 2
                          }
                        })
          }
        >
          Reducir 2
        </button>

        <button onClick={
          () => dispatch({type: RESET})
          }
        >
          Restaurar
        </button>



      </div>
    </myContext.Provider>


    
  );
}

export default Counter;
