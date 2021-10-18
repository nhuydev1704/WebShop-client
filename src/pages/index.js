import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import ActivationEmail from '../components/mainpages/auth/ActivationEmail';
import ForgotPass from '../components/mainpages/auth/ForgotPassword';
import Login from '../components/mainpages/auth/Login';
import Register from '../components/mainpages/auth/Register';
import ResetPass from '../components/mainpages/auth/ResetPassword';
import Cart from '../components/mainpages/cart/Cart';
import Categories from '../components/mainpages/categories/Categories';
import CreateProduct from '../components/mainpages/createProduct/CreateProduct';
import DetailProduct from '../components/mainpages/detailProduct/DetailProduct';
import Products from '../components/mainpages/products/Products';
import EditUser from '../components/mainpages/profile/EditUser';
import Profile from '../components/mainpages/profile/Profile';
import NotFound from '../components/mainpages/ultils/NotFound/NotFound';
import { ContextHook } from '../ContextHook';

function Pages() {
    const state = useContext(ContextHook);
    const [isLooged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <div>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/detail/:id" exact component={DetailProduct} />

                <Route path="/login" exact component={isLooged ? NotFound : Login} />
                <Route path="/register" exact component={isLooged ? NotFound : Register} />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
                <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

                {/* <Route path="/history" exact component={isLooged ? OrderHistory : NotFound} /> */}
                {/* <Route path="/history/:id" exact component={isLooged ? OrderDetails : NotFound} /> */}

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/forgot_password" component={isLooged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLooged ? NotFound : ResetPass} exact />

                <Route path="/profile" component={isLooged ? Profile : NotFound} exact />
                <Route path="/cart" exact component={Cart} />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                <Route path="*" component={NotFound} />
            </Switch>
        </div>
    );
}

export default Pages;
