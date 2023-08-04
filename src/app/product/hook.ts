import { useForm }  from 'react-hook-form';
import { TProduct } from '@/entity/client/produk';
import { useState } from 'react';

function useImage() {
  const { control, register, handleSubmit, } = useForm<TProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ]    = useState<File | null>();
  const [ previewURL, setPreviewURL ]        = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ]              = useState<string>( '' );
  return { control, register, handleSubmit, selectedFile, setSelectedFile, previewURL, setPreviewURL, message, setMessage };
}
