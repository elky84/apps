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

const MarkdownContainer = styled.div`
  a {
    color: #82a4f8;
    text-decoration: none;

    &:hover {
      color: #4d7bf3;
    }
  }
`;

const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 62.5%; /* 16:10 Aspect Ratio */
  border-radius: 10px;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

interface Product {
  id: number;
  name: string;
  github?: string;
  download: string;
  screenshots: string[];
  youtube: string[];
  descriptionPath: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        const product = data.find(p => p.id === parseInt(id ?? "1"));
        setProduct(product || null);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(product.descriptionPath)
        .then(response => response.text())
        .then(setMarkdown);
    }
  }, [product]);

  if (!product) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>{product.name}</Title>
      <SlideContainer>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
          {product.screenshots.map((item, idx) => (
            <div key={idx}>
              <img src={item} alt={`Screenshot ${idx + 1}`} />
            </div>
          ))}
        </Slider>
      </SlideContainer>
      <SlideContainer>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
          {product.youtube.map((item, idx) => (
            <div key={idx}>
              <IframeContainer>
                <Iframe src={item} allowFullScreen></Iframe>
              </IframeContainer>
            </div>
          ))}
        </Slider>
      </SlideContainer>
      {product.github && <p><StyledLink href={product.github} target="_blank">GitHub</StyledLink></p>}
      <p><StyledLink href={product.download} target="_blank">Download</StyledLink></p>
      <MarkdownContainer>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </MarkdownContainer>
    </Container>
  );
};

export default ProductDetail;
