import {Table} from '../ui-kit';
import EditProduct from './operations/EditProduct';
import DeleteProduct from './operations/DeleteProduct';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState, useMemo } from 'react';
import {Input, RangeSlider} from '../ui-kit';
import styles from "./Product.module.css";
import { PRODUCT_TYPES } from './config'; 
import { SortAscending, SortDescending } from 'tabler-icons-react';
import _ from 'lodash-es';


const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}

const initialSortingState = {
    fields: [PRODUCT_TYPES.NAME, PRODUCT_TYPES.PRICE, PRODUCT_TYPES.QUANTITY],
    orders: [SORT_ORDER.ASC, SORT_ORDER.ASC, SORT_ORDER.ASC],
}

const Products = ()=> {
    const products = useSelector((state)=> state.products.value);

    const [filterPrice, setFilterPrice] = useState(null);
    const [filterName, setFilterName] = useState(null);
    const [filterQuantity, setFilterQuantity] = useState(null);

    const [processedData, setProcessedData]= useState([]);

    const [sorting, setSorting] = useState(initialSortingState); 

    const filter = useCallback((data)=> {
        const conditionFuncs = [];
        
        if(filterName !== null) {
            const nameConditionFn = (product) => product.name.toLowerCase().includes(filterName.toLowerCase());
            conditionFuncs.push(nameConditionFn);
        }
        if(filterPrice !== null) {
            const priceConditionFn = (product) => (product.price >= filterPrice.min && product.price <= filterPrice.max);
            conditionFuncs.push(priceConditionFn);
        }
        if(filterQuantity !== null) {
            const quantityConditionFn = (product) => product.quantity === filterQuantity;
            conditionFuncs.push(quantityConditionFn);
        }

        let filtered = [];
        for(let product of data) {
            let filterPassed = true;
            conditionFuncs.forEach(conditionFn => {
                if(!conditionFn(product)) {
                    filterPassed = false;
                }
            });
            if(filterPassed) {
                filtered.push(product);    
            }
        }
        return filtered;
    }, [filterName, filterQuantity, filterPrice]); 
    
    const filteredData = useMemo(() => filter(products), [products, filter]);


    useEffect(() => {
        // multiple fields ordering
        const sortedData =  _.orderBy(filteredData, sorting.fields, sorting.orders);
        setProcessedData(sortedData);
    }, [filteredData, sorting]);

    const columns = useMemo(() => {
        const sortIcon = (order, props) => {
            return order === SORT_ORDER.ASC ? <SortAscending {...props}/> : <SortDescending {...props}/>
        };

        const getFieldOrder = (type) => {
            const index = sorting.fields.indexOf(type);
            if(index !== -1) {
                return sorting.orders[index];
            }
            return SORT_ORDER.DESC;
        };

        const handleSortChange = (type) => {
            const fields = [...sorting.fields];
            const orders = [...sorting.orders];
    
            const index = fields.indexOf(type);
            if(index !== -1) {
                fields.splice(index, 1, type);
                orders.splice(index, 1, orders[index] === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC)
            }
            else {
                fields.push(type);
                orders.push(SORT_ORDER.DESC);
            }
            
            setSorting({ fields, orders });
        };

        return [
        {
            id: PRODUCT_TYPES.NAME,
            renderer: () => (
            <div className={styles.headerCell} title={getFieldOrder(PRODUCT_TYPES.NAME)}>
                <span>Name</span>
                {sortIcon(getFieldOrder(PRODUCT_TYPES.NAME), {
                    size: 26,
                    strokeWidth: 2,
                    color: '#407dbf',
                    className: styles.sortIcon,
                    onClick: () => handleSortChange(PRODUCT_TYPES.NAME),
                })}
            </div> 
        )},
        {
            id: PRODUCT_TYPES.PRICE,
            renderer: () => (
            <div className={styles.headerCell} title={getFieldOrder(PRODUCT_TYPES.PRICE)}>
                <span>Price</span>
                {sortIcon(getFieldOrder(PRODUCT_TYPES.PRICE), {
                    size: 26,
                    strokeWidth: 2,
                    color: '#407dbf',
                    className: styles.sortIcon,
                    onClick: () => handleSortChange(PRODUCT_TYPES.PRICE)
                })}
            </div>
            
        )},
        {
            id: PRODUCT_TYPES.QUANTITY,
            renderer: () => (
            <div className={styles.headerCell} title={getFieldOrder(PRODUCT_TYPES.QUANTITY)}>
                <span>Quantity</span>
                {sortIcon(getFieldOrder(PRODUCT_TYPES.QUANTITY), {
                    size: 26,
                    strokeWidth: 2,
                    color: '#407dbf',
                    className: styles.sortIcon,
                    onClick: () => handleSortChange(PRODUCT_TYPES.QUANTITY)
                })}
            </div>
        )},
        {
            id: 'Actions',
        }
    ]},[sorting.fields, sorting.orders]);

    return (
        <>
            <div className={styles.filterContainer}>
                <Input 
                    className={styles.nameFilter}
                    onChange={setFilterName}
                    value={filterName}
                    label='filter by name'
                />
                <RangeSlider 
                    className={styles.nameFilter}  
                    min={0} 
                    max={100} 
                    step={5} 
                    value={filterPrice} 
                    onChange={setFilterPrice} 
                    label='filter by price'
                />
                <Input 
                    className={styles.nameFilter} 
                    onChange={(value) => setFilterQuantity(Number(value))} 
                    type='number' 
                    value={filterQuantity} 
                    label='filter by quantity'
                />
             </div>
            <Table columns={columns} rows={processedData.map(product => ({
                ...product,
                'actions': (id) =>
                <>
                 <EditProduct id={id}/>
                 <DeleteProduct id={id}/>
                </>
            }))}/>
        </>
    );
};

Products.dispplayName = 'Products';
export default Products;