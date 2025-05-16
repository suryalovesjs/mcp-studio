import { contextBridge, ipcRenderer } from 'electron';

export type ElectronAPI = {
  openFileDialog: () => Promise<string | null>;
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog')
  } as ElectronAPI
); 