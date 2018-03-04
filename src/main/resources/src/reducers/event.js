import {
  ADD_EVENT, REMOVE_EVENT, EVENT_PAGE_LOADED, EVENT_PAGE_UNLOADED, EDIT_EVENT
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EVENT_PAGE_LOADED:
      return {
        events: action.payload
      };
    case EVENT_PAGE_UNLOADED:
      return {};
    case ADD_EVENT:
      return {
        ...state,
        events: action.error ?
          null :
          [...state.events, action.payload]
      };
    case EDIT_EVENT:
      const event = action.payload;
      return {
        state,
        events: [...state.events.filter(currentEvent => currentEvent.id !== event.id), event]
      };
    case REMOVE_EVENT:
      const eventId = action.payload;
      return {
        ...state,
        events: state.events.filter(({id}) => id !== eventId)
      };
    default:
      return state;
  }
};
