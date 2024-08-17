"use client";

import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8 text-4xl font-bold text-blue-400'>Verify email</h1>
      <h2 className='mt-8 text-3xl font-bold text-green-400'>
        {token ? `${token}` : 'No token'}
      </h2>

      {verified && (
        <div>
          <h2 className='mt-8 text-3xl font-bold text-green-400'>
            Email Verified
          </h2>
          <Link href='/login' className='text-blue-400'>
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className='mt-8 text-3xl font-bold text-red-500'>
            Error
          </h2>
        </div>
      )}
    </div>
  );
  
}