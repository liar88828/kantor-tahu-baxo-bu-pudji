export function ImgCard( { img }: { img: string } ) {
  return <figure className={ 'w-[50%] sm:w-[35%] md:w-[50%]   lg:w-[40%] h-auto ' }>
    <img src={ img }
         alt={ img }
         width={ 200 }
         height={ 200 }
         className={ 'object-cover h-[100%] ' }
    />
    {/*<Image src={ config.url + img }*/ }
    {/*       alt={ img }*/ }
    {/*       width={ 100 }*/ }
    {/*       height={ 100 }*/ }
    {/*       quality={ 1 }*/ }
    {/*       className={ 'object-cover h-[100%] ' }*/ }
    {/*/>*/ }
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