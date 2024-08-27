import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const ReviewPopup = ({ open, handleClose, name, movieId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
    
  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:3000/ratings', {
            name:  name,
            movieId: movieId,
            content: comment,
            star: rating,
            createAt: Date.now
        });
        if(response.status == 201){
            handleClose();
        }
    } catch (error) {
        console.error('Lỗi khi thêm phim:', error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between">
          <Typography id="modal-title" variant="h6" component="h2">
            Đánh giá bài viết
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{ my: 2 }}
        />

        <TextField
          label="Nội dung đánh giá"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Gửi đánh giá
        </Button>
      </Box>
    </Modal>
  );
};

export default ReviewPopup;
