import React from 'react';

const NoteTemplate = (props) => {
  const onRemoveNoteClick = (id) => {
    props.onRemoveNote(id)
  };
  return (
    <div className="news">
      <h3>{props.title}</h3>
      <p>{props.body}</p>
      <button className="button button--link__blue" onClick={onRemoveNoteClick}>Удалить заметку</button>
    </div>
  );
};

export default NoteTemplate;