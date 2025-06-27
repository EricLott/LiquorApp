import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Box, 
  CircularProgress, 
  Alert, 
  IconButton,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';

interface BottleInfo {
    brand: string;
    name: string;
    type: string;
    description: string;
    alcoholContent?: string;
    origin?: string;
    confidence?: number;
    timestamp?: string;
}

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.drag-over': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const BottleRecognition = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BottleInfo | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
    setResult(null);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileSelect(file as File);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const clearSelection = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const recognizeBottle = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    // Simulate API call for demonstration purposes
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const mockResult: BottleInfo = {
        brand: 'Buffalo Trace',
        name: 'Kentucky Straight Bourbon Whiskey',
        type: 'Bourbon',
        alcoholContent: '45%',
        origin: 'Kentucky, USA',
        description: 'A top-shelf bourbon with a rich and complex taste of vanilla, toffee, and candied fruit.',
      };
      setResult(mockResult);
    } catch (err) {
      setError('An unexpected error occurred during recognition.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h1" gutterBottom align="center" sx={{ mt: 4, mb: 4 }}>
        Bottle Recognition
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Upload an image of a liquor bottle to identify it and add it to your collection.
          </Typography>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {!preview ? (
            <UploadBox
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={isDragOver ? 'drag-over' : ''}
            >
              <UploadFileIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography variant="h6">Drag & drop an image here</Typography>
              <Typography color="text.secondary">or click to browse files</Typography>
            </UploadBox>
          ) : (
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
              <IconButton 
                aria-label="remove image"
                onClick={clearSelection}
                sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.7)' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button 
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              {selectedFile ? 'Change Image' : 'Select Image'}
            </Button>
            <Button 
              variant="contained"
              onClick={recognizeBottle}
              disabled={!selectedFile || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Recognizing...' : 'Recognize Bottle'}
            </Button>
          </Box>

          {result && (
            <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
              <Typography variant="h5" gutterBottom>Recognition Result</Typography>
              <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="body1"><strong>Brand:</strong> {result.brand}</Typography>
                <Typography variant="body1"><strong>Name:</strong> {result.name}</Typography>
                <Typography variant="body1"><strong>Type:</strong> {result.type}</Typography>
                {result.alcoholContent && <Typography variant="body1"><strong>ABV:</strong> {result.alcoholContent}</Typography>}
                {result.origin && <Typography variant="body1"><strong>Origin:</strong> {result.origin}</Typography>}
                {result.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{result.description}</Typography>}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={() => setResult(null)}>Close</Button>
                <Button 
                  variant="contained"
                  onClick={() => navigate('/add-bottle', { state: { recognitionData: result } })}
                >
                  Add to Collection
                </Button>
              </Box>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default BottleRecognition;

