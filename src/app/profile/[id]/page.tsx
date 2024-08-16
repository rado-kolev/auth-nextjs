export default function UserProfile({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-5xl font-bold mb-6'>User Profile</h1>
      <p className='text-4xl font-bold'>
        This is the profile page of <span className='bg-blue-500 text-red-600 p-2 rounded-2xl'>{params.id}</span>.
      </p>
    </div>
  );
}
