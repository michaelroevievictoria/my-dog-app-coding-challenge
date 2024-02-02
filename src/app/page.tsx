"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addFavorite } from '@/store/slices/favoritesSlice';
import bgImage from '../../public/images/bg-dog.png'
import { Typography, Paper, Autocomplete, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import PetsIcon from '@mui/icons-material/Pets';
import _ from 'lodash'
interface Breed {
  name: string;
}

const BreedsPage: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<string[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        const breedList = ['breeddogs', ...Object.keys(response.data.message)];
        console.log('breedList', breedList)

        setBreeds(breedList);
      } catch (error) {
        console.error('Error fetching breeds', error);
      }
    };

    fetchBreeds();
  }, []);

  const handleAddFavorite = (breed: string) => {
    dispatch(addFavorite(breed));
  };

  return (
    <div>
      <section className={`bg-[url('../../public/images/bg-dog.png')] h-full`}>
        <div className='container px-8 mx-auto h-screen pt-32'>
          <div className='flex items-center justify-center h-full text-center'>
            <Paper elevation={6} variant="outlined" square className='md:w-5/6 w-full p-9'>
              <Link legacyBehavior href="/favorites">
                <Typography variant="h5" className='py-[20px]'>Go to Favorites</Typography>
              </Link>
              <Typography variant="h4">Suggest a dog breed</Typography>
              <Autocomplete
                className='py-[20px]'
                value={selectedBreed}
                onChange={(event, newValue) => setSelectedBreed(newValue)}
                options={breeds}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button disabled={!selectedBreed} variant="contained" fullWidth className={`${selectedBreed && `!bg-[#007bff]`} !text-[#ffff]`} onClick={() => router.push(`/breed/${selectedBreed}`)}><PetsIcon /></Button>
            </Paper>
          </div>s
          {selectedBreed && (
            <Typography variant="body1">You selected: {selectedBreed}</Typography>
          )}
         
        </div>
      </section>
    </div>
  );
};

export default BreedsPage;