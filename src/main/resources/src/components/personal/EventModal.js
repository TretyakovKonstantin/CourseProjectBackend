import React from 'react';
import Modal from 'react-modal';
import uuid from 'uuid';
import {Calendar} from 'primereact/components/calendar/Calendar.js';

export default class EventModal extends React.Component {

  state = {
    dates: ''
  };

  onAfterOpen = () => {
    const event = this.props.event;

    this.setState({
      event,
      start: '',
      dates:'',
      title: event ? event.title : '',
      error: ''
    });


  };

  onTitleInputChanged = (e) => {
    let title = e.target.value;
    this.setState(() => ({title}))
  };

  onDateInputChanged = (e) => {
    let dates = e.value;
    let [start, end] = dates.toString().split(",");
    this.setState({dates, start, end})
  };

  onSaveButtonClick = () => {
    const event = this.state.event;
    console.log(event);

    let title = this.state.title;
    let start = this.state.start ? this.state.start : event.start;
    let end = this.state.end ? this.state.end : this.state.end;
    console.log(event);
    let id = event ? event.id : uuid();
    console.log(event);

    console.log(id);
    if (!title) {
      this.setState({error: 'Укажите, пожайлуста, название события'});
      return;
    }
    this.props.event ?
      this.props.onEditEvent({
        id,
        title,
        start,
         end
      }) : this.props.onSubmit({
        id,
        title,
        start,
        end
      })
  };

  onRemoveEvent = () => {
    this.props.onRemoveEvent(this.state.event);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.selectedOption}
        contentLabel="Create event"
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
        onAfterOpen={this.onAfterOpen}
      >
        <div>
          <form>
            <fieldset>

              <p>Название события</p>
              <fieldset className="input-group__item">
                <input
                  className="text-input"
                  type="text"
                  placeholder="Событие"
                  value={this.state.title}
                  onChange={this.onTitleInputChanged}
                />
              </fieldset>

              <fieldset className="input-group__item">
                <Calendar
                  placeholder="Введите временной промежуток"
                          selectionMode="range"
                          value={this.state.dates}
                          onChange={this.onDateInputChanged}
                />
              </fieldset>

            </fieldset>
          </form>
          <button className="button" onClick={this.onSaveButtonClick}>
            <i className="ion-plus-round"/> Сохранить
          </button>
          {this.props.event ?
            <button className="button" onClick={this.onRemoveEvent}>
              <i className="ion-trash-a"/> Удалить
            </button> :
            <button className="button" onClick={this.props.onCloseModal}>Отмена</button>
          }

        </div>
        {this.state.error && <p className="form_error">{this.state.error}</p>}
      </Modal>
    )
  }
}
