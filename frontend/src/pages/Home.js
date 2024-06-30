import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Box, Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';
import { io } from 'socket.io-client';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const socket = io('/', {
    reconnection: true
});

const Home = () => {
    const theme = useTheme(); // Access the current theme
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postAddLike, setPostAddLike] = useState([]);
    const [postRemoveLike, setPostRemoveLike] = useState([]);

    // Display posts
    const showPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/posts/show');
            setPosts(data.posts);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    useEffect(() => {
        showPosts();
    }, []);

    useEffect(() => {
        socket.on('add-like', (newPosts) => {
            setPostAddLike(newPosts);
            setPostRemoveLike('');
        });
        socket.on('remove-like', (newPosts) => {
            setPostRemoveLike(newPosts);
            setPostAddLike('');
        });
    }, []);

    let uiPosts = postAddLike.length > 0 ? postAddLike : postRemoveLike.length > 0 ? postRemoveLike : posts;

    return (
        <>
            <Box
                sx={{
                    bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.background.default,
                    color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary,
                    minHeight: '100vh',
                }}
            >
                <Navbar />
                <Container
                    sx={{
                        pt: 5,
                        pb: 5,
                        minHeight: '83vh',
                        color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary,
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {loading ? (
                                <Loader />
                            ) : (
                                uiPosts.map((post, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <PostCard
                                            id={post._id}
                                            title={post.title}
                                            content={post.content}
                                            image={post.image ? post.image.url : ''}
                                            subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                                            comments={post.comments.length}
                                            likes={post.likes.length}
                                            likesId={post.likes}
                                            showPosts={showPosts}
                                            // Pass theme mode to PostCard for further customization
                                            mode={theme.palette.mode}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default Home;
