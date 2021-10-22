import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/global/headers';
import Footer from './components/global/footers';
import Pages from './pages';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ContextHook } from './ContextHook';

function App() {
    const state = useContext(ContextHook);
    const [openDrawer, setOpenDrawer] = state.drawer;
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    return (
        <Router>
            <div className="main_app">
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
            </div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingBackDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Router>
    );
}

export default App;
