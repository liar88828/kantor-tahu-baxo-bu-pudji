
export async function extractData(
  req: Request,
) {
  const formData = await req.formData();

  let dataArray: any        = []
  const formDataEntryValues = Array.from( formData.values() );
  for( const formDataEntryValue of formDataEntryValues ) {
    if( typeof formDataEntryValue === "object" && "arrayBuffer" in
      formDataEntryValue ) {
      dataArray.push( formDataEntryValues[ 0 ] )

      const file      = formDataEntryValue as unknown as Blob;
      const buffer    = Buffer.from( await file.arrayBuffer() );
      const json      = JSON.parse( dataArray )
      const dataImage = { file, buffer }
      // console.log(dataImage,json)

      return { dataImage, json }
    }
  }
}

