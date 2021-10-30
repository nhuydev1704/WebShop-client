import { Col, Image, Input, Row, Popconfirm, message, Button } from 'antd';
import React, { memo, useState } from 'react';
import { numberWithCommas } from '../../../commonFunction/NumberFortmat';
import { DeleteOutlined } from '@ant-design/icons';
import IconButton from '@mui/material/IconButton';

const CartItem = ({ product, decrement, increment, updateQuantity, confirm }) => {
    const [value, setValue] = useState(0);
    function onChange(e) {
        if (e.target.value <= 0) return;
        setValue(e.target.value);
        updateQuantity(product._id, e.target.value);
    }
    return (
        <Row align="middle">
            <Col span={1}></Col>
            <Col span={11}>
                <Row>
                    <Image style={{ objectFit: 'cover' }} width={130} height={74} src={product.images.url} />
                    <div>
                        <h2 className="cart_item-title-detail">{product.title}</h2>
                    </div>
                </Row>
            </Col>
            <Col span={4}>
                <span className="cart_item-price">{numberWithCommas(product.price)}đ</span>
            </Col>

            <Col className="column_header-card" span={4}>
                <div className="amount">
                    <Button size="small" onClick={() => decrement(product._id)}>
                        -
                    </Button>
                    <Input
                        style={{ width: '40px', paddingLeft: '16px' }}
                        size="small"
                        value={product.quantity}
                        onChange={onChange}
                    />

                    <Button size="small" onClick={() => increment(product._id)}>
                        +
                    </Button>
                </div>
            </Col>
            <Col className="column_header-card" span={3}>
                <span className="cart_item-price">{numberWithCommas(product.price * product.quantity)}đ</span>
            </Col>
            <Col className="column_header-card" span={1}>
                <Popconfirm
                    placement="top"
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={() => confirm(product._id)}
                    okText="Đồng ý"
                    cancelText="Không"
                >
                    <IconButton size="small" aria-label="upload picture" component="span">
                        <DeleteOutlined />
                    </IconButton>
                </Popconfirm>
            </Col>
        </Row>
    );
};

export default memo(CartItem);
