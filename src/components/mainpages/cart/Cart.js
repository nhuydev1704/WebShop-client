import { Card, Col, Image, Row } from 'antd';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ContextHook } from '../../../ContextHook';
import PaypalButton from './PaypalButton';
import { DeleteOutlined } from '@ant-design/icons';
import IconButton from '@mui/material/IconButton';
import CartItem from './CartItem';
import { useSnackbar } from 'notistack';
import InforShip from './InforShip';

function Cart() {
    const { enqueueSnackbar } = useSnackbar();

    const state = useContext(ContextHook);
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    const [token] = state.token;
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;
    const [cartCategory, setCartCategory] = useState([]);

    const addToCart = async (cart) => {
        await axios.patch(
            '/user/addcart',
            { cart },
            {
                headers: { Authorization: token },
            }
        );
    };

    useEffect(() => {
        let cartCategories = [];
        cart.forEach((item) => {
            cartCategories.push(item.category_name);
        });

        setCartCategory([...new Set(cartCategories)]);

        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);

            setTotal(total);
        };

        getTotal();
    }, [cart]);

    const increment = useCallback(
        (id) => {
            cart.forEach((item) => {
                if (item._id === id) {
                    item.quantity += 1;
                }
            });

            setCart([...cart]);
            addToCart(cart);
        },
        [cart]
    );

    const updateQuantity = useCallback(
        (id, value) => {
            cart.forEach((item) => {
                if (item._id === id) {
                    item.quantity = value;
                }
            });

            setCart([...cart]);
            addToCart(cart);
        },
        [cart]
    );

    const decrement = useCallback(
        (id) => {
            cart.forEach((item) => {
                if (item._id === id) {
                    item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
                }
            });

            setCart([...cart]);
            addToCart(cart);
        },
        [cart]
    );

    const confirm = useCallback(
        (id) => {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });

            setCart([...cart]);
            addToCart(cart);
        },
        [cart]
    );

    const tranSuccess = async (payment) => {
        setLoadingBackDrop(true);
        const { paymentID, address } = payment;
        const priceCheckout = total;

        try {
            await axios.post(
                './api/payment',
                { cart, paymentID, address, priceCheckout },
                {
                    headers: { Authorization: token },
                }
            );

            setCart([]);
            addToCart([]);
            setLoadingBackDrop(false);
            enqueueSnackbar('Đặt hàng thành công', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
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

    if (cart.length === 0) {
        setLoadingBackDrop(true);
        return <div></div>;
    } else {
        setLoadingBackDrop(false);
    }
    return (
        <div style={{ marginTop: '100px' }}>
            <h2 className="title_card">Giỏ hàng</h2>
            <Row gutter={[16, 12]}>
                <Col span={18}>
                    <Row gutter={[0, 12]}>
                        <Col span={24}>
                            <Card size="small">
                                <Row align="middle">
                                    <Col
                                        className="column_header-card"
                                        span={12}
                                    >{`Tất cả (${cart.length} sản phẩm)`}</Col>
                                    <Col className="column_header-card" span={4}>
                                        Đơn giá
                                    </Col>
                                    <Col className="column_header-card" span={4}>
                                        Số lượng
                                    </Col>
                                    <Col className="column_header-card" span={3}>
                                        Thành tiền
                                    </Col>
                                    <Col className="column_header-card" span={1}>
                                        <IconButton size="small" aria-label="upload picture" component="span">
                                            <DeleteOutlined />
                                        </IconButton>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[0, 12]}>
                                {cartCategory.map((item) => (
                                    <Col key={item} span={24}>
                                        <Card size="small">
                                            <h2 className="cart_item-title">{item}</h2>
                                            {cart
                                                .filter((product1) => product1.category_name === item)
                                                .map((product) => (
                                                    <div key={product._id} style={{ marginBottom: '30px' }}>
                                                        <CartItem
                                                            product={product}
                                                            decrement={decrement}
                                                            increment={increment}
                                                            updateQuantity={updateQuantity}
                                                            confirm={confirm}
                                                        />
                                                    </div>
                                                ))}
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    {/* <div className="total">
                        <h3>Total: ${parseInt(total / 23000).toFixed(2)}</h3>
                        <div>
                            <PaypalButton total={parseInt(total / 23000).toFixed(2)} tranSuccess={tranSuccess} />
                        </div>
                    </div> */}
                    <InforShip tranSuccess={tranSuccess} total={total} />
                </Col>
            </Row>
        </div>
    );
}

export default Cart;
