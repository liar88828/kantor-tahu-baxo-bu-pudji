import Link from 'next/link';
import { BodyMenu } from '@/app/components/moleculs/menu/BodyMenu';
import { listComplex } from '@/app/components/moleculs/menu/ListComplex';

export default function Complex(
  { slug }:
    { slug: string }
) {
  // console.log( slug )
  return (
    <BodyMenu>
      { listComplex.map( d => {
        const h = d.href.split( "/" ).pop()
        return (
          <Link
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