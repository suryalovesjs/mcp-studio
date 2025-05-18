import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import Store from 'electron-store';
// import { store } from './main/store';

const store = new Store(); 
const isDevelopment = process.env.NODE_ENV === 'development';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(process.cwd(), 'preload.js')
    },
  });

  // In development, load from Vite dev server
  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the dist directory
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Read JSON file content
async function readJsonFile(filePath: string) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

// IPC handlers
ipcMain.handle('open-file-dialog', async (_, tool: string) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });
    
    if (result.canceled) {
      return null;
    }

    const filePath = result.filePaths[0];
    const jsonContent = await readJsonFile(filePath);
    
    // Store the content
    const config = {
      path: filePath,
      content: jsonContent
    };
    store.set(`toolConfig_${tool}`, config);

    return config;
  } catch (error) {
    console.error('Error handling file:', error);
    throw error;
  }
});

// Get stored config
ipcMain.handle('get-stored-config', () => {
  return store.get('toolConfig');
});
