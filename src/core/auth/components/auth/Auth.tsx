import loginLogo from '../../../../assets/img/logo-login.png'
import {Outlet} from "react-router-dom";

export const Auth = () => {
  return <div className="bg-indigo-200 w-full min-h-[100vh] flex font-[Akshar]">
    <section className='hidden w-[27%] min-h-full xl:flex flex-col justify-center content-center'>
      <h1 className='font-semibold text-[60px] px-[82px] flex flex-col justify-center'>
        <span className='text-white'>Prepare, Practice &</span>
        <span className='text-indigo-600'>Ace Your IT Interviews</span>
      </h1>
      <img src={loginLogo} alt='some logo'/>
    </section>

    <section className='rounded-none w-full min-h-full bg-white flex flex-col justify-center items-center xl:rounded-s-[50px]'>
      <Outlet/>
    </section>
  </div>
}