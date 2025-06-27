

import { useState } from 'react';
import {
  Container,
  Typography,

  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  Chip,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalBarIcon from '@mui/icons-material/LocalBar';

const initialCocktails = [
  {
    id: 1,
    name: 'Old Fashioned',
    ingredients: ['Bourbon', 'Sugar', 'Bitters', 'Orange peel'],
    difficulty: 'Medium'
  },
  {
    id: 2,
    name: 'Martini',
    ingredients: ['Gin', 'Dry Vermouth', 'Olive or Lemon twist'],
    difficulty: 'Easy'
  },
  {
    id: 3,
    name: 'Mojito',
    ingredients: ['White rum', 'Lime', 'Mint', 'Sugar', 'Soda water'],
    difficulty: 'Medium'
  },
  {
    id: 4,
    name: 'Margarita',
    ingredients: ['Tequila', 'Lime juice', 'Triple sec', 'Salt'],
    difficulty: 'Easy'
  },
  {
    id: 5,
    name: 'Manhattan',
    ingredients: ['Rye whiskey', 'Sweet vermouth', 'Bitters', 'Cherry'],
    difficulty: 'Medium'
  },
  {
    id: 6,
    name: 'Negroni',
    ingredients: ['Gin', 'Campari', 'Sweet vermouth', 'Orange peel'],
    difficulty: 'Hard'
  }
];

const difficultyColors: { [key: string]: 'success' | 'warning' | 'error' } = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
};

const Cocktails = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCocktails = initialCocktails.filter(cocktail =>
    cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Cocktail Recipes
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search cocktails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: '50%', md: '40%' } }}
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
          },
          gap: 4,
        }}
      >
        {filteredCocktails.map((cocktail) => (
          <Card key={cocktail.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  {cocktail.name}
                </Typography>
                <Chip 
                  label={cocktail.difficulty} 
                  color={difficultyColors[cocktail.difficulty]} 
                  size="small"
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Ingredients:
              </Typography>
              <List dense>
                {cocktail.ingredients.map((ingredient, idx) => (
                  <ListItem key={idx} sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <LocalBarIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    <Typography variant="body2">{ingredient}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Cocktails;
