/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

function Dashboard() {
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [customDataset, setCustomDataset] = useState('');
  const [datasets, setDatasets] = useState(['Standard', 'Medical']);

  const [bleuUrl, setBleuUrl] = useState('');
  const [terUrl, setTerUrl] = useState('');
  const [meteorUrl, setMeteorUrl] = useState('');
  const [accuracyUrl, setAccuracyUrl] = useState('');

  const handleCheckboxChangeModels = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModels((prevSelectedModels) => [...prevSelectedModels, value]);
    } else {
      setSelectedModels((prevSelectedModels) =>
        prevSelectedModels.filter((model) => model !== value)
      );
    }
  };

  const handleCheckboxChangeDatasets = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDatasets((prevSelectedDatasets) => [...prevSelectedDatasets, value]);
    } else {
      setSelectedDatasets((prevSelectedDatasets) =>
        prevSelectedDatasets.filter((dataset) => dataset !== value)
      );
    }
  };
  const handleInputChange = (e) => {
    setCustomDataset(e.target.value);
  };

  const handleAddCustomDataset = () => {
    if (customDataset) {
      setDatasets([...datasets, customDataset]);
      setCustomDataset('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setBleuUrl('');
      setTerUrl('');
      setMeteorUrl('');
      setAccuracyUrl('');

      // Make API call to backend
      const response = await axios.post('http://localhost:8000/core/test_dataset/', {
        selected_models: selectedModels,
        datasets: selectedDatasets,
      });

      const { bleu_url, ter_url, accuracy_url } = response.data;

      setBleuUrl(`http://localhost:8000${bleu_url}`);
      setTerUrl(`http://localhost:8000${ter_url}`);
      // setMeteorUrl(`http://localhost:8000${meteor_url}`);
      setAccuracyUrl(`http://localhost:8000${accuracy_url}`);

      console.log('bleu_image:', bleuUrl);
      console.log('ter_image:', terUrl);
      console.log('meteor_image:', meteorUrl);
      console.log('accuracy_image:', accuracyUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Machine Translation
      </Typography>
      <Typography variant="body2">
        Welcome to the Machine Translation platform where we plan to allow the user to test either a
        dataset of their own or the provided datasets against two machine translation models and
        view metric results to determine the best model for that use case!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Choose dataset(s):</Typography>
          {datasets.map((dataset, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedDatasets.includes(dataset)}
                  onChange={handleCheckboxChangeDatasets}
                  value={dataset}
                />
              }
              label={dataset}
            />
          ))}
          <input type="text" value={customDataset} onChange={handleInputChange} />
          <Button onClick={handleAddCustomDataset}>Add Custom Dataset</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Models to test against:</Typography>
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={selectedModels.includes('Google T5')}
                onChange={handleCheckboxChangeModels}
                value="Google T5"
              />
            }
            label="Google T5"
          /> */}
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedModels.includes('Facebook NLLB')}
                onChange={handleCheckboxChangeModels}
                value="Facebook NLLB"
              />
            }
            label="Facebook NLLB"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedModels.includes('Helsinki Opus')}
                onChange={handleCheckboxChangeModels}
                value="Helsinki Opus"
              />
            }
            label="Helsinki Opus"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Test
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {bleuUrl && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" src={bleuUrl} />
              <CardContent>
                <Typography variant="body1">BLEU Plot</Typography>
                <Typography variant="body2">
                  BLEU scores measure the similarity of the machine-translated text to a set of high
                  quality reference translations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {terUrl && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" src={terUrl} />
              <CardContent>
                <Typography variant="body1">TER Plot</Typography>
                <Typography variant="body2">
                  TER scores measure the number of edit operations needed to transform the
                  machine-translated output into a human translated reference
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {meteorUrl && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" src={meteorUrl} />
              <CardContent>
                <Typography variant="body1">METEOR Plot</Typography>
                <Typography variant="body2">
                  METEOR scores measure the quality of generated text based on the alignment between
                  the generated text and the reference text.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {accuracyUrl && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" src={accuracyUrl} />
              <CardContent>
                <Typography variant="body1">ACCURACY Plot</Typography>
                <Typography variant="body2">
                  Accuracy is the proportion of correct predictions among the total number of cases
                  processed. It can be computed with: Accuracy = (TP + TN) / (TP + TN + FP + FN)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;
