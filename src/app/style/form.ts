export const StyleInputForm = ( salah: boolean ): string => `p-2 bg-gray-100 text-black border rounded   mb-1 leading-tight focus:outline-none focus:bg-white ${ !salah
                                                                                                                                                                 ? ""
                                                                                                                                                                 : "border-red-500" } `
export const styleLabelForm = " text-black mb-1";
export const wrongInput     = "text-red-500 text-xs italic";
