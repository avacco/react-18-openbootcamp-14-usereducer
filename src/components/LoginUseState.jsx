import React, { useState } from 'react';

// Login con useState
const LoginUseState = () => {

  // Declara los estados utilizados para el formulario de login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Configura las acciones a tomar durante el submit
  const submit = async(e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

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
      setIsLogged(true);
      setLoading(false);
    } catch (error) {
      setError(`Usuario o contraseña inválidos: ${error}`);
      setLoading(false);
      setUsername('');
      setPassword('');
    }
  } 

  const logout = () => {
    setIsLogged(false);
    setLoading(false);
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
              onChange={ (e) => setUsername(e.currentTarget.value)}
              />
              <input 
              type='password' 
              placeholder='Contraseña' 
              value={password} 
              onChange={ (e) => setPassword(e.currentTarget.value)}
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

export default LoginUseState;
