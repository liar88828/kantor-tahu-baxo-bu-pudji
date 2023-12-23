import Image from 'next/image';
import profilePic from '../../../../../public/logo.png';
import React from 'react';
import ListSlide from '@/app/components/template/slidebar/right/ListSlide';

const Slidebar = () => {
  return (
    <div className="drawer  left-5">
      <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content ">
        <label htmlFor="my-drawer" className="btn btn-success drawer-button text-white mt-1">
          <svg className="w-5 h-5" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"/>
          </svg>

        </label>
      </div>

      <div className="drawer-side ">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay "></label>
        <div className="menu p-4 w-64 min-h-full bg-base-300/20 text-base-content ">

          <div className={ "flex items-center flex-col" }>
            <Image
              src={ profilePic }
              priority
              className={ "mt-20" }
              alt="/logo.png"/>
            <h1 className={ "card-title text-center my-2 text-white" }>Menu</h1>
          </div>

          <ListSlide/>
          <div className="drawer-content right-5 absolute">
            <label htmlFor="my-drawer" className="btn btn-success drawer-button text-white ">
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                   viewBox="0 0 512 512">
                <polygon
                  points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div> )
}

export default Slidebar
