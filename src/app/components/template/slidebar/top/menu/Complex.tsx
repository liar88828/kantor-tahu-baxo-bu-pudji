import Link from 'next/link';
import { BodyMenu } from '@/app/components/template/slidebar/top/menu/BodyMenu';
import { listComplex } from '../../../../../../../asset/constants/link/ListComplex';

export default function Complex(
  { slug }:
    { slug: string }
) {
  return (
    <BodyMenu>
      { listComplex.map( d => {
        const h = d.href.split( "/" ).pop()
        console.log( d.title )
        return (
          <Link
            data-test={ d.title }
            key={ d.title }
            href={ d.href }
            className={ ` btn text-white shadow-md shadow-slate-400
            ${ d.className } 
            ${ h === slug ? " btn-disabled " : "" }`

            }>
            { d.title }
          </Link>
        )
      } ) }

      <div className={ `btn   ${ slug.length > 10 ? "  btn-disabled "
                                                  : "" } text-white shadow-md shadow-slate-400 bg-secondary` }>
        Edit
      </div>


    </BodyMenu>
  )
}