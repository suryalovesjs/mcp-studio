import type { Profile } from '../shared/types';
import { store } from './store';

const PROFILES_STORAGE_KEY = 'mcp_profiles';

// Load profiles from store
const loadProfiles = (): Profile[] => {
    const storedProfiles = store.get(PROFILES_STORAGE_KEY) as Profile[] | undefined;
    return storedProfiles || [];
};

// Save profiles to store
const saveProfiles = (profiles: Profile[]) => {
    store.set(PROFILES_STORAGE_KEY, profiles);
};

export const getProfiles = (): Profile[] => {
    return loadProfiles();
};

export const addProfile = async (profile: Profile): Promise<void> => {
    const profiles = loadProfiles();
    profiles.push(profile);
    saveProfiles(profiles);
};

export const deleteProfile = async (profileId: string): Promise<void> => {
    const profiles = loadProfiles();
    saveProfiles(profiles.filter(p => p.id !== profileId));
};

export const updateProfile = async (profile: Profile): Promise<void> => {
    const profiles = loadProfiles();
    const index = profiles.findIndex(p => p.id === profile.id);
    if (index !== -1) {
        profiles[index] = profile;
        saveProfiles(profiles);
    }
};
