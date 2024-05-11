import { useState } from 'react';

import { Tab, Tabs, Button, Container, Typography } from '@mui/material';

export default function ObjectDetectionView() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <>
      {/* Side menu */}
      {/* <Box
        sx={{
          height: '100%',
          width: '200px',
          position: 'fixed',
          zIndex: 1,
          top: 0,
          left: 0,
          bgcolor: '#f8f9fa',
          paddingTop: '20px',
        }}
      >
        <a href="{% url 'upload_image' %}">Home</a>
        <a href="{% url 'dataset' %}">Dataset</a>
        <a href="{% url 'models' %}">Models</a>
      </Box> */}
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Object Detection
        </Typography>
      </Container>
      {/* Main content */}
      <Container>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Object Detection Tabs">
          <Tab label="Object Detection Models Testing" />
          <Tab label="Upload Dataset" />
          <Tab label="Model Output" />
          <Tab label="Models" />
          <Tab label="Show Image" />
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
                  {/* Replace {% csrf_token %} with a proper CSRF token */}
                  <input type="file" name="image" multiple />
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
                  {/* Replace {% csrf_token %} with a proper CSRF token */}
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
                Output
              </div>
            </Container>
          )}
          {tabIndex === 3 && (
            <Container
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Typography variant="h6">Models</Typography>
              <select style={{ padding: '0.5rem 5px 0.5rem 5px' }}>
                <option>Select Dataset</option>
                <option>option A</option>
                <option>option A</option>
                <option>option A</option>
              </select>
              <Button variant="outlined" style={{ margin: '1rem 0 1rem 0' }}>
                Select Model
              </Button>
            </Container>
          )}
          {tabIndex === 4 && <Typography variant="h6">Show Image</Typography>}
        </Container>
      </Container>
    </>
  );
}
