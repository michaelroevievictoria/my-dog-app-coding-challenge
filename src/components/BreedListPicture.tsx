"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Paper, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Button, CircularProgress } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store'
import { addLikedImage, removeLikedImage } from '@/store/slices/likedImageSlice';
import _ from 'lodash';
import imageEmpty from '../../public/images/no-furr-found.jpg'
interface BreedPageProps {

}

const BreedPage: React.FC<BreedPageProps> = ({ }) => {
  const params = useParams<{ name: string; }>()
  const breed = params?.name

  const [images, setImages] = useState<string[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const likedImagesFromStore = useSelector((state: RootState) => state.likedImages.likedImages[breed] || []);


  useEffect(() => {
    const localStorageKey = `likedImages_${breed}`;
    const storedLikedImages = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    setLikedImages(storedLikedImages);
  }, [breed]);


  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
        console.log('test', response.data.message)
        setImages(response.data.message);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breed images', error);
        setLoading(false);
      }
    };

    fetchBreedImages();
  }, [breed]);

  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
        setImages(response.data.message);
      } catch (error) {
        console.error('Error fetching breed images', error);
      }
    };

    fetchBreedImages();
  }, [breed]);

  const handleToggleLike = (image: string) => {
    if (likedImagesFromStore.includes(image)) {
      dispatch(removeLikedImage({ breed, image }));
    } else {
      dispatch(addLikedImage({ breed, image }));
    }
  };

  console.log('images', (images))


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
                {!_.isEmpty(images) ?
                  <Typography variant='h4' className='py-10'>
                    {_.startCase(breed)} Pictures
                  </Typography> :
                  null}


              </div>
              
              {isLoading ? 
              <CircularProgress/> :
              
              _.isEmpty(images) ? <div>
                <Typography variant='h3'>Furr Not Found! 🐾
                  <br />Looks like the doggy data has gone for a walk.
                  <br />Time to fetch another tail-wagging friend. 🐶🔍</Typography>
                <picture className='flex justify-center py-5'>
                  <img src={imageEmpty.src} alt="" />
                </picture>
              </div>
                :
                null
              }

              <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {
                  images.map((image, index) => (
                    <div key={index} onClick={() => handleToggleLike(image)}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                          <CardMedia
                            component='img'
                            height='140'
                            width='345'
                            style={{ objectFit: 'cover' }}
                            image={image}
                            alt={`Breed ${index}`}
                          />
                          <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                              {breed}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                              {/* Your description goes here */}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size='small' color='primary' onClick={() => handleToggleLike(image)}>
                            {likedImagesFromStore.includes(image) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  ))

                }
              </div>

            </Paper>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BreedPage;