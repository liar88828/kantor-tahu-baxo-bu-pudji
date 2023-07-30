"use client"
import {
  Button, Card, CardBody, CardHeader, Typography
} from '@material-tailwind/react';
import React, {
  Fragment
} from 'react';
import {
  AiOutlineBook, AiOutlineCheckCircle, AiOutlineShoppingCart
} from 'react-icons/ai';
import {
  FiTruck
} from 'react-icons/fi';
import {
  Status
} from '@/app/style/status';

function Cards( { title, icon, rout, totalStatus }: {
  title: string,
  icon: React.ReactNode,
  rout: string,
  totalStatus: number
} ) {
  return <Card
    className={ "   w-[47%] sm:w-[32%] md:w-[23%] px-2 sm:px-2 md:px-4 h-[60%] my-[.2rem]  flex-row   items-center  justify-around shadow-md shadow-slate-400" +
      Status( title ) }>
    <CardHeader floated={ true }
                className={ "p-2 sm:p-3 rounded-full w-32 flex  items-center justify-around" }>
      {/*/*------------*/ }
      <i>{ icon }</i>
      {/*------------*/ }
      <Typography
        variant={ "lead" }
        className="ml-1 font-bold  "
        color={ "black" }> { totalStatus }</Typography>
    </CardHeader>

    <CardBody
      className={ "p-2 sm:p-4" }>
      <a href={ rout }>
        <Button variant="text"
                className={ " flex flex-row items-center whitespace-nowrap" }>
          { title }
        </Button>
      </a>
    </CardBody>
  </Card>;
}

export function HorizontalCard() {
  const iconStyle = "w-6 sm:w-6 h-auto";
  return (
    <Fragment>

      <Cards totalStatus={ 10 } title={ "Di Terima" }
             icon={ <AiOutlineBook className={ iconStyle }/> }
             rout={ "/diterima" }/>
      <Cards totalStatus={ 20 } title={ "Di Proses" }
             icon={ < AiOutlineShoppingCart className={ iconStyle }/> }
             rout={ "/proses" }/>
      <Cards totalStatus={ 40 } title={ "Di Kirim" }
             icon={ <FiTruck className={ iconStyle }/> } rout={ "/kirim" }/>
      <Cards totalStatus={ 30 } title={ "Selesai" }
             icon={ <AiOutlineCheckCircle className={ iconStyle }/> }
             rout={ "/selesai" }/>
    </Fragment>
  );
}

