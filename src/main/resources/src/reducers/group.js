import {
  ADD_GROUP, GROUPS_PAGE_LOADED, GROUPS_PAGE_UNLOADED, REMOVE_GROUP, GROUP_PAGE_UNLOADED,
  GROUP_PAGE_UPDATED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GROUP_PAGE_UPDATED:
      return {
        ...state,
        group: action.payload[0],
        news: action.payload[1]
      };
    case GROUP_PAGE_UNLOADED:
      return {};
    case GROUPS_PAGE_LOADED:
      return {
        ...state,
        groups: action.payload[0],
      };
    case GROUPS_PAGE_UNLOADED:
      return {};
    case ADD_GROUP:
      return {
        ...state,
        groups: action.error ?
          null :
         [...state.groups, action.payload.group]
      };
    case REMOVE_GROUP:
      const groupId = action.groupId;
      return {
        ...state,
        groups: state.filter(({id}) => id !== groupId)
      };
    default:
      return state;
  }
};
