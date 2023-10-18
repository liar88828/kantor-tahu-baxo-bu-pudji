export function ImagePrev( props: { src: string } ) {
  return <img src={ props.src }
              alt="Preview"
              className={ 'w-[100%] h-auto border-2 border-gray-300  rounded-3xl' }/>;
}