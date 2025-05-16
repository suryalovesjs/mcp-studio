import type { SvgIconComponent } from '@mui/icons-material';

export type McpServers = {
  [key: string]: {
    command: string;
    args: string[];
  }
}

export type MenuItem = {
  id: string;
  label: string;
  icon: SvgIconComponent;
  description?: string;
}

export type ConfigData = {
  path: string;
  content: {
    mcpServers: McpServers;
    [key: string]: any;
  };
} 