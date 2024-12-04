import React from 'react';

function Horizon( { text }: { text: string } ) {
  return (
    <div className="divider divider-primary">{ text.toUpperCase() }</div>

  );
}

export default Horizon;