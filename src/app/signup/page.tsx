'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Sign up success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Sign up failed', error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8 text-4xl font-bold text-blue-400'>
        {loading ? 'Processing' : 'Sign Up'}
      </h1>
      <hr />
      <label htmlFor='username' className='mb-2'>
        Username
      </label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Username'
      />
      <label htmlFor='email' className='mb-2'>
        Email
      </label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Email'
      />
      <label htmlFor='password' className='mb-2'>
        Password
      </label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
      />
      <button
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? 'No sign up' : 'Sign up'}
      </button>
      <Link href='/login'>Visit Log in page</Link>
    </div>
  );
}
