import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextHook } from '../../../../ContextHook';

function BtnRender({ product, deleteProduct }) {
    const state = useContext(ContextHook);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className="row_btn">
            {isAdmin ? (
                <div className="button_ud">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => deleteProduct(product._id, product.images.public_id)}
                    >
                        Xóa
                    </Button>
                    <Link to={`/edit_product/${product._id}`}>
                        <Button variant="contained">Sửa</Button>
                    </Link>
                </div>
            ) : (
                <>
                    <Button onClick={() => addCart(product)}>Mua</Button>
                    <Link to={`/detail/${product._id}`}>
                        <Button>Xem</Button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default BtnRender;
