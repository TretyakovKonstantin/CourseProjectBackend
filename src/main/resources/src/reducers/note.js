import {NOTES_PAGE_UNLOADED, NOTES_PAGE_LOADED, ADD_NOTE, REMOVE_NOTE} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case NOTES_PAGE_LOADED:
      return {
        notes: action.payload,
      };
    case NOTES_PAGE_UNLOADED:
      return {};
    case ADD_NOTE:
      console.log("Add group", action.payload);
      return {
        notes:
          [...state.notes, action.payload]
      };
    case REMOVE_NOTE:
      const noteId = action.payload;
      return {
        notes: state.notes.filter(({id}) => id !== noteId)
      };
    default:
      return state;
  }
};