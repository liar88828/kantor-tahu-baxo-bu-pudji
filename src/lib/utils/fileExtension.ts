export function addDot( extensionData: string, nama: string ) {
  return ( extensionData === "webp" || extensionData === "jpeg" )
         ? nama + "." + extensionData
         : nama + extensionData;
}

export function getExtensionData( name: string ) {
  return name.slice( -4 );
}

export const validateExtension = ( extensionData: string ) => {
  return (
    extensionData === ".jpg" ||
    extensionData === ".png" ||
    extensionData === ".bmp" ||
    extensionData === ".gif" ||
    extensionData === "webp" ||
    extensionData === "jpeg" ||
    extensionData === ".webp" ||
    extensionData === ".jpeg"
  )
}

