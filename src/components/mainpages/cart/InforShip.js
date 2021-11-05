import { Button, Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { numberWithCommas } from '../../../commonFunction/NumberFortmat';
import PaypalButton from './PaypalButton';

const InforShip = ({ tranSuccess, total }) => {
    return (
        <Row className="total">
            <Col span={24}>
                <Card size="small">
                    <h3>Total: {numberWithCommas(parseInt(total).toFixed(2))}đ</h3>
                </Card>
            </Col>
            <Col span={24}>
                <Card size="small">
                    <div className="payment-info">
                        <span>Tạm tính</span>
                        <span>{numberWithCommas(parseInt(total).toFixed(2))}đ</span>
                    </div>
                    <div className="payment-info">
                        <span>Giảm giá</span>
                        <span>0đ</span>
                    </div>
                    <Divider style={{ margin: '10px 0', marginTop: '20px' }} />
                    <div className="payment-total">
                        <span>Tổng cộng</span>
                        <span>{numberWithCommas(parseInt(total).toFixed(2))}đ</span>
                    </div>
                    <span className="payment-VAT">(Đã bao gồm VAT nếu có)</span>
                </Card>
                <div style={{ width: '100%', marginTop: '10px' }}>
                    <PaypalButton total={parseInt(total / 23000).toFixed(2)} tranSuccess={tranSuccess} />
                </div>
            </Col>
        </Row>
    );
};

export default React.memo(InforShip);
