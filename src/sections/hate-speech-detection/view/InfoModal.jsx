import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button } from '@mui/material';

const InfoModal = ({ open, handleClose }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Why Use Hate Speech Detection ML Models?
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Hate speech detection models are essential for various reasons:
        <ol>
          <li>
            <strong>Online Safety:</strong> Protecting your users from abusive language which can
            help maintain a safe and respectful environment on your online platform and uphold
            community guidelines.
          </li>
          <li>
            <strong>Prevent Harm:</strong> By identifying and mitigating hate speech, the model of
            your choice can work to prevent the emotional and psychological harm hate speech can
            cause.
          </li>
          <li>
            <strong>Scale & Automation:</strong> The vast amount of content generated online makes
            manual moderation impractical, necessitating automated systems for efficiency.
          </li>
          <li>
            <strong>Legal Compliance:</strong> Many countries have regulations against hate speech,
            so platforms use these models to comply with legal requirements.
          </li>
          <li>
            <strong>Insights into User Behavior:</strong> Gain insights and data analysis of social
            behavior on your platform from the results of the model.
          </li>
        </ol>
        These models use advanced techniques, including deep learning, to accurately detect various
        forms of hate speech, which is often complex and context-dependent. Their development and
        implementation are part of a larger commitment to fostering inclusive and positive
        interactions online.
      </Typography>
      <Typography variant="body2">
        Reference:{' '}
        <a href="https://arxiv.org/html/2202.09517v2" target="_blank" rel="noopener noreferrer">
          Deep Learning for Hate Speech Detection: A Comparative Study
        </a>
      </Typography>
      <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained" color="primary">
        Close
      </Button>
    </Box>
  </Modal>
);

InfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default InfoModal;
