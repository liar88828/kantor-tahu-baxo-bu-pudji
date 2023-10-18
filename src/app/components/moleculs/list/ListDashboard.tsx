"use client"
import { TStatus } from '@/entity/Dashboard';
import { enableCache, Icon } from '@iconify/react';
import { LinkNavbar } from '@/app/components/Atom/link/LinkNavbar';
import { listsMenu } from '@/lib/constants/ListsMenu';

enableCache( 'session' );

export type TTextStatus = "Di terima" | "Di Kirim" | "Di Proses" | "Selesai"

export const ListDashboard = ( { data }: {
  data: TStatus[]
} ) => {

  const objectArray = data.map( d => {
    const count = d._count.status
    const nama  = d.status
    return { count, nama }
  } )

  function getDiTerimaObject( status: string ) {
    return objectArray.find( obj => obj.nama.toLowerCase().includes( status.toLowerCase() ) );
  }

  getDiTerimaObject( "Di Kirim" );
  return (
    <div
      className=" flex flex-wrap my-4 p-2 md:p-5 gap-2 justify-between bg-slate-50 rounded-2xl shadow-xl shadow-slate-200">
      { listsMenu.map( d => (
        <LinkNavbar key={ d.title }
                    totalStatus={ getDiTerimaObject( d.title )?.count ?? 0 } title={ d.title }
                    href={ d.href }>
          <Icon icon={ d.icon } color={ "white" } name={ d.nameIcon } width={ 20 } height={ 20 }/>
        </LinkNavbar>
      ) ) }
    </div>
  );
}

