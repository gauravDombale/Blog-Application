import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useProSidebar } from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const HeaderTop = () => {
    const { collapseSidebar } = useProSidebar();
    const dispatch = useDispatch();
    const theme = useTheme(); // Access the current theme

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 0, bgcolor: theme.palette.background.paper }}>
                <Toolbar>
                    <IconButton
                        onClick={() => collapseSidebar()}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, color: theme.palette.primary.main }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
                        App Name
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderTop;
