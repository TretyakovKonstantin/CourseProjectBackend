import React, {Component} from 'react';
import {Schedule} from 'primereact/components/schedule/Schedule';
import {connect} from 'react-redux';
import agent from "../../agent";
import EventModal from './EventModal';
import moment from 'moment';
import {
  ADD_EVENT, REMOVE_EVENT, EVENT_PAGE_LOADED, EVENT_PAGE_UNLOADED, EDIT_EVENT
} from "../../constants/actionTypes";

const mapStateToProps = state => ({
  events: state.event.events,
  currentUser: state.common.currentUser,
  selectedDate: ''
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: EVENT_PAGE_LOADED, payload}),
  onAddEvent: payload =>
    dispatch({type: ADD_EVENT, payload}),
  onRemoveEvent: payload =>
    dispatch({type: REMOVE_EVENT, payload}),
  onUnload: () => dispatch({type: EVENT_PAGE_UNLOADED}),
  onEditEvent: payload =>
    dispatch({type: EDIT_EVENT, payload})
});


class Timetable extends Component {
  title = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

  state = {
    selectedDate: '',
    selectedOption: false,
    selectedEvent: null
  };

  componentWillMount() {
    this.props.onLoad(
      agent.Events.userEvents(this.props.currentUser)
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onRemoveEvent = ({id}) => {
    this.props.onRemoveEvent(agent.Events.del(id));
    this.onCloseModal();
  };

  onAddEvent = (event) => {
    this.props.onAddEvent(agent.Events.create(event));
    this.onCloseModal();
  };

  onEditEvent = (event) => {
    this.props.onEditEvent(agent.Events.edit(event));
    this.onCloseModal();
  };

  onCloseModal = () => {
    this.setState(() => ({selectedOption: false}))
  };

  onDayClick = ({date}) => {
    const selectedDate = moment(date._i).format("MM/DD/YY");
    this.setState(() => ({
      selectedDate,
      selectedEvent: null,
      selectedOption: true
    }));
  };

  onEventClick = (event) => {

    const start = moment(event.calEvent.start._i, "YYYY-MM-DD").format("MM/DD/YY");
    const end = event.calEvent.end ? moment(event.calEvent.end._i, "YYYY-MM-DD").format("MM/DD/YY") : start;
    const title = event.calEvent.title;
    const id = event.calEvent.id;

    this.setState(() => ({
      selectedDate: start,
      selectedEvent: {id, title, start, end},
      selectedOption: true
    }))
  };

  render() {

    return (
      <div>
        <div>
          <Schedule title={this.title}
                    events={this.props.events}
                    onDayClick={this.onDayClick}
                    onEventClick={this.onEventClick}
                    eventLimit={4}/>
          <EventModal
            onSubmit={this.onAddEvent}
            selectedOption={this.state.selectedOption}
            onCloseModal={this.onCloseModal}
            event={this.state.selectedEvent}
            selectedDate={this.state.selectedDate}
            onRemoveEvent={this.onRemoveEvent}
            onEditEvent={this.onEditEvent}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
