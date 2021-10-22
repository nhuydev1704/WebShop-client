import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { DataProvider } from './ContextHook';

ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <DataProvider>
                    <App />
                </DataProvider>
            </SnackbarProvider>
        </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
