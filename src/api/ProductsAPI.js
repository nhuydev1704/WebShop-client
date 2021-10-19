import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    const [loadingProduct, setLoadingProduct] = useState(false);

    useEffect(() => {
        setLoadingProduct(true);
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page * 8}&${category}&${sort}&title[regex]=${search}`);
            if (res.status === 200) {
                setProducts(res.data.products);
                setResult(res.data.result);
                setLoadingProduct(false);
            }
        };
        getProducts();
    }, [callback, category, sort, search, page]);

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        loading: [loadingProduct, setLoadingProduct],
    };
}

export default ProductsAPI;
