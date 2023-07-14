import React from 'react';

export  const StyleInputForm= (salah:boolean ):string => ` bg-gray-100 text-black border rounded py-2 mb-1 leading-tight focus:outline-none focus:bg-white ${ !salah ? "" : "border-red-500" } `
export  const styleLabelForm = " text-black mb-1";
export  const wrongInput = "text-red-500 text-xs italic";
