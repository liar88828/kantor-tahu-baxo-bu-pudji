export function SubmitButton( props: { method: 'POST' | 'PUT' } ) {
  return <button
    data-test={ "button-submit" }
    type="submit"
    className="bg-blue-500 p-2 rounded-md text-white">
    { props.method === 'POST' ? 'Simpan' : 'EDIT' }
  </button>;
}

export function OpenButton( props:
  {
    method: 'POST' | 'PUT',
    fun: () => void,
    states: boolean
  } ) {
  return <button
    onClick={ props.fun }
    data-test={ "button-check" }
    type="button"
    className={ `btn ${ !props.states ? "btn-info" : "btn-error" } text-white uppercase` }>
    { !props.states ? "Tambah" : "Tutup" }
  </button>;
}