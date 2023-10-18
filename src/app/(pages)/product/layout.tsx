import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title      : 'Product',
  description: 'This page represent a Product ',
}

const MyComponent = ( { children }: { children: ReactNode } ) => {
  return <>{ children } </>
}

export default MyComponent;
