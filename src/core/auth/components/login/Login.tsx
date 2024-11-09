import {Link} from "react-router-dom";
import {useRef} from "react";
import {Toast} from "primereact/toast";


export const Login = () => {
  const toast = useRef<Toast>(null);

  const show = () => {
    const { current } = toast;

    if (current) {
      current.show({
        severity: 'error',
        summary: 'Wrong email or password.',
        // TODO
        detail: 'Click HERE to change password'
      });
    }
  };

  const onLogin = () => {
    show();
  }

  return <div className='max-w-[400px] w-full flex flex-col items-center justify-center gap-[70px] tracking-widest'>
    <Toast ref={toast}></Toast>

    <h1 className='text-[35px] tracking-[8%]'>Sign-in</h1>
    <div className="w-full flex flex-col items-center justify-center gap-8">
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

    <div className='w-full flex flex-col items-center justify-center gap-4 focus:outline-none focus:ring-0'>
      <button
        className='w-full btn filled !bg-[#5B86E5] py-2'
        onClick={ onLogin }
      >Login</button>
      <p className='tracking-[8%] text-[12px] font-[Inter]'>
        Don’t have an account? <Link to={'/auth/signup'}><span className='text-[#5B86E5] pointer'>Signup Here</span></Link>
      </p>
    </div>
  </div>
}
