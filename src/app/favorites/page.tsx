import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '@/store/slices/favoritesSlice';
import axios from 'axios';

interface BreedImage {
  breed: string;
  image: string;
}

const FavoritesPage: React.FC = () => {
  const favoriteBreeds = useSelector(selectFavorites);
  const [favoriteImages, setFavoriteImages] = useState<BreedImage[]>([]);

  useEffect(() => {
    // Fetch images for the favorite breeds from the Dog API
    const fetchFavoriteImages = async () => {
      const promises = favoriteBreeds.map(async (breed) => {
        try {
          const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
          return { breed, image: response.data.message };
        } catch (error) {
          console.error(`Error fetching image for breed ${breed}`, error);
          return null;
        }
      });

      const images = await Promise.all(promises);
      setFavoriteImages(images.filter((image) => image !== null) as BreedImage[]);
    };

    fetchFavoriteImages();
  }, [favoriteBreeds]);

  const handleFilterByBreed = (selectedBreed: string) => {
    // Implement logic to filter favorite images by breed
  };

  return (
    <div>
      <h1>Favorite Pictures</h1>
      {favoriteImages.map((favoriteImage, index) => (
        <div key={index}>
          <img src={favoriteImage.image} alt={`${favoriteImage.breed} ${index}`} />
          <p>{favoriteImage.breed}</p>
        </div>
      ))}
      <div>
        <label htmlFor="breedFilter">Filter by Breed:</label>
        <select id="breedFilter" onChange={(e) => handleFilterByBreed(e.target.value)}>
          <option value="">All Breeds</option>
          {favoriteBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FavoritesPage;