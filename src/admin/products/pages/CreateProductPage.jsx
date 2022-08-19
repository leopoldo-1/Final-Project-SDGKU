
import { useNavigate } from 'react-router-dom'
import{ useRef, useState } from 'react'

import { FormUI } from '../components'
import { createProduct } from '../helpers'

import { BreadCrumb } from 'primereact/breadcrumb'
import { Toast } from 'primereact/toast'

export const CreateProductPage = () => {

  const initialProduct = {
    title: '',
    price: '',
    image: '',
    styleType: '',
    gender: '',
    stock: '',
    discount: '',
    category: ''
  }

  const [product, setProduct] = useState( initialProduct )

  const [isEmptyField, setIsEmptyField] = useState(false)
  // const { name, email, password, country, city, zip } = user

  const navigate = useNavigate()
  const toast = useRef(null);

  const handleCreateProduct = async(product) => {
    setIsEmptyField(false)
    if( product.title === '' ||  product.price === '' || product.gender === '' ) {
      setIsEmptyField( true )

      toast.current.show({
        severity:'error',
        summary: 'Error',
        detail:'Fields required',
        life: 3000}
      );

    }
    else {
      const response = await createProduct(product)
      console.log('handleCreateProduct reponse ', response);

      setProduct( initialProduct )

      toast.current.show({severity:'success', summary: 'Success', detail:'Product created', life: 3000});
      // navigate(-1)
    }
  }

  const handleCancelCreateProduct = () => {
    setProduct( initialProduct )
  }

  const items = [
    { label: 'Products', command: () => navigate(-1)},
    { label: 'Create Product' },
  ];
  const home = { icon: 'pi pi-home', label: 'Admin', command: () => navigate(-2) }

  return (
    <>
      <Toast ref={toast} />

      <BreadCrumb
        model={items}
        home={home}
      />

      <FormUI
        formTitle="Create Product"
        product={product}
        setProduct={setProduct}
        handleProduct={handleCreateProduct}
        resetForm={handleCancelCreateProduct}
        isEmptyField={isEmptyField}
      />
    </>
  )
}