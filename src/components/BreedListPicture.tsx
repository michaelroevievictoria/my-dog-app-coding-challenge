import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreedImages, selectBreedsImages } from '@/store/slices/breedSlice';
import { RootState } from '@/store/store';

interface BreedPicturesProps {
  breed: string;
}

const BreedPictures: React.FC<BreedPicturesProps> = ({ breed }) => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => selectBreedsImages(state, breed));

  useEffect(() => {
    dispatch(fetchBreedImages({ breed, images: [] }));
  }, [dispatch, breed]);

  console.log('images', images);

  return (
    <ul>
      {images?.map((image) => (
        <li key={image}>
          <img src={image} alt={breed} />
        </li>
      ))}
    </ul>
  );
};

export default BreedPictures;
