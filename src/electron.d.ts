interface ConfigData {
  path: string;
  content: Record<string, unknown>;
}

// We need to export this interface so it can be imported in preload.ts
export interface ElectronAPI {
  openFileDialog: () => Promise<ConfigData | null>;
  getStoredConfig: () => Promise<ConfigData | null>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
} 