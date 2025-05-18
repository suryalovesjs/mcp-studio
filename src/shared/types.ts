import type { SvgIconProps } from '@mui/material';
import type React from 'react';

export interface McpServers {
  [key: string]: {
    command: string;
    args: string[];
  }
}

export interface ConfigData {
  path: string;
  content?: {
    mcpServers?: McpServers;
    [key: string]: unknown;
  };
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  icon?: React.ComponentType<SvgIconProps>;
} 