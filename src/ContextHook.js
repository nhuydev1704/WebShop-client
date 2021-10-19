import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import CategoriesAPI from './api/CategoriesAPI';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';

export const ContextHook = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [socket, setSocket] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(true);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');

        const socket = io();
        setSocket(socket);
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token');

                setToken(res.data.accesstoken);

                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);
            };

            refreshToken();
        }

        return () => socket.close();
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        drawer: [openDrawer, setOpenDrawer],
        socket,
    };
    return <ContextHook.Provider value={state}>{children}</ContextHook.Provider>;
};
