import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Store from 'electron-store';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const store = new Store();

const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Environment:', process.env.NODE_ENV);

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

  console.log('isDevelopment', isDevelopment);
  // In development, load from Vite dev server
  if (isDevelopment) {
    console.log('Loading from development server...');
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    console.log('Loading from production build...');
    // In production, load from the dist directory
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    console.log('Loading production build from:', indexPath);
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
ipcMain.handle('open-file-dialog', async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });
    
    console.log('Dialog result:', result);
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
    store.set('lastConfig', config);

    return config;
  } catch (error) {
    console.error('Error handling file:', error);
    throw error;
  }
});

// Get stored config
ipcMain.handle('get-stored-config', () => {
  return store.get('lastConfig');
});
