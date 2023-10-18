import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title      : 'Transaction',
  description: 'This page represent a Orderan like Transaction',
}

const MyComponent = ( { children }: { children: ReactNode } ) => {
  return <>{ children } </>
}

export default MyComponent;
