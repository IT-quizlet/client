import { Header } from '../../core/components/header/Header.tsx';
import {Outlet} from "react-router-dom";

export const Main = () => {
  return <div className="bg-orange-50">
    <Header/>
    <main className="min-h-[100vh] w-full pt-[100px]">
      <Outlet/>
    </main>
  </div>
}