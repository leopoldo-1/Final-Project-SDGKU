import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../auth/context/UserContext';
import { getUser, updateUser } from '../helpers';
import { ProductService } from '../../service/ProductService';

import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
const URL = import.meta.env.VITE_REACT_APP_URL

const CarouselStyleAssessment = () => {

    const { globalUser, handleSetGlobalUser } = useContext( UserContext )
    const [products, setProducts] = useState([]);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const retrieveProducts = async() => {
        const product = new ProductService();
        let products = await product.getWomenProducts();
        setProducts(products)
    }

    useEffect(() => {
        retrieveProducts()
    }, []);

    const handleAddProduct = async( product ) => {
      let productToAdd = {
          productId: product._id,
          quantity: 1
      }

      let data =
      {...globalUser, cart: [...globalUser.cart, productToAdd]}

      await handleSetGlobalUser(data)
    }

    useEffect(() => {
        handleUpdateUser(globalUser._id, globalUser)
    }, [globalUser])

		const handleUpdateUser = async(id, user) => {
			const response = await updateUser(id, user)
			console.log('response ', response);
		}

    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content bg-primary-reverse" >
                    <div className="mb-3">
                        <img width="70%" height="70%" src={`${URL}/static/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                    </div>
                    <div className=''>
                        <h4 className="mb-1">{product.name}</h4>
                        <h3>{ product.title }</h3>
                        <small><b>Style: </b>{product.styleType}</small>
                        <h5 className='underline'> $ {product.price}</h5>
                        <span className={`product-badge status-${product.inventoryStatus}`}>{product.inventoryStatus}</span>
                        <div className="px-4 car-buttons mt-5">
                            <Button
                                label="Buy now"
                                className="p-button-primary p-button-sm p-button-rounded mr-2 w-full md:w-auto"
                            />
                            <Button
                                label="Add to cart"
                                className="p-button-secondary p-button-outlined p-button-sm p-button-rounded mt-2 w-full md:w-auto md:mt-0 mr-2"
                                onClick={ () => handleAddProduct(product) }
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-demo">

            <div className="card">
                <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                    autoplayInterval={3000} itemTemplate={productTemplate} header={<div></div>} />
            </div>
        </div>
    );
}

export default CarouselStyleAssessment;