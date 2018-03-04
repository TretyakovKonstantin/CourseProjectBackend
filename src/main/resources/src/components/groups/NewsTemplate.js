import React from 'react';

const NewsTemplate = ({title, body}) => (
  <div className="news">
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
);

export default NewsTemplate;