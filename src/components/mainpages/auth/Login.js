import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';

const initialState = {
    email: '',
    password: '',
};
function Login() {
    const { enqueueSnackbar } = useSnackbar();

    const [user, setUser] = useState(initialState);
    const { email, password } = user;

    const state = useContext(ContextHook);
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };

    const handleSubmit = async (e) => {
        setLoadingBackDrop(true);
        e.preventDefault();
        try {
            const res = await axios.post('/user/login', { ...user });
            enqueueSnackbar(res.data.msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setLoadingBackDrop(false);
            localStorage.setItem('firstLogin', true);
            window.location.href = '/';
        } catch (err) {
            enqueueSnackbar(err.response.data.msg, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setLoadingBackDrop(false);
        }
    };

    const responseGoogle = async (response) => {
        setLoadingBackDrop(true);

        try {
            const res = await axios.post('/user/google_login', { tokenId: response.tokenId });
            enqueueSnackbar(res.data.msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setUser({ ...user });
            setLoadingBackDrop(false);
            localStorage.setItem('firstLogin', true);
            window.location.href = '/';
        } catch (err) {
            err.response.data.msg &&
                enqueueSnackbar(err.response.data.msg, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            setLoadingBackDrop(false);
        }
    };

    const responseFacebook = async (response) => {
        setLoadingBackDrop(true);

        try {
            const { accessToken, userID } = response;
            const res = await axios.post('/user/facebook_login', { accessToken, userID });
            enqueueSnackbar(res.data.msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });

            setUser({ ...user });
            setLoadingBackDrop(false);

            localStorage.setItem('firstLogin', true);

            window.location.href = '/';
        } catch (err) {
            err.response.data.msg &&
                enqueueSnackbar(err.response.data.msg, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            setLoadingBackDrop(false);
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
                    ????ng nh???p
                </Typography>

                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            onChange={handleChangeInput}
                            value={email}
                            name="email"
                            id="standard-basic"
                            label="?????a ch??? Email"
                            variant="standard"
                        />
                    </div>

                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            id="standard-password-input"
                            label="M???t kh???u"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            value={password}
                            name="password"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="forgot_password">
                        <Link to="/forgot_password">Qu??n m???t kh???u?</Link>
                    </div>
                    <Button style={{ width: '100%', marginBottom: '10px' }} type="submit" variant="contained">
                        ????ng nh???p
                    </Button>
                </form>

                <div className="social">
                    <GoogleLogin
                        clientId="394874475785-vpnumlouj30mbicdtvoi6g0d6si6nmac.apps.googleusercontent.com"
                        buttonText="????ng nh???p v???i google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
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
                    B???n ch??a c?? t??i kho???n /{' '}
                    <Link style={{ fontWeight: 500 }} to="/register">
                        ????ng k?? ngay
                    </Link>
                </p>
            </Card>
        </div>
    );
}

export default Login;
