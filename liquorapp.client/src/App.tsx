import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import VideoBackground from './components/VideoBackground';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Box, 
  ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CollectionsIcon from '@mui/icons-material/Collections';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cocktails from './pages/Cocktails';
import AddBottle from './pages/AddBottle';
import BottleDetails from './pages/BottleDetails';
import BottleRecognition from './components/BottleRecognition';

const navItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'My Collection', path: '/collection', icon: <CollectionsIcon /> },
  { text: 'Cocktails', path: '/cocktails', icon: <LocalBarIcon /> },
  { text: 'Scan Bottle', path: '/bottle-recognition', icon: <CameraAltIcon /> },
];

// This new component will conditionally render the video background
const ConditionalVideoBackground = () => {
  const location = useLocation();
  return location.pathname === '/' ? <VideoBackground /> : null;
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LiquorApp
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  const isHomePage = location.pathname === '/';

  return (
    <Box>
      <AppBar component="nav" position="static" sx={{ background: isHomePage ? 'transparent' : 'rgba(0,0,0,0.2)', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            LiquorApp
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} component={RouterLink} to={item.path} sx={{ color: '#fff' }}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:id" element={<BottleDetails />} />
          <Route path="/add-bottle" element={<AddBottle />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/bottle-recognition" element={<BottleRecognition />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Box>
    </Box>
  );
}

// The Router needs to be outside the App component that uses useLocation
const AppWrapper = () => (
  <Router>
    <ConditionalVideoBackground />
    <App />
  </Router>
);

export default AppWrapper;