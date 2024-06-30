import React from 'react';
import { Avatar, Box, TextField, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const validationSchema = yup.object({
    name: yup
        .string('Enter your complete name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Register = () => {
    const dispatch = useDispatch();
    const theme = useTheme(); // Access the current theme

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
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
                    bgcolor: theme.palette.mode === 'light' ? 'primary.light' : 'background.default',
                    color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                }}
            >
                <Box
                    onSubmit={formik.handleSubmit}
                    component="form"
                    className="form_style border-style"
                    sx={{
                        backgroundColor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default',
                        color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: theme.shadows[3],
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            mb: 3,
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: 'primary.main',
                                mb: 3,
                            }}
                        >
                            <LockOpenIcon />
                        </Avatar>
                        <TextField
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                                },
                                fieldset: {
                                    borderColor: theme.palette.divider,
                                },
                            }}
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Complete name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                                },
                                fieldset: {
                                    borderColor: theme.palette.divider,
                                },
                            }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                                },
                                fieldset: {
                                    borderColor: theme.palette.divider,
                                },
                            }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button fullWidth variant="contained" type="submit">
                            Register
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Register;
