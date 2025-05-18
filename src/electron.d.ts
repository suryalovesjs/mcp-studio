import type { ConfigData, Profile } from './shared/types';

// We need to export this interface so it can be imported in preload.ts
export interface ElectronAPI {
  openFileDialog: (tool: string) => Promise<ConfigData>;
  getStoredConfig: () => Promise<ConfigData>;
  // getProfiles: () => Promise<Profile[]>;
  // addProfile: (profile: Profile) => Promise<void>;
  // deleteProfile: (profileId: string) => Promise<void>;
  // updateProfile: (profile: Profile) => Promise<void>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
} 