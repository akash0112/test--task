import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: 2,
    }}
  >
    <CircularProgress />
    <Typography variant="h6" sx={{ mt: 2 }}>
      Loading, please wait...
    </Typography>
  </Box>
);

export default Loading;
