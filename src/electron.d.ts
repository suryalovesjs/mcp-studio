interface ConfigData {
  path: string;
  content: Record<string, unknown>;
}

export interface ElectronAPI {
  openFileDialog: () => Promise<ConfigData | null>;
  getStoredConfig: () => Promise<ConfigData | null>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
} 