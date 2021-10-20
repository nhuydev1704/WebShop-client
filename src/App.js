import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/global/headers';
import Footer from './components/global/footers';
import Pages from './pages';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ContextHook } from './ContextHook';

function App() {
    const state = useContext(ContextHook);
    const [openDrawer, setOpenDrawer] = state.drawer;

    return (
        <Router>
            <Header />
            {/* <div className="App"> */}
            <Grid
                style={{ padding: openDrawer ? '0 20px 0 40px' : '0 20px' }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Pages />
                </Grid>
            </Grid>
            {/* </div> */}
            <Footer />
        </Router>
    );
}

export default App;
