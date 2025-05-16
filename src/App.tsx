import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CursorIcon from '@mui/icons-material/Mouse';
import type { ConfigData, McpServers, MenuItem } from './shared/types';
import CursorPage from './pages/cursor/CursorPage';
import ClaudePage from './pages/claude/ClaudePage';

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cursor',
    label: 'Cursor',
    icon: CursorIcon,
    description: 'Cursor IDE integration'
  },
  {
    id: 'claude',
    label: 'Claude',
    icon: SmartToyIcon,
    description: 'Claude AI assistant'
  }
];

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mcpConfig, setMcpConfig] = useState<{ [key: string]: ConfigData }>({});
  const [selectedMenu, setSelectedMenu] = useState<string>(MENU_ITEMS[0].id);
  const theme = useTheme();

  const handleFileSelect = async (tool: string) => {
    try {
      setLoading(true);
      setError(null);

      const config = await window.electron.openFileDialog(tool);
      console.log('Selected file:', config, ' for tool:', tool);

      if (config) {
        setMcpConfig(prev => ({ ...prev, [tool]: config }));
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to select file');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    const mcpServers = mcpConfig[selectedMenu]?.content?.mcpServers;
    switch (selectedMenu) {
      case 'cursor':
        return (
          <CursorPage
            loading={loading}
            error={error}
            config={mcpConfig[selectedMenu]}
            mcpServers={mcpServers}
            onFileSelect={() => handleFileSelect(selectedMenu)}
          />
        );
      case 'claude':
        return (
          <ClaudePage
            loading={loading}
            error={error}
            config={mcpConfig[selectedMenu]}
            mcpServers={mcpServers}
            onFileSelect={() => handleFileSelect(selectedMenu)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{
        px: { xs: 2, sm: 3 },
        overflow: 'hidden',
        height: '100vh'
      }}
    >
      <Grid container spacing={2} sx={{ height: 'calc(100% - 32px)', mt: 2 }}>
        {/* Left Menu Panel */}
        <Grid item xs={3}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <List>
              {MENU_ITEMS.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem 
                    button 
                    selected={selectedMenu === item.id}
                    onClick={() => setSelectedMenu(item.id)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.light,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                        }
                      }
                    }}
                  >
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontWeight: selectedMenu === item.id ? 'bold' : 'normal'
                      }}
                    />
                  </ListItem>
                  {index < MENU_ITEMS.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Content Panel */}
        <Grid item xs={9}>
          {renderContent()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App; 