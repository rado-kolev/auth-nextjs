'use client';

import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState('nothing');

  const logout = async () => {
    try {
      axios.get('/api/users/logout');
      toast.success('User logged out successfully');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/user');
    console.log(res.data);

    setData(res.data.data._id);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8 text-4xl font-bold text-blue-400'>Profile Page</h1>
      <p>This is the profile page.</p>
      <h2 className='mt-8 text-3xl font-bold text-green-400'>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
            <Link href={`/profile/${data}`}>
              {data}
          </Link>
        )}
      </h2>
      <button
        onClick={logout}
        className='bg-blue-500 hover:bg-blue-400 text-orange-400 hover:text-orange-600 font-bold py-2 px-4 rounded mt-12'
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-12'
      >
        Get user details
      </button>
    </div>
  );
}
