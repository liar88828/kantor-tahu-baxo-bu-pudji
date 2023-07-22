"use client"
import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import React, { Fragment } from 'react';
import { AiOutlineBook, AiOutlineCheckCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiTruck } from 'react-icons/fi';
import { Status } from '@/app/style/status';

function Cards( { title, icon, rout, totalStatus }: {
  title: string,
  icon: React.ReactNode,
  rout: string,
  totalStatus: number
} ) {
  return <Card
    className={ "w-full max-w-[48rem] flex-row items-center px-10 h-[60%] justify-around" + Status( title ) }>
    <CardHeader floated={ true }>
      <i>{ icon }</i>
    </CardHeader>

    <CardBody>
      <a href={ rout }>
        <Button variant="text" className={ "flex flex-row items-center " }>
          { title }
        </Button>
      </a>
    </CardBody>
    <Typography
      variant={ "lead" }
      className="ml-1 font-bold border border-slate-300   "
      color={ "black" }> { totalStatus }</Typography>
  </Card>;
}

export function HorizontalCard() {
  return (
    <Fragment>
      <Cards totalStatus={ 10 } title={ "Di Terima" } icon={ <AiOutlineBook/> } rout={ "/diterima" }/>
      <Cards totalStatus={ 20 } title={ "Di Proses" } icon={ < AiOutlineShoppingCart/> } rout={ "/proses" }/>
      <Cards totalStatus={ 40 } title={ "Di Kirim" } icon={ <FiTruck/> } rout={ "/kirim" }/>
      <Cards totalStatus={ 30 } title={ "Selesai" } icon={ <AiOutlineCheckCircle/> } rout={ "/selesai" }/>


    </Fragment>
  );
}

