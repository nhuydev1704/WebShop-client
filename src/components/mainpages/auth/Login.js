import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../ultils/notification/Notification';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Card from '@mui/material/Card';

const initialState = {
    email: '',
    password: '',
    err: '',
    success: '',
};

function Login() {
    const [user, setUser] = useState(initialState);
    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/login', { ...user });
            localStorage.setItem('firstLogin', true);
            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', { tokenId: response.tokenId });
            setUser({ ...user, error: '', success: res.data.msg });
            localStorage.setItem('firstLogin', true);

            // dispatch(dispatchLogin())
            window.location.href = '/';
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' });
        }
    };

    const responseFacebook = async (response) => {
        try {
            const { accessToken, userID } = response;
            const res = await axios.post('/user/facebook_login', { accessToken, userID });

            setUser({ ...user, error: '', success: res.data.msg });
            localStorage.setItem('firstLogin', true);

            window.location.href = '/';
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' });
        }
    };
    return (
        <div className="login_page">
            <Card variant="outlined" className="card__login">
                <h2>Đăng nhập</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Địa chỉ Email</label>
                        <input
                            type="text"
                            placeholder="Địa chỉ Email"
                            id="email"
                            value={email}
                            name="email"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            id="password"
                            value={password}
                            name="password"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="row">
                        <button type="submit">Đăng nhập</button>
                        <Link to="/forgot_password">Quên mật khẩu?</Link>
                    </div>
                </form>

                <div className="hr">Đăng nhập bằng</div>

                <div className="social">
                    <GoogleLogin
                        clientId="394874475785-vpnumlouj30mbicdtvoi6g0d6si6nmac.apps.googleusercontent.com"
                        buttonText="Đăng nhập với google"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <FacebookLogin
                        appId="145511920952572"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                </div>

                <p>
                    Thành viên mới? <Link to="/register">Đăng ký</Link>
                </p>
            </Card>
        </div>
    );
}

export default Login;
