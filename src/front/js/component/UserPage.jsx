import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const { store, actions } = useContext(Context);
  const logged = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if(logged){
      actions.showUser();
    }
    // Si no hay token, redirige al inicio de sesión
    if (!logged) {
      navigate('/');
    }
  }, [logged, navigate]);

  return (
    <ul>
      {store.usersLogged && store.usersLogged.length > 0 &&(
        store.usersLogged.map(user => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))
      )}
    </ul>
  );
}
