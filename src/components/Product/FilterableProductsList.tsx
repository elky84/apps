import React, { useState, useEffect } from 'react';
import { Product as ProductType } from './types';
import useQuery from './useQuery';
import ProductsList from './ProductsList';

const FilterableProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const query = useQuery();
  const category = query.get('category');
  const tag = query.get('tag');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/products.json')
      .then(response => response.json())
      .then((data: ProductType[]) => {
        setProducts(data)
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = category ? product.category === category : true;
    const matchesTag = tag ? product.tags.includes(tag) : true;
    return matchesCategory && matchesTag;
  });

  return <ProductsList products={filteredProducts} />;
};

export default FilterableProductList;
