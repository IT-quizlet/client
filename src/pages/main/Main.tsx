import { Header } from '../../core/components/header/Header.tsx';
import gallery1 from './../../assets/img/main-gallery-1.png'
import gallery2 from './../../assets/img/main-gallery-2.png'
import gallery3 from './../../assets/img/main-gallery-3.png'
import { Link } from 'react-router-dom';

export const Main = () => {
  return <>
    <Header/>
    <main className='min-h-[100vh] w-full bg-orange-50 pt-[100px] flex flex-col items-center justify-center gap-20'>
      <div className='flex flex-col items-center justify-center gap-2 max-w-[770px] text-center'>
        <h1 className='text-nowrap text-[48px] font-jetbrains-mono'>Підготуйтесь до IT-співбесіди</h1>
        <p className='text-[20px] pb-8 font-jetbrains-mono'>
          Попрактикуйтеся в реальних питаннях співбесіди,
          перевірте свої знання та готуйтеся досягти успіху в ІТ
        </p>

        <Link to={'/auth/signup'}>
          <button className='btn filled py-4 px-16'>Зареєструватись</button>
        </Link>
      </div>

      <div className='flex gap-16'>
        <img src={gallery1} alt='Gallery 1 image'/>
        <img src={gallery2} alt='Gallery 2 image'/>
        <img src={gallery3} alt='Gallery 3 image'/>
      </div>
    </main>
  </>
}