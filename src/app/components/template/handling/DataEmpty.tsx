import React from 'react';
import Link from 'next/link';

function DataEmpty() {
  return (
    <div className={ 'card card-body static border-radius bg-base-200' }>
      <h1 className={ 'card-title' }>Data is empty</h1>
      <div className={ 'card-action' }>
        <Link
          className={ 'btn btn-primary ' }
          href={ '?page=1&take=10' }>
          Back
        </Link>
      </div>
    </div>
  );
}

export default DataEmpty;