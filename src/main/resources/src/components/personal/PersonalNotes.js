import React from 'react';
import {connect} from 'react-redux'
import NoteInputTemplate from "./NoteInputTemplate";
import {DataList} from "primereact/components/datalist/DataList";
import agent from "../../agent";
import {
  ADD_NOTE, NOTES_PAGE_LOADED, NOTES_PAGE_UNLOADED, REMOVE_NOTE
} from "../../constants/actionTypes";

const mapStateToProps = state => ({
  notes: state.note.notes,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: NOTES_PAGE_LOADED, payload}),
  onAddNote: payload =>
    dispatch({type: ADD_NOTE, payload}),
  onRemoveNote: payload =>
    dispatch({type: REMOVE_NOTE, payload}),
  onUnload: () => dispatch({type: NOTES_PAGE_UNLOADED})
});

class PersonalNotes extends React.Component {
  componentWillMount() {
    let notes = agent.Notes.userNotes(this.props.currentUser);
    this.props.onLoad(notes);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onAddNote = (note) => {
    this.props.onAddNote(agent.Notes.create(note))
  };

  onRemoveNote = (id) => {
    this.props.onRemoveNote(agent.Notes.del(id))
  };

  noteTemplate = ({id, title, body}) => {
    const onRemoveNoteClick = () => {
      this.onRemoveNote(id);
    };
    return (
      <div className="news">
        <h3>{title}</h3>
        <p>{body}</p>
        <button className="button button--link__blue" onClick={onRemoveNoteClick}>Удалить заметку</button>
      </div>)
  };

  render() {
    return (
      <div className="regular-page__main-content">
        <h2>Мои Заметки</h2>
        <NoteInputTemplate onAddNote={this.onAddNote}/>
        <DataList value={this.props.notes} itemTemplate={this.noteTemplate} lazy={true} rows={20}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalNotes);
