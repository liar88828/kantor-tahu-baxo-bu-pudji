import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title      : 'Bank',
  description: 'This page represent a Bank use for transaction',
}

const MyComponent = ( { children }: { children: ReactNode } ) => {
  return <>{ children } </>
}

export default MyComponent;
