import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';
import { isEmail, isEmpty, isLength, isMatch } from '../ultils/validation/Validation';

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
};

function Register() {
    const { enqueueSnackbar } = useSnackbar();

    const state = useContext(ContextHook);
    const socket = state.socket;
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    const [user, setUser] = useState(initialState);
    const { name, email, password, cf_password } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        setLoadingBackDrop(true);
        e.preventDefault();
        if (isEmpty(name) || isEmpty(password)) {
            setLoadingBackDrop(false);
            return enqueueSnackbar('Hãy điền đầy đủ thông tin', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }

        if (!isEmail(email)) {
            setLoadingBackDrop(false);
            return enqueueSnackbar('Email không chính xác', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }

        if (isLength(password)) {
            setLoadingBackDrop(false);
            return enqueueSnackbar('Mật khẩu tối thiểu 6 kí tự', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }

        if (!isMatch(password, cf_password)) {
            setLoadingBackDrop(false);
            return enqueueSnackbar('Mật khẩu nhập lại không khớp', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }

        try {
            const createdAt = new Date().toISOString();
            socket.emit('createNotification', {
                name,
                action: 'register',
                createdAt,
            });

            const res = await axios.post('/user/register', {
                name,
                email,
                password,
            });

            enqueueSnackbar(res.data.msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });

            setLoadingBackDrop(false);
            setUser({ ...user });
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
                    Đăng ký
                </Typography>

                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            onChange={handleChangeInput}
                            value={name}
                            name="name"
                            id="standard-basic"
                            label="Nhập tên"
                            variant="standard"
                        />
                    </div>

                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            onChange={handleChangeInput}
                            value={email}
                            name="email"
                            id="standard-basic"
                            label="Địa chỉ email"
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

                    <div>
                        <TextField
                            style={{ width: '100%' }}
                            id="standard-password-input"
                            label="Xác thực mật khẩu"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            value={cf_password}
                            name="cf_password"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <Button style={{ width: '100%', margin: '10px 0' }} type="submit" variant="contained">
                        Đăng ký
                    </Button>
                </form>

                <p>
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </Card>
        </div>
    );
}

export default Register;
