import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, SET_EVENTS } from "../types/eventActionTypes";

const initialState = {
  events: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case EDIT_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id)
      };
    case SET_EVENTS:
      console.log(action.payload,"payload");
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
};

export default eventReducer;
