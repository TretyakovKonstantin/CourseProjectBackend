import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <div className="box-layout__box">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <p><Link to="/">Вернуться</Link></p>
    </div>
  </div>
);

export default NotFoundPage;
