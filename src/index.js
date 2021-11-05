import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { DataProvider } from './ContextHook';
import ChatbotComponet from './components/commonComponents/ChatbotComponent';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <DataProvider>
                    <App />
                    <ChatbotComponet />
                </DataProvider>
            </SnackbarProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
