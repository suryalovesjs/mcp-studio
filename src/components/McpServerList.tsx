import type React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';

type McpServers = {
  [key: string]: {
    command: string;
    args: string[];
  }
}

interface McpServerListProps {
  servers: McpServers;
}

const McpServerList: React.FC<McpServerListProps> = ({ servers }) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        bgcolor: theme.palette.background.default,
        borderRadius: 2,
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
          MCP Server Integrations
        </Typography>
        <Divider />
      </Box>

      <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
        {Object.entries(servers).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TerminalIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6" component="div">
                    {key}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Command
                  </Typography>
                  <Chip
                    icon={<CodeIcon />}
                    label={value.command}
                    sx={{ 
                      bgcolor: `${theme.palette.primary.main}10`,
                      color: theme.palette.primary.main,
                      fontFamily: 'monospace'
                    }}
                  />
                </Box>

                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Arguments
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {value.args.map((arg) => (
                    <Chip
                      key={`${key}-${arg}`}
                      label={arg}
                      size="small"
                      sx={{ 
                        bgcolor: `${theme.palette.secondary.main}10`,
                        color: theme.palette.secondary.main,
                        fontFamily: 'monospace'
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default McpServerList; 