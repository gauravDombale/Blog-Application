import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { modules } from '../components/moduleToolbar';

const validationSchema = yup.object({
    title: yup
        .string('Add a post title')
        .min(4, 'Post title should have a minimum of 4 characters')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Text content should have a minimum of 10 characters')
        .required('Text content is required'),
});

const CreatePost = () => {
    const theme = useTheme(); // Access the current theme

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            title: '',
            content: '',
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            createNewPost(values);
            actions.resetForm();
        },
    });

    const createNewPost = async (values) => {
        try {
            const { data } = await axios.post('/api/post/create', values);
            toast.success('Post created');
        } catch (error) {
            console.log(error);
            toast.error('Error creating post');
        }
    };

    return (
        <>
            <Box sx={{ bgcolor: theme.palette.background.paper, padding: '20px 200px' }}>
                <Typography variant='h5' sx={{ pb: 4, color: theme.palette.text.primary }}>Create Post</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        id="title"
                        label="Post title"
                        name='title'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Post title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ mb: 3 }}>
                        <ReactQuill
                            theme="snow"
                            placeholder="Write the post content..."
                            modules={modules}
                            value={values.content}
                            onChange={(e) => setFieldValue('content', e)}
                            style={{ height: '200px', marginBottom: '10px', borderColor: theme.palette.divider, borderWidth: 1, borderRadius: '4px' }}
                        />
                        <Typography sx={{ color: '#d32f2f', fontSize: '12px', pl: 2 }}>
                            {touched.content && errors.content}
                        </Typography>
                    </Box>

                    <Box border='2px dashed blue' sx={{ p: 1 }}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                acceptedFiles.map((file, index) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onloadend = () => {
                                        setFieldValue('image', reader.result);
                                    };
                                })
                            }
                        >
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <Box
                                    {...getRootProps()}
                                    p="1rem"
                                    sx={{
                                        '&:hover': { cursor: 'pointer' },
                                        bgcolor: isDragActive ? '#cceffc' : '#fafafa',
                                    }}
                                >
                                    <input name="banner" {...getInputProps()} />
                                    {isDragActive ? (
                                        <>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                <CloudUploadIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                                            </Typography>
                                            <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                                                Drop here!
                                            </Typography>
                                        </>
                                    ) : values.image === null ? (
                                        <>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                <CloudUploadIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                                            </Typography>
                                            <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                                                Drag and Drop here or click to choose
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <Box>
                                                    <img style={{ maxWidth: '100px' }} src={values.image} alt="" />
                                                </Box>
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            p: 1,
                            borderRadius: '25px',
                            bgcolor: theme.palette.primary.main,
                            '&:hover': { bgcolor: theme.palette.primary.dark },
                        }}
                    >
                        Create Post
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default CreatePost;
