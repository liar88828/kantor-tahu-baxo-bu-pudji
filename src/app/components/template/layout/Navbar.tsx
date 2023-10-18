import Title from '@/app/components/organisme/navBar/Title';
import dynamic from 'next/dynamic';
import Profile from '@/app/components/organisme/navBar/Profile';

const Slidebar = dynamic( () => import ('@/app/components/organisme/navBar/Slidebar'), )

function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed">
      <div className="navbar-start">
        <Slidebar/>
      </div>
      <div className="navbar-center">
        <Title/>
      </div>
      <div className="navbar-end">
        <Profile/>
      </div>
    </div>
  );
}

export default Navbar;


