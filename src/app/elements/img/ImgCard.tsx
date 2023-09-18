
export function ImgCard( { img }: { img: string } ) {
  return <figure className={ 'w-[40%] sm:w-[30%] md:w-[25%] xl:w-[20%] h-auto ' }>
    <img src={ img }
           alt={ img }
           width={ 200 }
           height={ 200 }
           className={ 'object-cover h-[100%]' }
    />
  </figure>;
}

export const imageValid = ( img: string | undefined ): string => {
  const jpgTextNotFound = 'https://dummyimage.com/200x200/000/fff.jpg&text=not+found';
  if( !img ) {
    return jpgTextNotFound
  }
  else if( img.includes( "img" ) ) {
    return img
  }
  else {
    return jpgTextNotFound
  }
}
