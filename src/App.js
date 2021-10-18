import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/global/headers';
import Footer from './components/global/footers';
import Pages from './pages';
import { DataProvider } from './ContextHook';

function App() {
    return (
        <DataProvider>
            <Router>
                <Header />
                <div className="App">
                    <Pages />
                </div>
                <Footer />
            </Router>
        </DataProvider>
    );
}

export default App;
