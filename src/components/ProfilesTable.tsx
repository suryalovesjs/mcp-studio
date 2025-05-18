import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import type { Profile } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';
import type { SvgIconComponent } from '@mui/icons-material';
interface ProfilesTableProps {
    profiles: Profile[];
    onAddProfile: (profile: Profile) => void;
    onDeleteProfile: (profileId: string) => void;
}

export default function ProfilesTable({ profiles, onAddProfile, onDeleteProfile }: ProfilesTableProps) {
    const [open, setOpen] = useState(false);
    const [newProfile, setNewProfile] = useState({ name: '', description: '' });

    const handleAddProfile = () => {
        onAddProfile({ ...newProfile, id: uuidv4(), icon: AddIcon as SvgIconComponent });
        setNewProfile({ name: '', description: '' });
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{ borderRadius: 2 }}
                >
                    Add Profile
                </Button>
            </Box>
            
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profiles.map((profile) => (
                            <TableRow key={profile.id}>
                                <TableCell>{profile.name}</TableCell>
                                <TableCell>{profile.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => onDeleteProfile(profile.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        value={newProfile.name}
                        onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        value={newProfile.description}
                        onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddProfile} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
} 