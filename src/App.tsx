import { useState } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CursorIcon from '@mui/icons-material/Mouse';
import SettingsIcon from '@mui/icons-material/Settings';
import GridViewIcon from '@mui/icons-material/GridView';
import type { ConfigData } from './shared/types';
import CursorPage from './pages/cursor/CursorPage';
import ClaudePage from './pages/claude/ClaudePage';
import SettingsPage from './pages/settings/SettingsPage';
import McpServers from './pages/mcp-servers/McpServers';

// App logo component
const AppLogo = () => (
  <Box
    component="img"
    src="/app-icon.png"
    alt="MCP Toggle"
    sx={{ width: 40, height: 40, borderRadius: 2 }}
  />
);

function App() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [mcpConfig, setMcpConfig] = useState<{ [key: string]: ConfigData }>({});
  const [selectedMenu, setSelectedMenu] = useState<'servers' | 'cursor' | 'claude' | 'settings' | 'theme'>('servers');
  const theme = useTheme();

  const handleFileSelect = async (tool: string) => {
    try {
      setLoadingStates(prev => ({ ...prev, [tool]: true }));
      setError(null);
      const config = await window.electron.openFileDialog(tool);
      if (config) {
        setMcpConfig(prev => ({ ...prev, [tool]: config as ConfigData }));
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to select file');
    } finally {
      setLoadingStates(prev => ({ ...prev, [tool]: false }));
    }
  };

  // Sidebar items
  const sidebarItems = [
    { icon: GridViewIcon, label: 'servers', active: selectedMenu === 'servers' },
    { icon: CursorIcon, label: 'cursor', active: selectedMenu === 'cursor' },
    { icon: SmartToyIcon, label: 'claude', active: selectedMenu === 'claude' },
    { icon: SettingsIcon, label: 'settings', active: selectedMenu === 'settings' },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'cursor':
        return (
          <Box sx={{ p: 4 }}>
            <CursorPage
              loading={loadingStates.cursor || false}
              error={error}
              config={mcpConfig[selectedMenu] || null}
              mcpServers={mcpConfig[selectedMenu]?.content?.mcpServers || null}
              onFileSelect={() => handleFileSelect(selectedMenu)}
            />
          </Box>
        );
      case 'claude':
        return (
          <Box sx={{ p: 4 }}>
            <ClaudePage
              loading={loadingStates.claude || false}
              error={error}
              config={mcpConfig[selectedMenu] || null}
              mcpServers={mcpConfig[selectedMenu]?.content?.mcpServers || null}
              onFileSelect={() => handleFileSelect(selectedMenu)}
            />
          </Box>
        );
      case 'settings':
        return (
          <Box sx={{ p: 4 }}>
            <SettingsPage
              loading={loadingStates}
              error={error}
              mcpConfig={mcpConfig}
              onFileSelect={handleFileSelect}
            />
          </Box>
        );
      case 'servers':
        return <McpServers mcpConfig={mcpConfig} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f7' }}>
      {/* Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
          gap: 4,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AppLogo />
        <Stack spacing={3}>
          {sidebarItems.map((item) => (
            <IconButton
              key={item.label}
              onClick={() => setSelectedMenu(item.label as typeof selectedMenu)}
              sx={{
                p: 1.5,
                bgcolor: item.active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                color: item.active ? theme.palette.primary.main : theme.palette.text.secondary,
              }}
            >
              <item.icon />
            </IconButton>
          ))}
        </Stack>
      </Paper>

      {/* Main content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App; 