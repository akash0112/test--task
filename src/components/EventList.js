import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteEvent } from '../redux/actions/actions';

const EventsList = ({ setCurrentEventId }) => {
  const {events} = useSelector(state => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    setCurrentEventId(id);
    navigate('/add-event');
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <Box mx={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Handled By</TableCell>
            <TableCell>Organisation</TableCell>
            <TableCell>Total Sub-Events</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.startDate.format('MM/DD/YYYY')}</TableCell>
              <TableCell>{event.endDate.format('MM/DD/YYYY')}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{event.handledBy}</TableCell>
              <TableCell>{event.organisation}</TableCell>
              <TableCell>{event.subEvents}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(event.id)} variant="contained" color="primary" sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(event.id)} variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EventsList;
