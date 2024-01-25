import { Container, Typography, Button, Input, Card, CardContent, CardActionArea, Modal, Box,CircularProgress  } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const Home: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPost, setSelectedPost] = useState<any | null>(null);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [dppost, setDppost] = useState<any[]>([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
const navigate = useNavigate();

const fetchData = async () => {
    try {
        setLoading(true);
        const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
        const data = await response.json();
        //console.log(data.hits.length>0)
        if(data.hits.length>0){
            setPosts((prevPosts) => [...prevPosts, ...data.hits]);
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }finally {
        setLoading(false);
      }
};

const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

const handleCardClick = (post: any) => {
    //console.log(post)
    setSelectedPost(post)
    handleOpen()
  };

useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(() => {
        setPage((prevpage)=>prevpage+1)
    }, 10000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId); 
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);



const handleSearch = () => {
    const filteredposts = posts.filter((post) =>
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) || (post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if(filteredposts.length>0){
        setPosts(filteredposts);
        navigate('/details', { state: filteredposts })
    }else{
        alert("wrong input")
    }
};

  return (
    <Container>
        <h3>Third one..</h3>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.replace(/^[^A-Za-z0-9]|[^\w ]|/g, ''))}
        placeholder="Search"
        sx={{marginLeft: '400px'}}
      />
      <Button onClick={handleSearch} disabled={!searchTerm}>Search</Button>
    

      { posts?.map((post) => (
        <div data-testid="test3">
        <Card  sx={{margin:'7px'}} >
        <CardActionArea onClick={() => handleCardClick(post)}>
        <CardContent>
            <Typography  variant="h5">Author: {post.author}</Typography>
            <Typography variant="body2">{post.title}</Typography>
            <Link onClick={(e)=>e.stopPropagation()} target="_blank" to={post.url}>{post.url}</Link>
        </CardContent>
        </CardActionArea> 
        </Card>
        </div>
        
      )) }

      {loading ?<CircularProgress /> : null}

    {selectedPost ? <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid="test2"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedPost.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             {selectedPost.author}
          </Typography>
          {JSON.stringify(selectedPost, null, 2)}
        </Box>
      </Modal>
    </div>: null}

    </Container>
  )
}

export default Home
