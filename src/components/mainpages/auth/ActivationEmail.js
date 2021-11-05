import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';

function ActivationEmail() {
    const state = useContext(ContextHook);
    const socket = state.socket;

    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();

    const { activation_token } = useParams();

    useEffect(() => {
        if (activation_token && socket) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', { activation_token });
                    enqueueSnackbar(res.data.msg, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                    socket.emit('createNotification', {
                        name: res.data.newUser.name,
                        action: 'register',
                        createdAt: new Date(),
                    });

                    history.push('/login');
                } catch (err) {
                    err?.response?.data?.msg &&
                        enqueueSnackbar(err.response.data.msg, {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        });
                }
            };
            activationEmail();
        }
    }, [activation_token, socket]);

    return (
        <div className="active_page">
            {/* {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} */}
        </div>
    );
}

export default ActivationEmail;
