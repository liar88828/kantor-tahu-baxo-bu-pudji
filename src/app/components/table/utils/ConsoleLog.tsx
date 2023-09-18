//For Table
export function ConsoleLog( props: { onClick: () => void, onClick1: () => void } ) {
  return <>
    <button
      className="border rounded p-2 mb-2"
      onClick={ props.onClick }
    >
      Log `rowSelection` state
    </button>


    <button
      className="border rounded p-2 mb-2 bg-red-300"
      onClick={ props.onClick1 }
    >
      Log table.getSelectedRowModel().flatRows
    </button>
  </>;
}
