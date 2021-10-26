import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ContextHook } from '../../../ContextHook';
import Load from '../detailProduct/loading.gif';
import { getData } from '../ultils/FetchData';
import ProductItem from '../ultils/ProductItem/ProductItem';
import CommentItem from './commentItem/CommentItem';
import FormInput from './formInput/FormInput';
import Rating from './rating/Rating';
import { Col, Row } from 'antd';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Slider from 'react-slick';

function DetailProduct() {
    const { id } = useParams();
    const params = useParams();
    const state = useContext(ContextHook);
    const [products] = state.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);
    const addCart = state.userAPI.addCart;
    const socket = state.socket;
    const [page, setPage] = state.productsAPI.page;

    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [pageComment] = useState(1);

    useEffect(() => {
        if (params.id) {
            products.forEach((product) => {
                if (product._id === params.id) setDetailProduct(product);
            });
        }
    }, [params.id, products]);

    useEffect(() => {
        setLoading(true);
        getData(`/api/comments/${id}?limit=${pageComment * 6}`)
            .then((res) => {
                setComments((r) => (r = res.data.comments));
                setLoading(false);
            })
            .catch((err) => console.log(err.response.data.msg));
    }, [id, pageComment]);

    //realtime

    useEffect(() => {
        setPage(10);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', id);
        }
    }, [socket, id]);

    useEffect(() => {
        if (socket) {
            socket.on('sendCommentToClient', (msg) => {
                setComments([msg, ...comments]);
            });

            return () => socket.off('sendCommentToClient');
        }
    }, [socket, comments]);

    // Reply Comments
    useEffect(() => {
        if (socket) {
            socket.on('sendReplyCommentToClient', (msg) => {
                const newArr = [...comments];

                newArr.forEach((cm) => {
                    if (cm._id === msg._id) {
                        cm.reply = msg.reply;
                    }
                });

                setComments(newArr);
            });

            return () => socket.off('sendReplyCommentToClient');
        }
    }, [socket, comments]);

    const prodcutDt = products.filter((item) => item.category === detailProduct.category);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: prodcutDt.length >= 4 ? 4 : prodcutDt.length,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (detailProduct.length === 0) return null;
    return (
        <div>
            <Card className="detail">
                <Row justify="space-between" align="center">
                    <Col span={9}>
                        <img className="img_product-detail" src={detailProduct.images.url} alt="anhdep" />
                    </Col>
                    <Col span={15} className="box-detail">
                        <h2 style={{ textTransform: 'capitalize' }}>{detailProduct.title}</h2>

                        <div className="rating_review-sold">
                            <Rating props={detailProduct} />
                            <span className="review_sold review_sold-sold">
                                <span style={{ marginRight: '6px', color: '#222', borderBottom: '1px solid' }}>
                                    {detailProduct.numReviews}
                                </span>{' '}
                                <span style={{ textTransform: 'capitalize' }}>đánh giá</span>
                            </span>
                            <span className="review_sold">
                                <span style={{ marginRight: '6px', color: '#222' }}>{detailProduct.sold}</span> Đã bán
                            </span>
                        </div>
                        <span className="product_price-detail">
                            Giá: {detailProduct.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </span>
                        <p style={{ marginTop: '10px' }}>{detailProduct.description}</p>

                        <Link to="/cart" onClick={() => addCart(detailProduct)}>
                            <Button variant="contained">Mua ngay</Button>
                        </Link>
                    </Col>
                </Row>
            </Card>
            {prodcutDt.length > 1 && (
                <Card style={{ padding: '10px 0', marginBottom: '40px' }}>
                    <h2 className="repleated-product">Sản phẩm tương tự</h2>
                    <div className="products" style={{ width: '100%' }}>
                        <Slider {...settings} style={{ width: '100%' }}>
                            {prodcutDt.map((product) => {
                                {
                                    /* return product.category === detailProduct.category ? ( */
                                }
                                return (
                                    <div key={product._id} className="item_product item_product-detail">
                                        <Link to={`/detail/${product._id}`}>
                                            <ProductItem isDetail product={product} />
                                        </Link>
                                    </div>
                                );
                                {
                                    /* ) : null; */
                                }
                            })}
                        </Slider>
                    </div>
                </Card>
            )}
            <Card className="comments">
                <h2>Bình luận và đánh giá</h2>

                <div className="reviews">
                    <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                    <label htmlFor="rd-5" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                    <label htmlFor="rd-4" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                    <label htmlFor="rd-3" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                    <label htmlFor="rd-2" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                    <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>

                <FormInput id={id} socket={socket} rating={rating} />

                <div className="comments_list">
                    {comments.map((comment) => (
                        <CommentItem key={comment._id} comment={comment} socket={socket} />
                    ))}
                </div>
            </Card>
            {/* {loading && (
                <div className="loading">
                    <img src={Load} alt="" />
                </div>
            )} */}
            {/* <button ref={pageComment} style={{opacity: 0}}>Load more</button> */}
        </div>
    );
}

export default DetailProduct;
