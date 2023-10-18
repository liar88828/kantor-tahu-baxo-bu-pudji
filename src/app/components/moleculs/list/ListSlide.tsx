import { ListAccordion } from '@/app/components/moleculs/list/ListAccordion';
import { routesNav } from '@/lib/constants/RoutesNav';

export default function ListSlide() {

  return ( <div className={ ` px-2 flex gap-2 flex-col` }>
      { routesNav.map( d => (
        <ListAccordion
          titleParent={ d.titleParent }
          icon={ d.icon }
          links={ d.links }
          key={ d.titleParent }/>
      ) ) }
    </div>
  )
}

