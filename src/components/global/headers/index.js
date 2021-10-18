import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Cart from './icon/cart.svg';
import Close from './icon/close.svg';
import Menu from './icon/menu.svg';

function Header() {
    const state = useContext(ContextHook);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false);
    const [userr] = state.userAPI.userr;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const logoutUser = async () => {
        await axios.get('/user/logout');

        localStorage.removeItem('firstLogin');

        window.location.href = '/';
    };
    //
    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Thêm sản phẩm</Link>
                </li>
                <li>
                    <Link to="/category">Danh mục</Link>
                </li>
            </>
        );
    };

    const userLink = () => {
        return (
            <>
                <Popover
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <Stack direction="column" spacing={0} alignItems="center">
                        <Button color="inherit" className="popover__header" onClick={handleClose}>
                            <Link className="popover__text" to="/profile">
                                Thông tin
                            </Link>
                        </Button>
                        <Button color="inherit" className="popover__header" onClick={handleClose}>
                            <Link className="popover__text" to="/" onClick={logoutUser}>
                                Đăng xuất
                            </Link>
                        </Button>
                    </Stack>
                </Popover>
                <div className="avatar" onClick={handleClick}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32 }} alt="avatar" src={userr.avatar} />
                        <Typography aria-haspopup="true" style={{ fontSize: '.9rem' }}>
                            {userr.name} <i className="fas fa-angle-down"></i>
                        </Typography>
                    </Stack>
                </div>
            </>
        );
    };

    const transForm = {
        transform: isLogged ? 'translateY(-5px)' : 0,
        left: menu ? 0 : '-100%',
    };
    return (
        <header>
            {/* <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="menu" width="30" />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'SHOPC4'}</Link>
                </h1>
            </div>
            <ul style={transForm}>
                <li>
                    <Link to="/">{isAdmin ? 'Sản phẩm' : 'Cửa hàng'}</Link>
                </li>
                {isAdmin && adminRouter()}

                {isLogged ? (
                    userLink()
                ) : (
                    <li>
                        <Link to="/login">
                            <i className="fas fa-user"></i> Đăng nhập
                        </Link>
                    </li>
                )}

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="close" width="30" className="menu" />
                </li>
            </ul>
            {isAdmin ? (
                ''
            ) : (
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="cart" width="30" />
                    </Link>
                </div>
            )} */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        {isLogged ? (
                            userLink()
                        ) : (
                            <Button color="inherit">
                                <Link to="/login">
                                    <i className="fas fa-user"></i> Đăng nhập
                                </Link>
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}

export default Header;
