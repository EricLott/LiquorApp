import { Link } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalBarIcon from '@mui/icons-material/LocalBar';

const features = [
  {
    icon: <CameraAltIcon fontSize="large" />,
    title: 'Bottle Recognition',
    description: 'Scan any liquor bottle to add it to your collection',
  },
  {
    icon: <CollectionsIcon fontSize="large" />,
    title: 'Collection Management',
    description: 'Organize and track your liquor collection',
  },
  {
    icon: <LocalBarIcon fontSize="large" />,
    title: 'Cocktail Recipes',
    description: 'Discover cocktails you can make with your collection',
  },
];

const Home = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ 
        p: { xs: 3, md: 6 }, 
        my: 4,
        borderRadius: 4, 
        textAlign: 'center',
        width: '100%',
        backgroundColor: 'rgba(29, 22, 22, 0.7)', // A slightly different shade for the panel
        backdropFilter: 'blur(15px)',
      }}>
        {/* Hero Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to LiquorApp
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
            Your personal liquor collection manager and cocktail companion.
          </Typography>
          <Box>
            <Button component={Link} to="/bottle-recognition" variant="contained" color="secondary" size="large" sx={{ mr: 2 }}>
              Scan a Bottle
            </Button>
            <Button component={Link} to="/collection" variant="outlined" color="secondary" size="large">
              View Collection
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 6 }}>
            Features
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }}
            gap={4}
          >
            {features.map((feature) => (
              <Paper 
                key={feature.title}
                elevation={0}
                sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', borderRadius: 3, background: 'transparent' }}
              >
                <Box sx={{ color: 'secondary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
