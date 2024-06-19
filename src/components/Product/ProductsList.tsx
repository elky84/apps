import React from 'react';
import styled from 'styled-components';
import { Product as ProductType } from './types';
import Product from './Product';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #121212;
  padding: 20px;
`;

const CardWrapper = styled.div`
  width: calc(33.33% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 1200px) {
    width: calc(50% - 20px);
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 20px);
    margin-right: 0;
  }
`;

interface ProductsListProps {
  products: ProductType[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <Container>
      {products.map((product) => (
        <CardWrapper key={product.id}>
          <Product product={product} />
        </CardWrapper>
      ))}
    </Container>
  );
};

export default ProductsList;
