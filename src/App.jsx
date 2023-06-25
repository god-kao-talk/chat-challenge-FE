import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PATH_URL } from './shared/constants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RedirectGoogleLogin from './components/RedirectionGoogleLogin';
import SignupPage from './pages/SignupPage';
import Chat from './pages/Chat';
import Search from './components/Search';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={PATH_URL.LOGIN} element={<LoginPage />} />
                    <Route
                        path={PATH_URL.REDIRECT_GOOGLE_LOGIN}
                        element={<RedirectGoogleLogin />}
                    />
                    <Route path={PATH_URL.SIGNUP} element={<SignupPage />} />
                    <Route
                        path={PATH_URL.MAIN}
                        element={
                            <Layout>
                                <Main />
                            </Layout>
                        }
                    />
                    <Route
                        path={'/chat/:roomcode'}
                        element={
                            <Layout>
                                <Chat />
                                <Search />
                            </Layout>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
