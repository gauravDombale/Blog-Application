import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, IconButton } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const AdminDashboard = () => {
    const theme = useTheme(); // Access the current theme

    const [posts, setPosts] = useState([]);

    const displayPost = async () => {
        try {
            const { data } = await axios.get('/api/posts/show');
            setPosts(data.posts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        displayPost();
    }, []);

    //delete post by Id
    const deletePostById = async (e, id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const { data } = await axios.delete(`/api/delete/post/${id}`);
                if (data.success === true) {
                    toast.success(data.message);
                    displayPost();
                }
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Post ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Post title',
            width: 150,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <img width="40%" src={params.row.image.url} alt={params.row.title} />
            )
        },
        {
            field: 'likes',
            headerName: 'Likes',
            width: 150,
            renderCell: (params) => (
                params.row.likes.length
            )
        },
        {
            field: 'comments',
            headerName: 'Comments',
            width: 150,
            renderCell: (params) => (
                params.row.comments.length
            )
        },
        {
            field: 'postedBy',
            headerName: 'Posted by',
            width: 150,
            valueGetter: (data) => data.row.postedBy.name
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 200,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
            field: "Actions",
            width: 170,
            renderCell: (value) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Link to={`/admin/post/edit/${value.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: theme.palette.primary.main }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deletePostById(e, value.row._id)}>
                        <DeleteIcon sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, pb: 3 }}>
                Posts
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link to='/admin/post/create' style={{ color: 'white', textDecoration: 'none' }}>Create Post</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: theme.palette.background.paper }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: theme.palette.text.primary,
                            },
                            [`& .${gridClasses.row}`]: {
                                bgcolor: theme.palette.mode === 'light' ? 'white' : theme.palette.background.default,
                            },
                        }}
                        rows={posts}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminDashboard;
