import React from 'react';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  useTheme
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { ConfigData, McpServers } from '../../shared/types';
import McpServerList from '../../components/McpServerList';

type CursorPageProps = {
  loading: boolean;
  error: string | null;
  config: ConfigData | null;
  mcpServers: McpServers | null;
  onFileSelect: () => Promise<void>;
}

export default function CursorPage({ 
  loading, 
  error, 
  config, 
  mcpServers, 
  onFileSelect 
}: CursorPageProps) {
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
        Cursor MCP Integration
      </Typography>

      {config && (
        <Paper 
          sx={{ 
            p: 2, 
            mb: 4,
            width: '100%',
            bgcolor: theme.palette.grey[50],
            borderRadius: 2
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Selected file: <strong>{config.path}</strong>
          </Typography>
        </Paper>
      )}

      {mcpServers && <McpServerList servers={mcpServers} />}

      {error && (
        <Paper 
          sx={{ 
            p: 3,
            mt: 2,
            width: '100%',
            bgcolor: theme.palette.error.light,
            borderRadius: 2
          }}
        >
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Paper>
      )}
    </Box>
  );
} 