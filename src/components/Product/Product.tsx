import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import { Product } from './types';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background-color: #1f1f1f;
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 20px; /* 각 카드 사이의 간격을 설정 */
  margin-bottom: 20px; /* 각 줄 사이의 간격을 설정 */
  padding: 20px; /* 내용이 좁게 보이지 않도록 패딩 추가 */
  display: block; /* 링크를 블록 레벨 요소로 설정하여 전체 영역 클릭 가능하도록 함 */
  text-decoration: none; /* 기본 링크 스타일 제거 */
`;

const CardContent = styled.div`
  padding: 15px;

  /* 링크를 각각 새로운 라인에 표시하기 위한 스타일 */
  a {
    display: block; /* 링크를 블록 레벨 요소로 설정하여 각각 새로운 라인에 표시 */
    margin-bottom: 5px; /* 각 링크 사이의 간격을 설정 */
  }
`;

const Title = styled.h2`
  font-size: 20px;
  color: #4d7bf3;
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

const Tag = styled.span`
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  padding: 0.3em 0.6em;
  margin: 0.2em;
  border-radius: 0.2em;
  font-size: 0.9em;
`;

interface AppProps {
  product: Product;
}

const App: React.FC<AppProps> = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Card to={`/products/${product.id}`}>
      <CardContent>
        <Title>{product.name}</Title>
        {product.summary}
        {product.github && <StyledLink to={product.github} target="_blank">GitHub</StyledLink>}
        {product.download && <StyledLink to={product.download} target="_blank">Download</StyledLink>}

        <div>
          {product.tags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </div>

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

export default App;
