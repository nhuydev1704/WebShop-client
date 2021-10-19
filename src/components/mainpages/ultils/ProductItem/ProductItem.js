import { Grid } from '@mui/material';
import React from 'react';
import Rating from '../../detailProduct/rating/Rating';
import BtnRender from './BtnRender';

function ProductItem({ product, isAdmin, deleteProduct, handleChangeInput }) {
    return (
        <>
            {isAdmin && (
                <input type="checkbox" checked={product.checked} onChange={() => handleChangeInput(product._id)} />
            )}
            <img className="img_product" src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <div className="info_product">
                    <Rating props={product} />
                    <span>Đã bán: {product.sold}</span>
                </div>
                <span className="price_product">
                    {product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </span>
            </div>
            {isAdmin && <BtnRender product={product} deleteProduct={deleteProduct} />}
        </>
    );
}

export default ProductItem;
