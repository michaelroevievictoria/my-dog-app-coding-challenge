"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Autocomplete, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import PetsIcon from '@mui/icons-material/Pets';
import _ from 'lodash'
interface Breed {
  name: string;
}

const BreedsPage: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>('');
  const [breeds, setBreeds] = useState<string[]>([]);
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


  return (
    <div>
      <section className={`bg-[url('../../public/images/bg-dog.png')] h-full`}>
        <div className='container px-8 mx-auto h-screen pt-32'>
          <div className='flex items-center justify-center h-full text-center'>
            <Paper elevation={6} variant="outlined" square className='md:w-5/6 w-full p-9'>
              <Button variant="outlined" onClick={() => router.push('/favorites')}  className='mb-8'>
                Go to Favorites
              </Button>
              <Typography variant="h4">Choose your Fur-ever friend? 🐶</Typography>
              <Autocomplete
                className='py-[20px]'
                value={selectedBreed}
                onChange={(event, newValue) => setSelectedBreed(newValue)}
                options={breeds}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button disabled={!selectedBreed} variant="contained" fullWidth className={`${selectedBreed && `!bg-[#007bff]`} !text-[#ffff] my-3`} onClick={() => router.push(`/breed/${selectedBreed}`)}><PetsIcon /></Button>
            </Paper>
          </div>
          {selectedBreed && (
            <Typography variant="body1">You selected: {selectedBreed}</Typography>
          )}

        </div>
      </section>
    </div>
  );
};

export default BreedsPage;