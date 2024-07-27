import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, SET_EVENTS } from "../types/eventActionTypes";

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event
});

export const editEvent = (event) => ({
  type: EDIT_EVENT,
  payload: event
});

export const deleteEvent = (id) => ({
  type: DELETE_EVENT,
  payload: { id }
});

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events
});