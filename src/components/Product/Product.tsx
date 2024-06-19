import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import { Product as ProductType } from './types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Card = styled.div`
  background-color: #1f1f1f;
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 20px;
  display: block;
  text-decoration: none;
`;

const CardContent = styled.div`
  padding: 15px;

  a {
    display: block; 
    margin-bottom: 5px;
  }
`;

const Title = styled(Link)`
  font-size: 24px;
  color: #4d7bf3;
  text-decoration: none;

  &:hover {
    color: #82a4f8;
  }
`;

const StyledLink = styled(Link)`
  color: #4d7bf3;
  text-decoration: none;

  &:hover {
    color: #82a4f8;
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  position: relative;

  .slick-slide img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  padding: 0.2em 0.4em;
  margin: 0.2em;
  border-radius: 0.2em;
  font-size: 0.8em;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateQueryParams = (tag: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tag', tag);
    navigate({ search: searchParams.toString() });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Card>
      <CardContent>
        <Title to={`/products/${product.id}`}>{product.name}</Title>
        {product.summary}
        {product.github && <StyledLink to={product.github} target="_blank">GitHub</StyledLink>}
        {product.download && <StyledLink to={product.download} target="_blank">Download</StyledLink>}

        <TagsContainer>
          {product.tags.map((tag, idx) => (
            <Tag key={idx} onClick={() => updateQueryParams(tag)}>{tag}</Tag>
          ))}
        </TagsContainer>

        <SlideContainer>
          <Slider {...settings}>
            {product.screenshots.map((src, idx) => (
              <div key={idx}>
                <img src={src} alt={`Screenshot ${idx + 1}`} />
              </div>
            ))}
          </Slider>
        </SlideContainer>
        <SlideContainer>
          <Slider {...settings}>
            {product.youtube.map((src, idx) => (
              <div key={idx}>
                <iframe
                  width="100%"
                  height="315"
                  src={src}
                  title={src}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe> 
              </div>
            ))}
          </Slider>
        </SlideContainer>

      </CardContent>
    </Card>
  );
};

export default Product;
