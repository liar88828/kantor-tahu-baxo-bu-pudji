'use client'
import React from 'react';
import { useRouter } from 'next/navigation'

function Paginate( { take = 10, page = 1, length = 0 }: { take: number, page: number, length: number } ) {
  const history    = useRouter();
  // Replace this with your actual total items
  const totalPages = Math.ceil( length / take );

  // console.log( totalPages )
  // console.log( length )

  const goToPage = ( pageNumber: number ) => {
    if( pageNumber >= 1 && pageNumber <= totalPages ) {
      // Navigate to the desired page using React Router or any navigation mechanism
      history.push( `?page=${ pageNumber }&take=${ take }` );
    }
  };

  return (
    <div className="flex justify-center mt-10" data-theme="light">
      <div data-test="grid-item" className="join">
        <button
          className={ `join-item btn ${ page === 1 ? 'btn-disabled' : '' }` }
          onClick={ () => goToPage( page - 1 ) }
          disabled={ page === 1 }
        >
          «
        </button>
        { [ ...Array( totalPages ) ].map( ( _, index ) => {
          const pageNumber = index + 1;
          return (
            <button

              key={ pageNumber }
              className={ `join-item btn ${ pageNumber === page ? 'bg-red-200' : '' }` }
              onClick={ () => goToPage( pageNumber ) }
            >
              { pageNumber }
            </button>
          );
        } ) }
        <button
          className={ `join-item btn ${ page === totalPages ? 'btn-disabled' : '' }` }
          onClick={ () => goToPage( page + 1 ) }
          disabled={ page === totalPages }
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Paginate;
