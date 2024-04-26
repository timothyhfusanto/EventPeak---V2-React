import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Landing from './containers/Landing';
import Container from '@mui/material/Container';
import Auth from './containers/Auth';
import Profile from './containers/Profile';

function App() {
  return (
    <div style={{fontFamily: "Roboto"}}>
      <Navbar/>
      <Container sx={{
        mt: 14,
        mb: 10,
      }}>
        <Routes>
          <Route path="/authenticated" element={<Landing/>}/>
          <Route path="/authenticated/:id" element={<Landing/>}/>
          <Route path="/" element={<Auth/>}/>
          <Route path="/:link" element={<Auth/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
