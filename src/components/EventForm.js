import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addEvent, editEvent } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Event name is required'),
  type: Yup.string().required('Event type is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required').min(Yup.ref('startDate'), 'End date must be after start date'),
  description: Yup.string().required('Description is required'),
  handledBy: Yup.string().required('Handled by is required'),
  organisation: Yup.string().required('Organisation is required'),
  subEvents: Yup.number().required('Total sub-events is required').min(0, 'Sub-events cannot be negative')
});

const EventForm = ({ currentEventId, setCurrentEventId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventToEdit = useSelector(state =>
    currentEventId ? state.events.events.find(event => event.id === currentEventId) : null
  );

  const formik = useFormik({
    initialValues: {
      id: null,
      name: '',
      type: '',
      startDate: null,
      endDate: null,
      description: '',
      handledBy: '',
      organisation: '',
      subEvents: 0
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.id === null) {
        dispatch(addEvent({ ...values, id: Date.now() }));
      } else {
        dispatch(editEvent(values));
      }
      navigate('/events');
      resetForm();
      setCurrentEventId(null);
    },
    enableReinitialize: true
  });

  useEffect(() => {
    if (eventToEdit) {
      formik.setValues(eventToEdit);
    }
  }, [eventToEdit]);

  return (
    <Box component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        mt: 3,
        mx: 'auto',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        boxShadow: 3
      }}
    >
      <Typography my={1} variant='h6'>{currentEventId ? "EDIT EVENTS" : "ADD EVENTS"}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}

          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
            <InputLabel>Event Type</InputLabel>
            <Select
              name="type"
              value={formik.values.type}
              onChange={(e) => formik.setFieldValue('type', e.target.value)}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="music">Music</MenuItem>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="children">Children</MenuItem>
              <MenuItem value="school">School</MenuItem>
            </Select>
            {formik.touched.type && formik.errors.type && (
              <div style={{ color: 'red' }}>{formik.errors.type}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={formik.values.startDate}
              onChange={(date) => formik.setFieldValue('startDate', date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth

                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                />
              )}
              onBlur={formik.handleBlur}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={formik.values.endDate}
              onChange={(date) => formik.setFieldValue('endDate', date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth

                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              )}
              onBlur={formik.handleBlur}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Handled By"
            name="handledBy"
            value={formik.values.handledBy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.handledBy && Boolean(formik.errors.handledBy)}
            helperText={formik.touched.handledBy && formik.errors.handledBy}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Organisation"
            name="organisation"
            value={formik.values.organisation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.organisation && Boolean(formik.errors.organisation)}
            helperText={formik.touched.organisation && formik.errors.organisation}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Total Sub-Events"
            type="number"
            name="subEvents"
            value={formik.values.subEvents}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subEvents && Boolean(formik.errors.subEvents)}
            helperText={formik.touched.subEvents && formik.errors.subEvents}

          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {formik.values.id ? "Update Event" : "Save Event"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventForm;
