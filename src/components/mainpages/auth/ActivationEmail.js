import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ActivationEmail() {
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();

    const { activation_token } = useParams();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', { activation_token });
                    await enqueueSnackbar(res.data.msg, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                    history.push('/login');
                } catch (err) {
                    err.response.data.msg &&
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
    }, [activation_token]);

    return (
        <div className="active_page">
            {/* {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} */}
        </div>
    );
}

export default ActivationEmail;
