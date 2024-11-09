export const ResetPassword = () => {
  return <div className='max-w-[400px] w-full flex flex-col items-center justify-center gap-[60px] tracking-widest'>
    <h1 className='text-[35px]'>Reset your Password</h1>

    <div className="w-full flex flex-col items-center justify-center gap-8">
      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='Email'
        type='email'
      />

      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='New Password'
        type='password'
      />

      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='Confirm Password'
        type='password'
      />
    </div>

    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <button className='w-full btn filled !bg-[#5B86E5] py-2'>Create account</button>
    </div>
  </div>
}
