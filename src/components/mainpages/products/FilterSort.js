import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useContext } from 'react';
import { ContextHook } from '../../../ContextHook';

const FilterSort = () => {
    const state = useContext(ContextHook);
    const [sort, setSort] = state.productsAPI.sort;

    const handleChange = async (e) => {
        if (e.target.value === '') {
            setSort('');
        } else {
            setSort(e.target.value);
        }
    };

    return (
        <FormControl component="fieldset">
            {/* <FormLabel style={{ color: '#333' }} component="legend">
                Sắp xếp theo
            </FormLabel> */}
            <RadioGroup onChange={handleChange} value={sort} row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="" control={<Radio />} label="Mới nhất" />
                <FormControlLabel value="sort=oldest" control={<Radio />} label="Cũ nhất" />
                <FormControlLabel value="sort=-price" control={<Radio />} label="Giá: Cao-Thấp" />
                <FormControlLabel value="sort=price" control={<Radio />} label="Giá: Thấp-Cao" />
            </RadioGroup>
        </FormControl>
    );
};

export default FilterSort;
