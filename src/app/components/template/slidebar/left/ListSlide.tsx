import { routesNav } from '../../../../../../asset/constants/link/RoutesNav';
import { ListAccordion } from '@/app/components/template/slidebar/left/ListAccordion';

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

