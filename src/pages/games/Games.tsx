import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TabMenu = styled.ul`
  background-color: #121212; /* 어두운 배경 */
  color: #ffffff; 
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top: 10px;

  .submenu {
    display: flex;
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    color: #4d7bf3; /* 블루 톤의 텍스트 */
  }

  .focused {
    background-color: #333333;
    color: #4d7bf3;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #4d7bf3; /* 블루 톤의 텍스트 */
  }
`;


const menuArr = [
  { name: 'Product', path:"/games?category=product",  component: <p>product</p> },
  { name: 'Programming', path: "/games?category=programming", component: <p>programming</p> },
  { name: 'Career', path: "/games?category=career", component: <p>career</p> },
];

const Games = () => {
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentIndex = menuArr.findIndex(item => item.path === currentPath);
    if (currentIndex !== -1) {
      setCurrentTab(currentIndex);
    }
  }, []);

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

    return (
      <>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li
              key={index}
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}
            >
              <StyledLink to={el.path}>{el.name}</StyledLink>
            </li>
          ))}
        </TabMenu>
        {menuArr[currentTab].component}
      </>
      )
  }
  
  export default Games