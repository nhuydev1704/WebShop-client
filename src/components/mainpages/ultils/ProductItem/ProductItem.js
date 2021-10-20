import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import Rating from '../../detailProduct/rating/Rating';
import BtnRender from './BtnRender';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function ProductItem({ product, isAdmin, deleteProduct, handleChangeInput }) {
    return (
        <>
            {/* <input
                    className="checkbox_product"
                    type="checkbox"
                    
                /> */}
            {isAdmin && (
                <Checkbox
                    className="checkbox_product"
                    checked={product.checked}
                    onChange={() => handleChangeInput(product._id)}
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                />
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
