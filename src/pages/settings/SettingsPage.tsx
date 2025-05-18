import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    Stack,
    useTheme,
    alpha
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CursorIcon from '@mui/icons-material/Mouse';
import type { ConfigData, Profile } from '../../shared/types';
import { getProfiles, addProfile, deleteProfile } from '@/main/profiles';
import ProfilesTable from '@/components/ProfilesTable';
import { v4 as uuidv4 } from 'uuid';

interface SettingsPageProps {
    loading: { [key: string]: boolean };
    error: string | null;
    mcpConfig: { [key: string]: ConfigData };
    onFileSelect: (tool: string) => Promise<void>;
}

export default function SettingsPage({
    loading,
    error,
    mcpConfig,
    onFileSelect
}: SettingsPageProps) {
    const theme = useTheme();

    const ConfigSection = ({
        title,
        icon: Icon,
        configKey,
        description,
        helpText
    }: {
        title: string;
        icon: typeof SmartToyIcon;
        configKey: string;
        description: string;
        helpText: string;
    }) => (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon sx={{ color: theme.palette.primary.main }} />
                    <Typography variant="h6" fontWeight="medium">
                        {title}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    p: 2,
                    borderRadius: 1
                }}>
                    <InfoOutlinedIcon fontSize="small" color="info" />
                    <Typography variant="body2" color="text.secondary">
                        {helpText}
                    </Typography>
                </Box>

                <Box>
                    <Button
                        variant="contained"
                        onClick={() => onFileSelect(configKey)}
                        disabled={loading[configKey]}
                        startIcon={loading[configKey] ? <CircularProgress size={20} /> : <UploadFileIcon />}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            mb: 2
                        }}
                    >
                        {loading[configKey] ? 'Loading...' : 'Select Configuration File'}
                    </Button>

                    {mcpConfig[configKey] && (
                        <Typography variant="body2" color="text.secondary">
                            Selected file: <strong>{mcpConfig[configKey].path}</strong>
                        </Typography>
                    )}
                </Box>
            </Stack>
        </Paper>
    );

    const handleAddProfile = async (profileData: Omit<Profile, 'id'>) => {
        const newProfile = {
            ...profileData,
            id: uuidv4()
        };
        await addProfile(newProfile);
    };

    const handleDeleteProfile = async (profileId: string) => {
        await deleteProfile(profileId);
    };

    const ProfilesSection = () => {
        const profiles = getProfiles() as Profile[];
        return (
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Profiles
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Manage your MCP profiles
                </Typography>
                <ProfilesTable
                    profiles={profiles}
                    onAddProfile={handleAddProfile}
                    onDeleteProfile={handleDeleteProfile}
                />
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Settings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Configure your Model Compute Provider (MCP) settings for different tools
            </Typography>

            {/* <ProfilesSection /> */}

            <ConfigSection
                title="Claude Configuration"
                icon={SmartToyIcon}
                configKey="claude"
                description="Configure the Claude AI assistant MCP settings for enhanced AI capabilities."
                helpText={`You can find your Claude MCP configuration file at: ~/.cursor/claude.json
For more information, visit the Claude documentation.`}
            />

            <ConfigSection
                title="Cursor Configuration"
                icon={CursorIcon}
                configKey="cursor"
                description="Configure the Cursor IDE MCP settings for AI-powered development."
                helpText={`You can find your Cursor MCP configuration file at: ~/.cursor/config.json
For detailed setup instructions, check the Cursor documentation.`}
            />

            {error && (
                <Paper
                    sx={{
                        p: 3,
                        mt: 2,
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: theme.palette.error.main,
                    }}
                >
                    <Typography color="error.main" variant="body2">
                        {error}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}
