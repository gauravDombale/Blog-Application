import React, { useEffect } from 'react';
import { Avatar, Box, Button, TextField, Typography, useTheme } from '@mui/material';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignInAction } from '../redux/actions/userAction';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);
    const theme = useTheme(); // Accessing the current theme

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [isAuthenticated, navigate, userInfo]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignInAction(values));
            actions.resetForm();
        }
    });

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    height: '81vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary // Text color based on theme
                }}
            >
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    className='form_style border-style'
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary, // Text color based on theme
                        padding: 3,
                        borderRadius: 1,
                        boxShadow: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', mb: 3 }}>
                            <LockClockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            Log In
                        </Typography>
                        <TextField
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            placeholder="E-mail"
                            InputLabelProps={{
                                shrink: true,
                                style: { color: theme.palette.text.secondary } // Text color based on theme
                            }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    color: theme.palette.text.primary, // Text color based on theme
                                },
                                '& fieldset': {
                                    borderColor: theme.palette.divider // Border color based on theme
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.text.primary // Hover border color
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            InputLabelProps={{
                                shrink: true,
                                style: { color: theme.palette.text.secondary } // Text color based on theme
                            }}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    color: theme.palette.text.primary, // Text color based on theme
                                },
                                '& fieldset': {
                                    borderColor: theme.palette.divider // Border color based on theme
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.text.primary // Hover border color
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            type='submit'
                            sx={{ mt: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default LogIn;
