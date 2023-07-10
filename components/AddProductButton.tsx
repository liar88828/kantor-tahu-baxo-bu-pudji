"use client"

import { useTransition } from "react"
import { addProductToDatabase } from "../actions/serverActions"
export default function AddProductButton ()
{
  const [ isPending, startTransition ] = useTransition()

  const formData = new FormData()
  formData.append( "product", "MacBook Pro" )
  formData.append( "price", "1299.99" )



  return (
    <>
      <button
        onClick={ () => startTransition( () => addProductToDatabase( formData ) ) }
        className="border p-2 rounded-md w-48 fixed  right-0 bottom-0"
        style={ {
          backgroundColor: "lightgreen",
          // position: "fixed", right: "5%", bottom: "5%"
        } }
      >
        { isPending ? "Adding..." : "Add Product" }
      </button >
    </>

  )
}
