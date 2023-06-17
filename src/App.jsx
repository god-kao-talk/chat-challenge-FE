import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import queryString from "query-string";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    // URL에서 토큰을 파싱하고 쿠키에 저장
    const parsed = queryString.parse(window.location.search);
    // console.log(window.location.search)
    // console.log(parsed)
    if (parsed.Authorization) {
      const token = parsed.Authorization.split(" ")[1];
      Cookies.set("Authorization", token);
    }

    if (parsed["Authorization-refresh"]) {
      const refreshToken = parsed["Authorization-refresh"].split(" ")[1];
      Cookies.set("Authorization-refresh", refreshToken);
    }

    // 쿠키에서 토큰 가져와서 저장
    // const token = Cookies.get("Authorization");
    // if (token) {
    //   try {
    //     const decoded = jwt_decode(token);
    //     // 일반로그인시 decoded.email 아닐수도 !
    //     dispatch(setUserId(decoded.email));
    //     dispatch(setIsAuthenticated(true));
    //   } catch (error) {
    //     console.error("토큰 오류", error);
    //     dispatch(setIsAuthenticated(false));
    //   }
    // }
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route path='/Main' element={<Main />} />
        </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
