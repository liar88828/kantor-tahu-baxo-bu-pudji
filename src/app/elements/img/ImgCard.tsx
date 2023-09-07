import Image from 'next/image';

export function ImgCard( { img }: { img: string } ) {
  return <figure className={ 'w-[40%] sm:w-[30%] md:w-[25%] xl:w-[20%] h-auto ' }>
    <Image src={ img || '' }
           alt={ img }
           width={ 200 }
           height={ 200 }
           className={ 'object-cover h-[100%]' }
    />
  </figure>;
}