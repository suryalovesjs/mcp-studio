import React from 'react';
import {
  Typography,
  Box,
  Paper,
  useTheme
} from '@mui/material';

export default function ClaudeView() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 4
        }}
      >
        Claude MCP Integration
      </Typography>

      <Paper 
        sx={{ 
          p: 4,
          width: '100%',
          flex: 1,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" color="textSecondary" align="center">
          Claude Integration Coming Soon
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
          This feature is under development. Stay tuned for updates!
        </Typography>
      </Paper>
    </Box>
  );
} 