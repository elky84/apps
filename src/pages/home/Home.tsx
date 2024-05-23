import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product } from '../../components/Product/types';
import App from '../../components/Product/Product';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #121212;
  padding: 20px;
`;

const CardWrapper = styled.div`
  width: calc(33.33% - 20px); /* 한 줄에 3개의 카드가 보이도록 설정 */
  margin-right: 20px; /* 각 카드 사이의 간격을 설정 */
  margin-bottom: 20px; /* 각 줄 사이의 간격을 설정 */

  @media screen and (max-width: 1200px) {
    width: calc(50% - 20px); /* 한 줄에 2개의 카드가 보이도록 설정 */
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 20px); /* 한 줄에 1개의 카드가 보이도록 설정 */
    margin-right: 0;
  }
`;


const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  return (
    <Container>
      {products.map((product) => (
        <CardWrapper key={product.id}>
          <App product={product} />
        </CardWrapper>
      ))}
    </Container>
  );
};

export default Home;
