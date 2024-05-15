/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import React, { useState } from 'react';

import { Tab, Tabs, Button, Container, Typography } from '@mui/material';

const ObjectDetectionView = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedModal, setSelectedModal] = useState('');
  const [outputData, setOutputData] = useState(null); // State to store output data

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/obj_models/run_model/${selectedModal}/`
      );
      console.log(response.data); // Handle response as needed
      // Capture response
      setOutputData(response.data); // Store response data in state
      setTabIndex(3); // Switch to the "Output" tab
      // render the response on output ui
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // const handleModelChange = (event) => {
  //   setSelectedModal(event.target.value);
  //   setTabIndex((prev) => prev + 1);
  // };
  const handleModelChange = async (event) => {
    event.preventDefault();
    try {
      setSelectedModal(event.target.value);

      const response = await axios.get(
        `http://127.0.0.1:8080/obj_models/run_model/${event.target.value}/`
      );
      const metrics = response.data;
      setOutputData(metrics);
      setTabIndex((prev) => prev + 1);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Object Detection
        </Typography>
      </Container>
      <Container>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Object Detection Tabs">
          <Tab label="Object Detection Models Testing" />
          <Tab label="Upload Dataset" />
          <Tab label="Models" />
          <Tab label="Output" />
        </Tabs>
        <Container sx={{ mt: 3 }}>
          {tabIndex === 0 && (
            <Container>
              <Typography variant="caption" style={{ fontSize: '14px' }}>
                Welcome to the object detection models testing platform. You can upload images and
                run various object detection models to detect objects within the images. Choose from
                the options in the side menu to upload datasets or select and run different models.
              </Typography>
            </Container>
          )}
          {tabIndex === 1 && (
            <>
              <Typography variant="h6">Upload Dataset</Typography>
              <div className="form-container">
                <form
                  method="post"
                  encType="multipart/form-data"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <input type="file" name="image" multiple onChange={handleImageUpload} />
                  <Button variant="outlined" style={{ margin: '1rem 0 1rem 0' }}>
                    Upload Images
                  </Button>
                </form>
              </div>
              <div className="form-container">
                <form
                  method="post"
                  encType="multipart/form-data"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <input type="file" name="dataset" multiple webkitdirectory />
                  <Button variant="outlined" style={{ margin: '1rem 0 1rem 0' }}>
                    Upload Dataset
                  </Button>
                </form>
              </div>
            </>
          )}
          {tabIndex === 2 && (
            <Container
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Typography variant="h6"> Datasets</Typography>
              <select style={{ padding: '0.5rem 5px 0.5rem 5px' }}>
                <option>Select Dataset</option>
                <option value="yghcgh">option A</option>
                <option>option A</option>
                <option>option A</option>
              </select>
              <Typography variant="h6"> Models</Typography>
              <select style={{ padding: '0.5rem 5px 0.5rem 5px' }} onChange={handleModelChange}>
                <option>Select Model</option>
                <option value="Yolov8">Yolov8</option>
                <option value="ReSnet">ReSnet</option>
                <option value="FasterrCnn">FasterrCnn</option>
              </select>
            </Container>
          )}
          {tabIndex === 3 && (
            <Container
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Typography variant="h6">Model Output</Typography>
              <div
                style={{
                  width: '70%',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #1877F2',
                  minHeight: '400px',
                  padding: '1rem',
                  marginTop: '1rem',
                  borderRadius: '0.5rem',
                }}
              >
                {outputData ? (
                  <pre><code>{JSON.stringify(outputData, null, 2)}</code></pre>
                ) : (
                  'No output available'
                )}
              </div>
            </Container>
          )}
        </Container>
      </Container>
    </>
  );
};

export default ObjectDetectionView;
