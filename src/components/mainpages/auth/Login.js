import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../ultils/notification/Notification';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
            <Card variant="outlined" style={{ padding: '40px', borderRadius: '10px' }} className="card__login">
                <Typography
                    style={{ fontSize: '1.5rem', fontWeight: 400, textAlign: 'center' }}
                    variant="h2"
                    gutterBottom
                    component="div"
                >
                    Đăng nhập
                </Typography>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            onChange={handleChangeInput}
                            value={email}
                            name="email"
                            id="standard-basic"
                            label="Địa chỉ Email"
                            variant="standard"
                        />
                    </div>

                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            id="standard-password-input"
                            label="Mật khẩu"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            value={password}
                            name="password"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="forgot_password">
                        <Link to="/forgot_password">Quên mật khẩu?</Link>
                    </div>
                    <Button style={{ width: '100%', marginBottom: '10px' }} type="submit" variant="contained">
                        Đăng nhập
                    </Button>
                </form>

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
                    Bạn chưa có tài khoản /{' '}
                    <Link style={{ fontWeight: 500 }} to="/register">
                        Đăng ký ngay
                    </Link>
                </p>
            </Card>
        </div>
    );
}

export default Login;
