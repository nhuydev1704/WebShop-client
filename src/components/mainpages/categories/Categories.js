import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Button as BtnAntd, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { ContextHook } from '../../../ContextHook';

function Categories() {
    const { enqueueSnackbar } = useSnackbar();

    const state = useContext(ContextHook);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [loadingBackDrop, setLoadingBackDrop] = state.backdrop;

    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');

    const [selectedRowKeys, setSelectedRowKeys] = useState();

    const onSubmit = async (e) => {
        setLoadingBackDrop(true);
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(
                    `/api/category/${id}`,
                    { name: category },
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
            } else {
                const res = await axios.post(
                    '/api/category',
                    { name: category },
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
            }
            setSelectedRowKeys([]);
            setOnEdit(false);
            setCategory('');
            setCallback(!callback);
            setLoadingBackDrop(false);
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

    const deleteCategory = async () => {
        setLoadingBackDrop(true);

        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: token },
            });
            enqueueSnackbar(res.data.msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setSelectedRowKeys([]);
            setOnEdit(false);
            setCategory('');
            setCallback(!callback);
            setLoadingBackDrop(false);
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
    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setID(selectedRows[0]._id);
            setCategory(selectedRows[0].name);
            setOnEdit(true);
        },
    };

    const handleClearRow = () => {
        setSelectedRowKeys([]);
        setCategory('');
        setID('');
        setOnEdit(false);
    };

    return (
        <div className="categories">
            {onEdit ? (
                <BtnAntd type="primary" onClick={handleClearRow}>
                    Hủy thao tác
                </BtnAntd>
            ) : (
                <div></div>
            )}
            <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                <TextField
                    style={{ width: '100%' }}
                    name="category"
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    id="standard-basic"
                    label="Danh mục sản phẩm"
                    variant="standard"
                />
                <Button variant="contained" type="submit" style={{ marginTop: '16px', marginLeft: '6px' }}>
                    {onEdit ? 'Sửa' : 'Thêm'}
                </Button>
                {onEdit && (
                    <div>
                        <Button
                            size="medium"
                            color="secondary"
                            onClick={deleteCategory}
                            variant="contained"
                            style={{ margin: '0 6px', marginTop: '16px' }}
                        >
                            Xóa
                        </Button>
                    </div>
                )}
            </form>

            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                size="middle"
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={categories}
                style={{ marginTop: '20px', width: '500px' }}
                pagination={{
                    defaultPageSize: 4,
                }}
            />
        </div>
    );
}

export default Categories;
