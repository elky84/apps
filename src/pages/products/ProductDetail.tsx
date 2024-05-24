import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactMarkdown from 'react-markdown';

const Container = styled.div`
  background-color: #121212;
  color: #ffffff;
  padding: 20px;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #4d7bf3;
`;

const StyledLink = styled.a`
  color: #4d7bf3;
  text-decoration: none;

  &:hover {
    color: #82a4f8;
  }
`;

const SlideContainer = styled.div`
  .slick-slide img {
    width: 100%;
    border-radius: 10px;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 315px;
  border: none;
  border-radius: 10px;
`;

const MarkdownContainer = styled.div`
  a {
    color: #82a4f8; /* 어두운 파란색으로 변경 */
    text-decoration: none;

    &:hover {
      color: #4d7bf3; /* hover 시 색상 */
    }
  }
`;

interface Product {
  id: number;
  name: string;
  github: string;
  download: string;
  screenshots: string[];
  youtube: string[];
  description: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        const product = data.find(p => p.id === parseInt(id ?? "1"));
        setProduct(product || null);
      });
  }, [id]);

  if (!product) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>{product.name}</Title>
      <SlideContainer>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
          {product.screenshots.map((src, idx) => (
            <div key={idx}>
              <img src={src} alt={`Screenshot ${idx + 1}`} />
            </div>
          ))}
          {product.youtube.map((src, idx) => (
            <div key={idx}>
              <Iframe src={src} allowFullScreen></Iframe>
            </div>
          ))}
        </Slider>
      </SlideContainer>
      <p><StyledLink href={product.github} target="_blank">GitHub</StyledLink></p>
      <p><StyledLink href={product.download} target="_blank">Download</StyledLink></p>
      <MarkdownContainer>
        <ReactMarkdown>{product.description}</ReactMarkdown>
      </MarkdownContainer>
    </Container>
  );
};

export default ProductDetail;
