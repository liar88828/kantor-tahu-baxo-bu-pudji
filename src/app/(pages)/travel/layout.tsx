import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title      : 'Travel',
  description: 'This page represent provider a send to client',
}

const MyComponent = ( { children }: { children: ReactNode } ) => {
  return <>{ children } </>
}

export default MyComponent;
