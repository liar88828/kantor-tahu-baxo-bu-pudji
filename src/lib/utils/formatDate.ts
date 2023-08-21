export function formatDate( date: Date | string ) {
  let d     = new Date( date ),
      month = '' + ( d.getMonth() + 1 ),
      day   = '' + d.getDate(),
      year  = d.getFullYear();

  if( month.length < 2 )
    month = '0' + month;
  if( day.length < 2 )
    day = '0' + day;

  return [ day, month, year ].join( '-' );
}

export const getTime = () => {
  let today = new Date();
  let detik = ":" + today.getSeconds()
  return today.getHours() + ":" + today.getMinutes();
}

export const getDay = () => {
  let today = new Date();
  return today.getFullYear() + '/' + ( today.getMonth() + 1 ) + '/' + today.getDate();

}

export const setHours = ( time: string ): Date | string => {
  const t = new Date( Date.parse( time ) ).toLocaleTimeString(
    "id-ID",
    {
      hour  : '2-digit',
      minute: '2-digit',
    }
  ).split( "." )

  return t[ 0 ] + ":" + t[ 1 ]// + ":" + "00"
}
export const setTanggalHari = ( date: string, ): Date | string => {
  return new Date( Date.parse( date ) ).toLocaleDateString(
    "id-ID",
    { weekday: "long", } )
}

export const setTanggalAngka = ( date: string, ): Date | string => {
  return new Date( Date.parse( date ) ).toLocaleDateString(
    "id-ID",
    { dateStyle: "long", } )
}

export const setTanggalFull = ( date: string, ): Date | string => {
  return new Date( Date.parse( date ) ).toLocaleDateString(
    "id-ID",
    { dateStyle: "full", } )
}


export const setDates = ( date: string, ): Date | string => {
  const d     = new Date( Date.parse( date ) ).toLocaleString(
    "id-ID",
    {
      year: 'numeric',
      month: '2-digit',
      day : '2-digit',
    } )
  const array = d.split( "/" )
  return array[ 2 ] + "-" + array[ 1 ] + "-" + array[ 0 ]
}

export const defaultDate = () => {
  let curr = new Date();
  curr.setDate( curr.getDate() + 3 );
  return curr.toISOString().substring( 0, 10 );
}

export function toDay() {
  const date                 = new Date()
  const year                 = date.getFullYear()
  let month: number | string = date.getMonth() + 1
  let day: number | string   = date.getDate()
  if( month < 10 ) month = '0' + month
  if( day < 10 ) day = '0' + day
  return `${ year }/${ month }/${ day }`
}


