import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { CssBaseline } from '@mui/material';

import ProductDetail from './pages/products/ProductDetail';

const customTheme = createTheme({
  palette: {
    background: { default: "#121212" }, // 어두운 배경
    primary: { main: "#64B5F6" }, // 어두운 테마의 주요 색상
    text: { primary: "#ffffff" } // 텍스트 색상을 밝게 설정
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: "#121212", // 어두운 배경
          color: "#64B5F6", // 어두운 테마의 텍스트 색상
          boxShadow: "none",
          borderBottom: "1px solid #424242", // 어두운 테마의 분할선 색상
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/?category=game' element={<Home />}></Route>
          <Route path='/?category=app' element={<Home />}></Route>
          <Route path='/?category=library' element={<Home />}></Route>
          <Route path="/products/:id" element={<ProductDetail/>} />
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
