import Slidebar from '@/app/components/template/slidebar/Slidebar';
import Title from '@/app/components/template/slidebar/top/Title';
import Profile from '@/app/components/template/slidebar/top/Profile';

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


