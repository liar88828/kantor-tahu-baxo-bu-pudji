import React from 'react';
import Link from 'next/link';

function DataEmpty( { back = false }: { back?: boolean } ) {
  return (
    <div
      data-test={ 'data-empty' }
      className={ 'card card-body static border-radius bg-gray-100' }>
      <h1 className={ 'card-title' }>Data is empty</h1>
      <div className={ 'card-action' }>
        { back ? <Link
          className={ 'btn btn-primary ' }
          href={ '?page=1&take=10' }>
          Back
        </Link> : <span className={ 'm-2' }>Maybe Data is Error or Not Found</span>
        }
      </div>
    </div>
  );
}

export default DataEmpty;