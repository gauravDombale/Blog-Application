import React, { useEffect } from 'react';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Person3Icon from '@mui/icons-material/Person3';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import ThemeSwitcher from '../../utils/ThemeSwitcher';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const SidebarAdm = () => {
    const { userInfo } = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme(); // Access the current theme

    useEffect(() => {
        dispatch(userProfileAction());
    }, []);

    //log out 
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }

    return (
        <>
            <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ pt: 4 }}>
                        <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: theme.palette.text.primary,
                                    },
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'light' ? "#fafafa" : "#424242",
                                        color: theme.palette.primary.main,
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: theme.palette.primary.main,
                                    }
                                },
                            }}
                        >
                            {
                                userInfo && userInfo.role === 'admin' ?
                                    <>
                                        <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                                        <MenuItem component={<Link to="/" />}> Home </MenuItem>
                                        <MenuItem component={<Link to="/admin/post/create" />} icon={<PostAddIcon />}> Create post </MenuItem>
                                        {/* <MenuItem>
                                            <ThemeSwitcher />
                                        </MenuItem> */}
                                    </> :
                                    <>
                                        <MenuItem component={<Link to="/user/dashboard" />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                                        <MenuItem>
                                            {/* <ThemeSwitcher /> */}
                                        </MenuItem>
                                    </>
                            }
                        </Menu>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: theme.palette.text.primary,
                                    },
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'light' ? "#fafafa" : "#424242",
                                        color: theme.palette.primary.main,
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: theme.palette.primary.main,
                                    }
                                },
                            }}
                        >
                            <MenuItem onClick={logOut} icon={<LoginIcon />}>   Log out </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </>
    )
}

export default SidebarAdm;
