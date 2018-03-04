import React from 'react';
import {Link} from 'react-router-dom';

export const NonAuthPage = () => (
  <div className="auth-layout">
    <div className="box-layout__box">
      <h2>Добро пожаловать на Хогвартс Экспресс</h2>
      <p>Зарегистрируйтесь или <br/>авторизуйтесь</p>
      <Link to="/login">
        <button className="auth-button">Авторизоваться</button>
      </Link>
      <Link to="/register">
        <button className="auth-button">Зарегистрироваться</button>
      </Link>
    </div>
  </div>
);