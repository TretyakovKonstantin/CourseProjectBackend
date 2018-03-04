import React from 'react';
import uuid from "uuid";

class NoteInputTemplate extends React.Component {
  state = {
    title: '',
      body: ''
  };

  onAddNote = () => {
    this.props.onAddNote({id: uuid(), title: this.state.title, body: this.state.body});
  };

  onHeaderChange = e => {
    let title = e.target.value;
    this.setState({title})
  };

  onInfoChange = e => {
    let body = e.target.value;
    this.setState({body})
  };

  render() {
    return (
      <div className="news">
        <form>
          <fieldset className="input-group__item">
            <input type="text"
                   value={this.state.title}
                   onChange={this.onHeaderChange}
                   className="note-text-input"
                   placeholder="Заголовок"/>
          </fieldset>
          <fieldset className="input-group__item">
            <textarea className="note-textarea"
                      placeholder="Добавьте здесь свою заметку"
                      value={this.state.body}
                      onChange={this.onInfoChange}/>
          </fieldset>
        </form>
        <button className="button button-link"
                onClick={this.onAddNote}
        >Добавить заметку
        </button>
      </div>
    );
  }
}

export default NoteInputTemplate;