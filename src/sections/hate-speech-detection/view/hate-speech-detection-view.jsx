import React, { useState } from 'react';
import { Button, Container, Tab, Tabs, TextField, Typography, Paper, Grid } from '@mui/material';

function HateSpeechDetectionView() {
    const [tabIndex, setTabIndex] = useState(0);
    const [modelname, setModelname] = useState('');
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
            console.error("Error in fetch operation:", err.message);
            setError(`Failed to upload: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
        console.log(results.heatmap_image_path)
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
                        Welcome to the Hate Speech Model Testing Platform. Here, you can test various hate speech detection models to evaluate their performance. Select a model and upload a dataset to begin testing.
                    </Typography>
                </Container>
            )}

            {tabIndex === 1 && (
                <Container>
                    <Typography variant="h6" sx={{ mt: 2 }}>Upload Dataset</Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
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
                        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    </form>
                </Container>
            )}

{tabIndex === 2 && (
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Analysis Results</Typography>
                    {results ? (
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1">Accuracy:</Typography>
                                    <Typography variant="h6" color="primary">{results.accuracy.toFixed(2)}/1</Typography>
                                    <Typography variant="body2">
                                      Accuracy measures the proportion of true results (both true positives and true negatives) among the total number of cases examined. It indicates the model&apos;s overall ability to correctly identify both hate speech and non-hate speech instances.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1">Precision:</Typography>
                                    <Typography variant="h6" color="primary">{results.precision.toFixed(2)}/1</Typography>
                                    <Typography variant="body2">
                                      Precision measures the proportion of true positive results in all positive predictions. It reflects the model&apos;s ability to identify only relevant instances. A high precision means that when the model identifies a text as hate speech, it is likely correct.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1">Recall:</Typography>
                                    <Typography variant="h6" color="primary">{results.recall.toFixed(2)}/1</Typography>
                                    <Typography variant="body2">
                                      Recall measures the proportion of actual positives that were identified correctly. It reflects the model&apos;s ability to find all relevant instances, showing how well the model is at identifying all hate speech instances.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1">F1 Score:</Typography>
                                    <Typography variant="h6" color="primary">{results.f1_score.toFixed(2)}/1</Typography>
                                    <Typography variant="body2">
                                      The F1 Score is the harmonic mean of precision and recall, providing a balance between them. It&apos;s particularly useful when you need to take both false positives and false negatives into account.
                                    </Typography>

                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Heatmap:</Typography>
                                    {results.heatmap_image_path && (
                                        <img src={results.heatmap_image_path} alt="Heatmap of Model Scores" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                                    )}
                                    <Typography variant="body2">
                                        The color intensity in the heat map indicates the likelihood of each text being classified as hate speech by the model. Darker shades represent higher probabilities of hate speech.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ) : (
                        <Typography variant="body1">No results to display.</Typography>
                    )}
                </Container>
            )}
        </Container>
    );
}

export default HateSpeechDetectionView;
