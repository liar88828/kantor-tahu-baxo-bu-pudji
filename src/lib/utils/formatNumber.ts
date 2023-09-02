export function formatPhoneNumber( phoneNumber: string ): string {
  phoneNumber              = phoneNumber.startsWith( "0" ) ? phoneNumber : "0" + phoneNumber
  // Remove any non-numeric characters from the phone number
  const numericPhoneNumber = phoneNumber.replace( /\D/g, '' );

  // Check if the numeric phone number starts with '0'
  // if (numericPhoneNumber.startsWith('0')) {
  //   const formattedNumber = `+62${numericPhoneNumber.slice(1)}`;
  //   return formattedNumber;
  // }

  if( numericPhoneNumber.startsWith( '0' ) ) {
    const formattedNumber = `+62 ${ numericPhoneNumber.slice( 1, 5 ) } ${ numericPhoneNumber.slice( 5, 9 ) } ${ numericPhoneNumber.slice( 9 ) }`;
    return formattedNumber;
  }

  // If the phone number doesn't start with '0', assume it's already properly formatted
  return phoneNumber;
}
