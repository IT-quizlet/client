import {Link} from "react-router-dom";

export const ForgotPassword = () => {
  const onCreateAccount = () => {
  //   TODO
  };

  return <div className='max-w-[400px] w-full flex flex-col items-center justify-center gap-[60px] tracking-widest'>
    <h1 className='text-[35px]'>Forgot Password</h1>

    <div className="w-full flex flex-col items-center justify-center gap-8">
      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='Email'
        type='email'
      />
    </div>

    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <button className='w-full btn filled !bg-[#5B86E5] py-2' onClick={onCreateAccount}>Send OTP</button>
      <p className='tracking-[8%] text-[12px] font-[Inter]'>
        Did you remember your password? <Link to={'/auth/login'}><span className='text-[#5B86E5] pointer'>Login</span></Link>
      </p>
    </div>
  </div>
}
