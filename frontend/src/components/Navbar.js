import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HouseIcon from '@mui/icons-material/House';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.signIn);
    const theme = useTheme(); // Access the current theme

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOutUser = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <HouseIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    BLOG
                </Typography>
                <ThemeSwitcher />

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <MenuItem key="Home" onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem key="Log In" onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Log In</Link>
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>

                <HouseIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    BLOG
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Typography
                        sx={{ my: 2, color: theme.palette.mode === 'light' ? 'white' : 'inherit', display: 'block', mr: 2 }}
                    >
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                    </Typography>
                    <Typography
                        sx={{ my: 2, color: theme.palette.mode === 'light' ? 'white' : 'inherit', display: 'block' }}
                    >
                        <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</Link>
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="User Avatar" src="" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        PaperProps={{
                            sx: {
                                "& .MuiMenu-list": {
                                    bgcolor: theme.palette.mode === 'light' ? '#fafafa' : theme.palette.background.default,
                                    color: theme.palette.mode === 'light' ? 'black' : 'white'
                                },
                            }
                        }}
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {/* <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Admin</Link>
                            </Typography>
                        </MenuItem> */}
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
                            </Typography>
                        </MenuItem>
                        {userInfo ? (
                            <MenuItem onClick={logOutUser}>
                                <Typography textAlign="center" color='#8e67b2'>Log Out</Typography>
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                                </Typography>
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
