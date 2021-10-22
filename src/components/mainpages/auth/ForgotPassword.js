import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { ContextHook } from '../../../ContextHook';
import { isEmail } from '../ultils/validation/Validation';

const initialState = {
    email: '',
};

function ForgotPassword() {
    const { enqueueSnackbar } = useSnackbar();

    const state = useContext(ContextHook);
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    const [data, setData] = useState(initialState);

    const { email } = data;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const forgotPassword = async () => {
        setLoadingBackDrop(true);

        if (!isEmail(email)) {
            setLoadingBackDrop(false);
            return enqueueSnackbar('Email không được để trống', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }

        try {
            const res = await axios.post('/user/forgot', { email });
            enqueueSnackbar(res.data.msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setLoadingBackDrop(false);
            return setData({ ...data });
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
                    Quên mật khẩu
                </Typography>

                <div className="row">
                    <TextField
                        style={{ width: '100%' }}
                        onChange={handleChangeInput}
                        value={email}
                        name="email"
                        id="standard-basic"
                        label="Địa chỉ email"
                        variant="standard"
                    />
                    <Button onClick={forgotPassword} style={{ width: '100%', margin: '10px 0' }} variant="contained">
                        Xác nhận
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default ForgotPassword;
