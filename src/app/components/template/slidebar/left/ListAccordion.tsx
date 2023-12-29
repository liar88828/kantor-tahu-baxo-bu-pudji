"use client"
import { LinkSlidebar } from '@/app/components/Atom/link/LinkSlidebar';
import { enableCache, Icon } from '@iconify/react';
import { TRoutesNav } from '../../../../../../asset/constants/link/RoutesNav';

enableCache( 'session' );

export function ListAccordion( { titleParent, links, icon }: TRoutesNav ) {
  return <div className="collapse bg-neutral">
    <input type="radio" name="my-accordion-1"/>

    <div className="collapse-title text-xl font-medium flex items-center gap-5">
      <Icon icon={ icon } color={ 'black' } name={ titleParent }
            width={ 20 }
            height={ 20 }
      />
      <span>{ titleParent }</span>
    </div>
    <div className="collapse-content ">
      { links.map( d => (
        <LinkSlidebar paths={ d.path } title={ d.name } key={ d.name }/>
      ) ) }

    </div>
  </div>

}