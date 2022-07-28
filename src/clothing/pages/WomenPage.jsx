import { useEffect, useState } from "react";
import {DataService } from "../../service/dataService";

export const WomenPage = () => {

  const [viewProduct, setViewProduct] = useState([]);

  const loadProduct = async () =>{
    const service = new DataService();
    let prods = await service.getCatalog();
    setViewProduct(prods);
  };
  useEffect(() => {
      loadProduct();//Catalog loading
      
  }, []);
    
    

  return (
    <div className="coupons">
        <ul>
            {viewProduct.map((prods) => ( 
          <li key={prods.gender.woman}>
            {prods.title}-{prods.price}-{prods.image}
          </li>))}
        </ul>
    </div>
    
  )
}
