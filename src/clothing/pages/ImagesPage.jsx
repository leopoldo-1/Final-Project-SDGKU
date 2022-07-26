import { FileUpload } from 'primereact/fileupload'
import { Toast } from 'primereact/toast';

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Image } from 'primereact/image';
import { uploadImage } from '../../admin/products';


export const ImagesPage = () => {
  const url = import.meta.env.VITE_REACT_APP_URL


  const [file, setFile] = useState('')
  const [imageLink, setImageLink] = useState('')

  const getFile = async(fileName) => {
    console.log('getFile');
    try {
      const response = await axios({
        url: `${url}/api/file/${fileName}`,
        // data: id,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        }
      })
      console.log('response getFile ', response.request.responseURL)
      setImageLink(response.request.responseURL)
      return response

    } catch (error) {
      console.log('Error... ', error)
    }
  }


  const handleFile = (e) => {
    console.log('handleFile... ', e.target.files[0]);
    setFile(e.target.files[0])
  }



  const handleUpload = async(e) => {

    let formdata = new FormData()
    formdata.append('file', file)
    console.log('file1 ... ', file);
    await uploadImage(formdata)

    await getFile(file.name)
  }



  return (
    <>
      <div>ImagesPage</div>
          <form>
            <div>Select File</div>
            <input
              type="file"
              onChange={(e) => handleFile(e)}
            />

            <button type='button' onClick={(e) => handleUpload(e)}>Upload</button>
          </form>

          <Image src={imageLink} alt="Image Text" width='300px' />
    </>
  )
}
