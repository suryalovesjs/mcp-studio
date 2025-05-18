import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Chip,
    useTheme,
    alpha,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import type { ConfigData } from '../../shared/types';

interface McpServersProps {
    mcpConfig: { [key: string]: ConfigData };
}

export default function McpServers({ mcpConfig }: McpServersProps) {
    const theme = useTheme();

    const StatusBadge = ({ active }: { active: boolean }) => (
        <Chip
            label={active ? 'Active' : 'Inactive'}
            size="small"
            sx={{
                backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.text.disabled, 0.1),
                color: active ? theme.palette.primary.main : theme.palette.text.disabled,
                fontWeight: 500,
                borderRadius: '16px',
                '& .MuiChip-label': {
                    px: 2,
                },
            }}
        />
    );

    return (
        <Box sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    MCP Servers
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage and toggle your Model Compute Provider (MCP) server configurations across clients.
                </Typography>
            </Box>

            {/* Main table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>MCP Server</TableCell>
                            <TableCell>
                                CLAUDE
                                <Button size="small" sx={{ ml: 2 }}>Enable All</Button>
                            </TableCell>
                            <TableCell>
                                CURSOR
                                <Button size="small" sx={{ ml: 2 }}>Enable All</Button>
                            </TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(mcpConfig).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>
                                    <StatusBadge active={!!value.content?.mcpServers} />
                                </TableCell>
                                <TableCell>
                                    <StatusBadge active={!!value.content?.mcpServers} />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            
            {/* Actions */}
            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        mr: 2,
                    }}
                >
                    Add MCP server
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                    }}
                >
                    Restore deleted MCP servers
                </Button>
            </Box>
        </Box>
    );
}
