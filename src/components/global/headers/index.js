import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CssBaseline } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
// import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import SearchComponent from './SearchComponent';
const drawerWidth = 240;

function Header() {
    const state = useContext(ContextHook);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [search, setSearch] = state.productsAPI.search;
    const [cart] = state.userAPI.cart;
    const [userr] = state.userAPI.userr;
    const [openDrawer, setOpenDrawer] = state.drawer;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { pathname } = useLocation();

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
                <Link to="/create_product">
                    <Button style={{ lineHeight: 'inherit' }} color="inherit">
                        Thêm sản phẩm
                    </Button>
                </Link>
                <Link to="/category">
                    <Button style={{ lineHeight: 'inherit' }} color="inherit">
                        Danh mục
                    </Button>
                </Link>
            </>
        );
    };

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

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
                    <Stack
                        style={{
                            top: 50,
                            right: 28,
                        }}
                        direction="column"
                        spacing={0}
                        alignItems="center"
                    >
                        <Link className="popover__text" to="/profile">
                            <Button
                                style={{ lineHeight: 'inherit' }}
                                color="inherit"
                                className="popover__header"
                                onClick={handleClose}
                            >
                                Thông tin
                            </Button>
                        </Link>
                        <Link className="popover__text" to="/" onClick={logoutUser}>
                            <Button
                                style={{ lineHeight: 'inherit' }}
                                color="inherit"
                                className="popover__header"
                                onClick={handleClose}
                            >
                                Đăng xuất
                            </Button>
                        </Link>
                    </Stack>
                </Popover>
                <Stack direction="row">
                    <Button style={{ lineHeight: 'inherit' }} color="inherit">
                        <Link to="/">{isAdmin ? 'Sản phẩm' : 'Cửa hàng'}</Link>
                    </Button>
                    {isAdmin && adminRouter()}
                    <div className="avatar" aria-describedby={id} onClick={handleClick}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Avatar sx={{ width: 32, height: 32 }} alt="avatar" src={userr.avatar} />
                            <Typography aria-haspopup="true" style={{ fontSize: '.9rem' }}>
                                {userr.name} <i className="fas fa-angle-down"></i>
                            </Typography>
                        </Stack>
                    </div>
                </Stack>
                {isAdmin ? (
                    ''
                ) : (
                    <Tooltip title="Giỏ hàng" placement="top">
                        <Link to="/cart" className="cart-icon">
                            <Badge color="info" badgeContent={cart.length}>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </Link>
                    </Tooltip>
                )}
            </>
        );
    };

    const handleOpen = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleOpen}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <div className="logo">
                                <Link to="/">{isAdmin ? 'Admin' : 'SHOPC4'}</Link>
                            </div>
                        </Typography>

                        {pathname === '/' && <SearchComponent />}

                        {isLogged ? (
                            userLink()
                        ) : (
                            <Stack space={1} direction="row">
                                <Link to="/">
                                    <Button style={{ lineHeight: 'inherit' }} color="inherit">
                                        {isAdmin ? 'Sản phẩm' : 'Cửa hàng'}
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button style={{ lineHeight: 'inherit' }} color="inherit">
                                        Đăng nhập
                                    </Button>
                                </Link>
                            </Stack>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}

export default React.memo(Header);
