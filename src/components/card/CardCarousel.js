// src/MovieCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Tooltip } from '@mui/material';

const MovieCard = ({ movie,index }) => (
  <Box key={index} sx={{ padding: 1, display: 'flex' }}>
            <Card sx={{ height: 350 }}>
              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.title}
                sx={{ height: 200 }}
              />
              <CardContent sx={{display: 'flex',flexDirection:'column', justifyContent: 'space-between', backgroundColor: '#121212', color: 'white', height: 150 ,padding: 2 }}>
                <Tooltip title={movie.name} placement="top">
                  <div className='text-over-flow-movie'>
                    {movie.name}
                  </div>
                  
                </Tooltip>
                <Tooltip title={movie.slug} placement="top">
                  <div className='text-over-flow-type'>
                    {movie.category}
                  </div>
                  
                </Tooltip>
              </CardContent>
            </Card>
          </Box>
);

export default MovieCard;
