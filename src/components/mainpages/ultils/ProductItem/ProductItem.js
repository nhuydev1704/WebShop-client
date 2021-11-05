import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../detailProduct/rating/Rating';
import BtnRender from './BtnRender';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import IconButton from '@mui/material/IconButton';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function ProductItem({ product, isAdmin, deleteProduct, handleChangeInput, isDetail, addCart }) {
    return (
        <div className={isDetail ? 'product_isdetail' : ''}>
            {/* <input
                    className="checkbox_product"
                    type="checkbox"
                    
                /> */}
            {isAdmin ? (
                <Checkbox
                    className="checkbox_product"
                    checked={product.checked}
                    onChange={() => handleChangeInput(product._id)}
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                />
            ) : (
                <IconButton
                    onClick={() => addCart(product)}
                    className="icon_add-cart"
                    color="primary"
                    aria-label="add to shopping cart"
                >
                    <AddShoppingCartSharpIcon />
                </IconButton>
            )}
            <Link to={`/detail/${product._id}`}>
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
            </Link>

            {isAdmin && <BtnRender product={product} deleteProduct={deleteProduct} />}
        </div>
    );
}

export default React.memo(ProductItem);
