import React, { useState } from 'react';
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

type ClaudePageProps = {
  loading: boolean;
  error: string | null;
  config: ConfigData | null;
  mcpServers: McpServers | null;
  onFileSelect: () => Promise<void>;
}

export default function ClaudePage({
  loading,
  error,
  config,
  mcpServers,
  onFileSelect
}: ClaudePageProps) {
  const theme = useTheme();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement Claude integration
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
        paddingBottom: 2
      }}
    >
      {/* Header Section - Fixed */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
        px: 2,
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

        <Button
          variant="contained"
          onClick={onFileSelect}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <UploadFileIcon />}
          sx={{
            mb: 4,
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          {loading ? 'Loading...' : 'Select Configuration File'}
        </Button>

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
      </Box>

      {/* Scrollable Content Section */}
      <Box sx={{
        flex: 1,
        minHeight: 0, // Important for flex child scrolling
        overflow: 'auto',
        px: 2,
        pb: 2,
      }}>
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
    </Paper>
  );
} 