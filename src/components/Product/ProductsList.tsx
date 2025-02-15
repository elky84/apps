import React from 'react';
import styled from 'styled-components';
import { Product as ProductType } from './types';
import Product from './Product';

const Container = styled.div`
  column-count: 3;
  column-gap: 20px;
  background-color: #121212;
  padding: 20px;

  @media screen and (max-width: 1200px) {
    column-count: 2;
  }

  @media screen and (max-width: 768px) {
    column-count: 1;
  }
`;

const CardWrapper = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  break-inside: avoid; /* 카드가 컬럼 중간에서 끊기지 않도록 */
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
