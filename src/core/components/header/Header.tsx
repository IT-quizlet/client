import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header
      className='py-4 px-[10vw] flex justify-between content-center w-full bg-white border-b border-slate-800 fixed z-10'
    >
      <section className='flex gap-10 content-center leading-8'>
        <h1 className='font-bold text-[20px]'>IT Quizlet</h1>
        <Link to={''}>
          <h2 className='text-[17px]'>Home</h2>
        </Link>
        <Link to={'/quiz/list'}>
          <h2 className='text-[17px]'>My library</h2>
        </Link>
      </section>

      <span className='p-input-icon-left'>
        <i className='pi pi-search pl-[12px]'/>
        <InputText
          className='input'
          placeholder='Пошук'
        />
      </span>

      <section className='flex gap-10'>
        <Link to={'/auth/login'}>
          <button className='btn outlined w-[93px] h-full'>Увійти</button>
        </Link>
        <Link to={'/quiz/create'}>
          <button className='btn filled w-[93px] h-full'>Створити</button>
        </Link>
      </section>
    </header>
  )
}