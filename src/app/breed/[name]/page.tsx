"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface BreedPageProps {

}

const BreedPage: React.FC<BreedPageProps> = ({ }) => {
  const params = useParams<{ name: string; }>()
  const breed = params?.name
  
  const [images, setImages] = useState<string[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBreedImages = async () => {
      debugger
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
        console.log('test', response.data.message)
        setImages(response.data.message);
      } catch (error) {
        console.error('Error fetching breed images', error);
      }
    };

    fetchBreedImages();
  }, [breed]);

  const handleToggleFavorite = (image: string) => {
    if (likedImages.includes(image)) {
      dispatch(removeFavorite(breed));
      setLikedImages(likedImages.filter((likedImage) => likedImage !== image));
    } else {
      dispatch(addFavorite(breed));
      setLikedImages([...likedImages, image]);
    }
  };

  return (
    <div>
      <h1>{breed} Pictures</h1>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Breed ${index}`} onClick={() => handleToggleFavorite(image)} />
          <button onClick={() => handleToggleFavorite(image)}>
            {likedImages.includes(image) ? 'Unlike' : 'Like'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BreedPage;