import type { ConfigData } from './shared/types';

declare global {
  interface Window {
    electron: {
      openFileDialog: (tool: string) => Promise<ConfigData>;
    };
  }
}

export type { ConfigData }; 