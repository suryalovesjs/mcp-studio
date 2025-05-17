import { contextBridge, ipcRenderer } from 'electron';
import type { ElectronAPI } from './electron.d';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    getStoredConfig: () => ipcRenderer.invoke('get-stored-config')
  } as ElectronAPI
); 