import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextHook } from '../../../ContextHook';
import Loading from '../ultils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Slider, InputNumber, Row, Col, Button, Upload } from 'antd';
import { Input } from 'antd';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UploadOutlined } from '@ant-design/icons';
import { Button as ButtonMUI } from '@mui/material';
import { useSnackbar } from 'notistack';

const { TextArea } = Input;
const initialState = {
    product_id: '',
    title: '',
    price: 100000,
    description: '',
    category: '',
    _id: '',
};

function CreateProduct() {
    const { enqueueSnackbar } = useSnackbar();

    const state = useContext(ContextHook);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    const [images, setImages] = useState(false);

    const handleChange = (newValue) => {
        setProduct({ ...product, price: newValue });
    };

    const history = useHistory();
    const param = useParams();

    const [products] = state.productsAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            products.forEach((product) => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            });
        } else {
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products]);

    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    const handleUpfile = async (file) => {
        setLoadingBackDrop(true);
        try {
            if (!isAdmin) {
                setLoadingBackDrop(false);
                return enqueueSnackbar('Bạn không phải Admin', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }

            if (!file) {
                setLoadingBackDrop(false);
                return enqueueSnackbar('Tập tin không tồn tại', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }

            if (file.size > 1024 * 1024) {
                setLoadingBackDrop(false);
                return enqueueSnackbar('Kích cỡ quá lớn', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                setLoadingBackDrop(false);
                return enqueueSnackbar('Tập tin không đúng định dạng', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/upload', formData, {
                headers: { 'context-type': 'multipart/form-data', Authorization: token },
            });

            setLoadingBackDrop(false);
            setImages(res.data);
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

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleDestroy = async () => {
        setLoadingBackDrop(true);

        try {
            if (!isAdmin) {
                setLoadingBackDrop(false);
                return enqueueSnackbar('Bạn không phải Admin', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }

            await axios.post(
                '/api/destroy',
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                }
            );
            setLoadingBackDrop(false);

            setImages(false);
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

    const onSubmit = async (e) => {
        setLoadingBackDrop(true);

        e.preventDefault();
        try {
            if (!isAdmin) {
                setLoadingBackDrop(false);

                return enqueueSnackbar('Bạn không phải Admin', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
            if (!images) {
                setLoadingBackDrop(false);

                return enqueueSnackbar('Chưa chọn ảnh', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }

            if (onEdit) {
                const res = await axios.put(
                    `/api/products/${product._id}`,
                    { ...product, images },
                    {
                        headers: { Authorization: token },
                    }
                );
                enqueueSnackbar(res.data.msg, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setLoadingBackDrop(false);
            } else {
                const res = await axios.post(
                    '/api/products',
                    { ...product, images },
                    {
                        headers: { Authorization: token },
                    }
                );
                enqueueSnackbar(res.data.msg, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setLoadingBackDrop(false);
            }

            setCallback(!callback);

            history.push('/');
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

    const styleUpload = {
        display: images ? 'block' : 'none',
    };

    const propsUpload = {
        name: 'file',
        action: '',
        maxCount: 1,
        multiple: false,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                const fileList = [...info.fileList].slice(-1);

                if (fileList[0]) {
                    handleUpfile(fileList[0]?.originFileObj);
                } else {
                    handleDestroy();
                }
            }
        },
    };

    return (
        <Card className="create_product">
            <Row gutter={[36, 12]} style={{ flexDirection: 'row-reverse' }}>
                <Col xs={24} sm={24} md={12}>
                    <Row justify="center" align="middle">
                        <Col
                            span={20}
                            style={{
                                border: '1px solid #ccc',
                                height: '250px',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                            }}
                        >
                            {product.title && (
                                <>
                                    <div id="file_img" style={styleUpload}>
                                        <img src={images ? images.url : ''} alt="" />
                                        {onEdit && <span onClick={handleDestroy}>X</span>}
                                    </div>
                                    <div className="product_box">
                                        <h2 title={product.title}>{product.title}</h2>
                                        <span className="price_product">
                                            {product.price.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </div>
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <form onSubmit={onSubmit}>
                        <Row gutter={[24, 24]} align="middle" justify="center">
                            <Col xs={24} sm={24} md={24} xl={12} lg={12}>
                                <TextField
                                    style={{ width: '100%' }}
                                    onChange={handleChangeInput}
                                    value={product.product_id}
                                    name="product_id"
                                    id="standard-basic"
                                    label="Mã sản phẩm"
                                    variant="standard"
                                    disabled={onEdit}
                                    required
                                />
                            </Col>

                            <Col xs={24} sm={24} md={24} xl={12} lg={12}>
                                <TextField
                                    style={{ width: '100%' }}
                                    onChange={handleChangeInput}
                                    value={product.title}
                                    name="title"
                                    id="standard-basic"
                                    label="Tiêu đề"
                                    variant="standard"
                                    required
                                />
                            </Col>

                            <Col xs={24} sm={24} md={24} xl={12} lg={12}>
                                <Row align="middle" style={{ marginTop: '16px' }}>
                                    {/* <Col span={2}> Giá</Col> */}
                                    <Col span={18}>
                                        <Slider
                                            min={10000}
                                            max={50000000}
                                            onChange={handleChange}
                                            value={typeof product.price === 'number' ? product.price : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={10000}
                                            max={50000000}
                                            value={product.price}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={12}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: '96.5%' }}>
                                    <InputLabel id="demo-simple-select-filled-label">Danh mục</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        autoWidth
                                        value={product.category}
                                        onChange={handleChangeInput}
                                        name="category"
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col span={24}>
                                <TextArea
                                    name="description"
                                    required
                                    placeholder="Nhập mô tả"
                                    value={product.description}
                                    onChange={handleChangeInput}
                                    rows={4}
                                />
                            </Col>
                            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Upload
                                    style={{ width: '100%' }}
                                    {...propsUpload}
                                    accept="image/*"
                                    beforeUpload={() => false}
                                >
                                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                                        Chọn ảnh bìa
                                    </Button>
                                </Upload>
                            </Col>
                            <ButtonMUI type="submit" variant="contained">
                                {onEdit ? 'Cập Nhật' : 'Thêm'}
                            </ButtonMUI>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Card>
    );
}

export default CreateProduct;
