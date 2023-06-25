import {Table} from '../ui-kit';
import EditProduct from './operations/EditProduct';
import DeleteProduct from './operations/DeleteProduct';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {Input, RangeSlider} from '../ui-kit';
import styles from "./Product.module.css"; 

const Products = ()=> {
    const products = useSelector((state)=> state.products.value);

    const [filterPrice, setFilterPrice] = useState(null);
    const [filterName, setFilterName] = useState(null);
    const [filterQuantity, setFilterQuantity] = useState(null);

    const [processedData, setProcessedData]= useState([]);

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

    useEffect(()=> {
        const result = filter(products);
        setProcessedData(result);
    }, [products, filter])

    return (
        <>
            <div className={styles.filterContainer}>
                <Input 
                    className={styles.nameFilter}
                    onChange={setFilterName}
                    value={filterName}
                    label='filter by name'
                />
                <RangeSlider className={styles.nameFilter}  min={0} max={100} step={5} value={filterPrice} onChange={setFilterPrice} label='filter by price'/>
                <Input className={styles.nameFilter} onChange={(value) => setFilterQuantity(Number(value))} type='number' value={filterQuantity} label='filter by quantity'/>
             </div>
            <Table columns={['name', 'price', 'quantity', 'actions']} rows={processedData.map(product => ({
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