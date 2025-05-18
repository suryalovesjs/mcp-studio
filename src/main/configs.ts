import { store } from './store';
import type { ConfigData } from '../shared/types';
export const createGlobalMcpConfig = () => {
    const mcpConfig = store.get('mcpConfig');
    if (!mcpConfig) {
        store.set('mcpConfig', {});
    }
    return mcpConfig;
};

