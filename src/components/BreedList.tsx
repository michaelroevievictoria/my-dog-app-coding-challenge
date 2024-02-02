import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchBreeds, selectBreeds } from '@/store/slices/breedSlice';

const BreedList: React.FC = () => {
  const dispatch = useDispatch();
  const breeds = useSelector(selectBreeds);
  console.log('breeds', breeds)

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  return (
    <ul>
      {breeds.map((breed) => (
        <li key={breed}>
          <Link legacyBehavior href={`/breed/${breed}`}>
            <a>{breed}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BreedList;
