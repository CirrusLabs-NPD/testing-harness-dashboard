import React, { useState } from 'react';
import { Tab, Tabs, Grid, Paper, Button, Container, TextField, Typography } from '@mui/material';
import InfoModal from './InfoModal';

function HateSpeechDetectionView() {
  const [tabIndex, setTabIndex] = useState(0);
  const [modelname, setModelname] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleModelNameChange = (event) => {
    setModelname(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('modelname', modelname);
    formData.append('datafile', file);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setTabIndex(2);
    } catch (err) {
      console.error('Error in fetch operation:', err.message);
      setError(`Failed to upload: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
    console.log(results.heatmap_image_path);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hate Speech Detection
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Hate Speech Detection Tabs">
        <Tab label="Hate Speech Model Testing" />
        <Tab label="Upload Data" />
        <Tab label="Results" />
      </Tabs>

      {tabIndex === 0 && (
        <Container>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Welcome to the Hate Speech Model Testing Platform.
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Purpose
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Designed to provide you with a robust framework for 
            evaluating the performance of various hate speech detection ML models on JSON speech datasets. This platform 
            returns detailed performance metrics, allowing your
            data scientists to make informed decisions about model improvements or replacements. Input your Hugging Face model&apos;s name and upload a
            dataset to begin testing.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleModalOpen} sx={{ mt: 2 }}>
            Why does your business need an effective hate speech detection model?
          </Button>
        </Container>
      )}

      {tabIndex === 1 && (
        <Container>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Upload Dataset
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '20px',
            }}
          >
            <TextField
              label="Model Name"
              variant="outlined"
              fullWidth
              value={modelname}
              onChange={handleModelNameChange}
              sx={{ mb: 2 }}
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              accept=".json"
              required
              style={{ marginBottom: '1rem' }}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              Upload and Test
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Data Preprocessing Requirements
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Model name asks your choice of model from hugging face for eg. alexandrainst/da-hatespeech-detection-base. <br />Our backend script can process JSON files formatted in the following structure:
          </Typography>
          <img
            src="/assets/datarequirement.jpg"
            alt="JSON Requirement Example"
            style={{ marginTop: '20px', maxWidth: '100%' }}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
          &apos;generated text&apos; is the speech from your platform users. For &apos;score&apos; 0 is not-hate-speech and 1 is-hate-speech and it is the pre-determined actual score for the model to compare its predictions with and generate an accuracy metric for your evaluation of its effectiveness
          </Typography>
          
        </Container>
      )}

      {tabIndex === 2 && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Analysis Results
          </Typography>
          {results ? (
            <Paper elevation={3} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Accuracy:</Typography>
                  <Typography variant="h6" color="primary">
                    {results.accuracy.toFixed(2)}/1
                  </Typography>
                  <Typography variant="body2">
                    Accuracy measures the proportion of true results (both true positives and true
                    negatives) among the total number of cases examined. It indicates the
                    model&apos;s overall ability to correctly identify both hate speech and non-hate
                    speech instances.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Precision:</Typography>
                  <Typography variant="h6" color="primary">
                    {results.precision.toFixed(2)}/1
                  </Typography>
                  <Typography variant="body2">
                    Precision measures the proportion of true positive results in all positive
                    predictions. It reflects the model&apos;s ability to identify only relevant
                    instances. A high precision means that when the model identifies a text as hate
                    speech, it is likely correct.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Recall:</Typography>
                  <Typography variant="h6" color="primary">
                    {results.recall.toFixed(2)}/1
                  </Typography>
                  <Typography variant="body2">
                    Recall measures the proportion of actual positives that were identified
                    correctly. It reflects the model&apos;s ability to find all relevant instances,
                    showing how well the model is at identifying all hate speech instances.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">F1 Score:</Typography>
                  <Typography variant="h6" color="primary">
                    {results.f1_score.toFixed(2)}/1
                  </Typography>
                  <Typography variant="body2">
                    The F1 Score is the harmonic mean of precision and recall, providing a balance
                    between them. It&apos;s particularly useful when you need to take both false
                    positives and false negatives into account.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Heatmap:</Typography>
                  {results.heatmap_image_path && (
                    <img
                      src={results.heatmap_image_path}
                      alt="Heatmap of Model Scores"
                      style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                    />
                  )}
                  <Typography variant="body2">
                    The color intensity in the heat map indicates the likelihood of each text being
                    classified as hate speech by the model. Darker shades represent higher
                    probabilities of hate speech.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Typography variant="body1">No results to display.</Typography>
          )}
        </Container>
      )}

      <InfoModal open={isModalOpen} handleClose={handleModalClose} />
    </Container>
  );
}

export default HateSpeechDetectionView;
