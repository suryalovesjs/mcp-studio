import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  useTheme
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { ConfigData } from './electron';
import McpServerList from './components/McpServerList';

type McpServers = {
  [key: string]: {
    command: string;
    args: string[];
  }
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [mcpServers, setMcpServers] = useState<McpServers | null>(null);
  const theme = useTheme();

  const handleFileSelect = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = await window.electron.openFileDialog();
      console.log('Selected file:', config);

      if (config) {
        setConfig(config);
        setMcpServers(config.content.mcpServers as McpServers);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to select file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{
        px: { xs: 2, sm: 3 },
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        mt: 4, 
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
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
          MCP Studio
        </Typography>

        <Button
          variant="contained"
          onClick={handleFileSelect}
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
    </Container>
  );
}

export default App; 