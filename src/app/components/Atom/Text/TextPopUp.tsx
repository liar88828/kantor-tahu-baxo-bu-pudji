export const TextPopUp = ( { title, value, titik = false, style1 = "", style2 = "" }: {
  title: string,
  value: string | number,
  titik?: boolean,
  style1?: string,
  style2?: string
} ) => {

  return <div className={ "flex flex-nowrap gap-1" }>
    <p className={ `text-xs sm:text-sm md:text-md font-bold ${ style1 }` }>{ title } { titik && " : " }</p>
    <p className={ `text-xs sm:text-sm md:text-md ${ style2 }` }>{ value }</p>
  </div>
}