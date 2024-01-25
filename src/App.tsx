import React from 'react';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/material';
import Details from './components/PostDetail'

function App() {
  return (
    <Container sx={{backgroundColor:'ivory'}}>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
      </Routes>
    </Router>
    </Container>
  );
}

export default App;
