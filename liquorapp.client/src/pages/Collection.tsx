import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const initialBottles = [
  { id: 1, name: 'Johnnie Walker Blue Label', type: 'Scotch Whisky', abv: '40%' },
  { id: 2, name: 'Grey Goose', type: 'Vodka', abv: '40%' },
  { id: 3, name: 'Hendrick\'s Gin', type: 'Gin', abv: '41.4%' },
  { id: 4, name: 'Patrón Silver', type: 'Tequila', abv: '40%' },
  { id: 5, name: 'Maker\'s Mark', type: 'Bourbon', abv: '45%' },
];

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredBottles = initialBottles.filter(bottle =>
    bottle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
          My Collection
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add-bottle')}
        >
          Add Bottle
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search collection..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {filteredBottles.map((bottle) => (
          <Card key={bottle.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {bottle.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bottle.type} • {bottle.abv}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="settings" sx={{ ml: 'auto' }}>
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Collection;
