const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  getStoredConfig: () => ipcRenderer.invoke('get-stored-config')
}); 