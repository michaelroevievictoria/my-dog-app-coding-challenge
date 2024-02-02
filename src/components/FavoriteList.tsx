"use client"
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Button, Select, MenuItem } from '@mui/material';
import { RootState } from '@/store/store'; // Assuming you have a RootState type
import { useRouter } from 'next/navigation';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import imageEmpty from '../../public/images/no-furr-found.jpg'
import _ from 'lodash';

interface FavoritesListProps { }

const FavoritesList: React.FC<FavoritesListProps> = () => {
    const [selectedBreed, setSelectedBreed] = useState<string | undefined>('');
    const router = useRouter();

    const likedImagesFromStore = useSelector((state: RootState) => state.likedImages.likedImages);
    console.log('likedImagesFromStore',likedImagesFromStore)

    const breeds = Object.keys(likedImagesFromStore);

    const filteredImages = selectedBreed ? likedImagesFromStore[selectedBreed] || [] : Object.values(likedImagesFromStore).flat();

    // Function to extract breed from the image URL (adjust this based on the actual URL structure)
    const getBreedFromImage = (image: string): string => {
        const parts = image.split('/');
        return parts[parts.length - 2]; // Assuming breed is part of the URL path
    };
    return (
        <div>
            <section className={`bg-[url('../../public/images/bg-dog.png')] h-full`}>
                <div className='container px-8 mx-auto pt-32'>
                    <div className='flex items-center justify-center h-full text-center'>
                        <Paper elevation={6} variant='outlined' square className='md:w-5/6 w-full p-9'>
                            <div className="flex items-center justify-between mb-4">
                                <Button onClick={() => router.back()} variant="contained" color="primary" className={`!bg-[#007bff] !text-[#ffff]`}>
                                    Go Back
                                </Button>
                                <Typography variant='h5' className='py-10'>
                                    Favorite Fur Dogs
                                </Typography>


                            </div>
                            <div className='flex mb-4 items-center'>
                                <Typography variant='h5' className='py-2'>
                                    Sort by:
                                </Typography>
                                <Select
                                    value={selectedBreed}
                                    onChange={(e) => setSelectedBreed(e.target.value as string)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value='' disabled>
                                        Select Breed
                                    </MenuItem>
                                    {breeds.map((breed) => (
                                        <MenuItem key={breed} value={breed}>
                                            {breed}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            {_.isEmpty(filteredImages) ? <div>
                                <Typography variant='h3'>Furr Not Found! 🐾</Typography>
                                <picture className='flex justify-center py-5'>
                                    <img src={imageEmpty.src} alt="" />
                                </picture>
                            </div>
                                :
                                null
                            }
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                                {filteredImages.map((image, index) => (
                                    <div key={index}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia component='img' height='140' image={image} alt={`Favorite ${index}`} />
                                                <CardContent>
                                                    <Typography gutterBottom variant='h5' component='div'>
                                                        {/* Use a function to extract the breed from the image URL or provide breed information in the Redux store */}
                                                        {getBreedFromImage(image)}
                                                    </Typography>
                                                    <Typography variant='body2' color='text.secondary'>
                                                        {/* Your description goes here */}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size='small' color='primary'>
                                                    <ThumbUpAltIcon />
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FavoritesList;
