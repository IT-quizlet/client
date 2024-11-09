import {Link} from "react-router-dom";
import googleLogo from '../../../../assets/img/logo-google.png';
import facebookLogo from '../../../../assets/img/logo-facebook.png';


export const SignUp = () => {
  return <div className='max-w-[400px] w-full flex flex-col items-center justify-center gap-[60px] tracking-widest'>
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className='text-[35px]'>Create an Account</h1>
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-40">
          <img className='h-16 w-16 cursor-pointer' src={googleLogo} alt="Google"/>
          <img className='h-16 w-16 cursor-pointer' src={facebookLogo} alt="Facebook"/>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='h-[2px] w-6 bg-[#838383]'></span>
          <span className='font-[Inter] text-2xl text-[#838383]'>OR</span>
          <span className='h-[2px] w-6 bg-[#838383]'></span>
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='Full Name'
        type='text'
      />

      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='Email'
        type='email'
      />

      <input
        className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
        placeholder='Password'
        type='password'
      />
    </div>

    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <button className='w-full btn filled !bg-[#5B86E5] py-2'>Create account</button>
      <p className='tracking-[8%] text-[12px] font-[Inter]'>
        Already have an account? <Link to={'/auth/login'}><span className='text-[#5B86E5] pointer'>Login</span></Link>
      </p>
    </div>
  </div>
}