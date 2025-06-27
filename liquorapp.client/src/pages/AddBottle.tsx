import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

const AddBottle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bottleData, setBottleData] = useState({
    name: '',
    type: '',
    abv: '',
    origin: '',
    notes: ''
  });

  useEffect(() => {
    const recognitionData = location.state?.recognitionData;
    if (recognitionData) {
      setBottleData({
        name: `${recognitionData.brand || ''} ${recognitionData.name || ''}`.trim(),
        type: recognitionData.type || '',
        abv: (recognitionData.alcoholContent || '').replace('%', ''),
        origin: recognitionData.origin || '',
        notes: recognitionData.description || ''
      });
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBottleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setBottleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding bottle:', bottleData);
    navigate('/collection');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ my: 4 }}>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add New Bottle
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Bottle Name"
            name="name"
            value={bottleData.name}
            onChange={handleInputChange}
            autoFocus
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={bottleData.type}
              label="Type"
              onChange={handleSelectChange}
            >
              <MenuItem value="Whiskey">Whiskey</MenuItem>
              <MenuItem value="Vodka">Vodka</MenuItem>
              <MenuItem value="Gin">Gin</MenuItem>
              <MenuItem value="Rum">Rum</MenuItem>
              <MenuItem value="Tequila">Tequila</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="abv"
            label="ABV (%)"
            name="abv"
            type="number"
            value={bottleData.abv}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="origin"
            label="Origin"
            name="origin"
            value={bottleData.origin}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="notes"
            label="Tasting Notes"
            name="notes"
            multiline
            rows={4}
            value={bottleData.notes}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/collection')}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Bottle
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBottle;
