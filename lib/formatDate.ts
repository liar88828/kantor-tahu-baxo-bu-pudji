export function formatDate( date: Date | string ) {
  var d = new Date( date ),
    month = '' + ( d.getMonth() + 1 ),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if( month.length < 2 )
    month = '0' + month;
  if( day.length < 2 )
    day = '0' + day;

  return [ day, month, year ].join( '-' );
}

export const getTime = ( d: boolean = false ) => {
  let today = new Date();
  let detik = ":" + today.getSeconds()
  return today.getHours() + ":" + today.getMinutes();
}

export const getDay = () => {
  let today = new Date();
  return today.getFullYear() + '/' + ( today.getMonth() + 1 ) + '/' + today.getDate();

}

export const getLocaleTime = () => {
  return new Date().toLocaleTimeString( "id-ID",
    {
      hour: '2-digit', minute: '2-digit',
    }
  )
}

export const getDateNow = () => {
  return new Date( getDay() ).toLocaleString(
    "id-ID",
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    } )
}

export const defaultDate = () => {
  let curr = new Date();
  curr.setDate( curr.getDate() + 3 );
  return curr.toISOString().substring( 0, 10 );
}

export function toDay() {
  const date = new Date()
  const year = date.getFullYear()

  let month: number | string = date.getMonth() + 1
  let day: number | string = date.getDate()

  if( month < 10 ) month = '0' + month
  if( day < 10 ) day = '0' + day

  return `${ year }/${ month }/${ day }`

}
