import React, { useContext } from 'react';
import { ContextHook } from '../../../ContextHook';

function LoadMore() {
    const state = useContext(ContextHook);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="load_more">
            {result < page * 8 ? '' : <button onClick={() => setPage(page + 1)}>Tải thêm</button>}
        </div>
    );
}

export default LoadMore;
