import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';
import { isLength, isMatch } from '../ultils/validation/Validation';

const initialState = {
    password: '',
    cf_password: '',
};

function ResetPassword() {
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState(initialState);
    const { token } = useParams();

    const state = useContext(ContextHook);
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    const { password, cf_password } = data;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '' });
    };

    const handleResetPass = async () => {
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
            const res = await axios.post(
                '/user/reset',
                { password },
                {
                    headers: { Authorization: token },
                }
            );

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
                    Đổi mật khẩu
                </Typography>

                <div className="row">
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
                    <Button onClick={handleResetPass} style={{ width: '100%', margin: '10px 0' }} variant="contained">
                        Đổi mật khẩu
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default ResetPassword;
