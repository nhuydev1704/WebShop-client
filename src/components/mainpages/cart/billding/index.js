import React from 'react';
import { get, split } from 'lodash';
import './style.css';
import logo from './logo.jpg';
import { numberWithCommas } from '../../../../commonFunction/NumberFortmat';

// import NumberFormat from 'react-number-format';

const ReceiptBill = React.forwardRef(({ cart, userr, total }, ref) => {
    const getDateTime = new Date();

    return (
        <div className="wrapper-container" ref={ref}>
            <div className="containerLetter" style={{ paddingTop: 20 }}>
                <div className="form">
                    <div className="form-top">
                        <div className="form-top_left">
                            <h2>
                                <img src={logo} />
                                <span>ShopVipPro</span>
                            </h2>
                            <p>Mua sắm trong tầm tay của bạn</p>
                        </div>
                        <div className="form-top_right">
                            <h4>Mẫu số 01-TT</h4>
                            <p>(Ban hành theo TT số: 133/2016/TT/BTC ngày 26/08/2016 của Bộ trưởng BTC)</p>
                        </div>
                    </div>
                    <div className="form-body">
                        <div className="form-body_title">
                            <h2>HÓA ĐƠN</h2>
                            <h4>
                                {' '}
                                Ngày {getDateTime.getDay()} tháng {getDateTime.getMonth()} năm{' '}
                                {getDateTime.getFullYear()}
                            </h4>
                        </div>
                        <div className="infor_form">
                            <div className="list_infor">
                                <ul>
                                    <li>
                                        <h4>Số : 11</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="form-type">
                            <div className="form_type-item">
                                <h4>Họ và tên khách hàng: {get(userr, 'name')}</h4>
                            </div>
                            <div className="form_type-item">
                                <h4>Địa chỉ: {get(userr, 'address')}</h4>
                            </div>
                            <div className="form_type-item">
                                <h4>Số điện thoại: {get(userr, 'phone')}</h4>
                            </div>
                            <div className="form_type-item">
                                <div className="amount">
                                    {' '}
                                    <h4>Số tiền: {numberWithCommas(total)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="panel panel-default invoice" id="invoice">
                                    <div className="panel-body">
                                        <div className="row table-row">
                                            <table className="table table-striped" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: '5%' }}>
                                                            STT
                                                        </th>
                                                        <th style={{ width: '50%' }}>Sản phẩm</th>
                                                        <th className="text-right" style={{ width: '15%' }}>
                                                            Số lượng
                                                        </th>
                                                        <th className="text-right" style={{ width: '15%' }}>
                                                            Giá
                                                        </th>
                                                        <th className="text-right" style={{ width: '15%' }}>
                                                            Tổng giá
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart &&
                                                        cart.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{item.title}</td>
                                                                <td className="text-right">{item.quantity}</td>
                                                                <td className="text-right">
                                                                    {numberWithCommas(item.price)}
                                                                </td>
                                                                <td className="text-right">
                                                                    {numberWithCommas(item.price * item.quantity)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-6 margintop"></div>
                                            <div className="col-xs-6 text-right pull-right invoice-total">
                                                <div className="date_created">
                                                    <h4>
                                                        {' '}
                                                        Hà Nội, Ngày {getDateTime.getDay()} tháng{' '}
                                                        {getDateTime.getMonth()} năm {getDateTime.getFullYear()}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="signature">
                            <div className="signature-item">
                                <div>
                                    <h4>Giám đốc</h4>
                                    <p>(Ký, họ tên, đóng dấu)</p>
                                </div>
                                <span>Nguyễn Như Ý</span>
                            </div>
                            <div className="signature-item">
                                <div>
                                    <h4>Kế toán trưởng</h4>
                                    <p>(Ký, họ tên)</p>
                                </div>
                                <span>Nguyễn Như Ý</span>
                            </div>
                            <div className="signature-item">
                                <div>
                                    <h4>Người nộp tiền</h4>
                                    <p>(Ký, họ tên)</p>
                                </div>
                                <span>Nguyễn Như Ý</span>
                            </div>
                            <div className="signature-item">
                                <div>
                                    <h4>Người lập phiếu</h4>
                                    <p>(Ký, họ tên)</p>
                                </div>
                                <span>Nguyễn Như Ý</span>
                            </div>
                            <div className="signature-item">
                                <div>
                                    <h4>Thủ quỹ</h4>
                                    <p>(Ký, họ tên)</p>
                                </div>
                                <span>Nguyễn Như Ý</span>
                            </div>
                        </div>
                        <div className="confirm">
                            {/* <div className="form_type-item">
                                <h4>Đã nhận đủ số tiền (Viết bằng chữ): </h4>
                                <p className="dottedLines"></p>
                            </div>
                            <div className="form_type-item">
                                <h4>+ Tỷ giá ngoại tệ(vàng bạc, đá quý): </h4>
                                <p className="dottedLines"></p>
                            </div>
                            <div className="form_type-item">
                                <h4>+ Số tiền quy đổi: </h4>
                                <p className="dottedLines"></p>
                            </div> */}
                            <div className="form_type-item">
                                <h4>(Cảm ơn bạn đã chọn sản phẩm của chúng tôi)</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ReceiptBill;
