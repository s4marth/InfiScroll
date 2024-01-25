import React from 'react'
import {useLocation} from 'react-router-dom';
import { Container, Typography, Button, Input, Card, CardContent, CardActionArea, Modal, Box,CircularProgress  } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const location = useLocation();
  const posts = location.state
  const navigate = useNavigate();
  console.log("ye detail pe aayi hai",posts)
  const handleBack = () => {
    navigate('/');
  };


  const uniquePosts = Array.from(new Set(posts.map((post: any) => post.objectID))).map(
    (objectId) => posts.find((post: any) => post.objectID === objectId)
  );

  return (
    <div data-testid="test1">
      <Button onClick={handleBack}>Back</Button>
      {uniquePosts?.map((post:any) => (
        <Card sx={{margin:'5px'}} >
        <CardActionArea >
        <CardContent>
            <Typography variant="h5">{post.author}</Typography>
            <Typography variant="body2">{post.title}</Typography>
            <Link target="_blank" to={post.url}>{post.url}</Link>
        </CardContent>
        </CardActionArea>
      </Card>
     
      ))}
    </div>
  )
}

export default PostDetail
