import { useEffect, useState } from "react";
import {  useDispatch } from 'react-redux'
import { Button, Modal, Input } from "../../ui-kit";
import { createProduct } from '../../../redux/products/productsSlice';
import styles from './operations.module.css'
import { validateValue, validateAll } from '../validate'
import { PRODUCT_TYPES } from "../config";

const initialProductState = {
    [PRODUCT_TYPES.NAME]: '',
    [PRODUCT_TYPES.PRICE]: 0,
    [PRODUCT_TYPES.QUANTITY]: 0
}

const CreateProduct = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState(initialProductState);
    const [errors, setErrors] = useState({});

    const handleProductChange = (type, value) => {
        const changedProduct = {
            ...product,
            [type]: value
        }
        setProduct(changedProduct);
        const error = validateValue(changedProduct, type);
        setErrors((prevState) => ({
            ...prevState,
            [type]: error[type]
        }));
    };

    const handleConfirm = ()=> {
        const errorsObj = validateAll(product); 
        setErrors(errorsObj);

        if(Object.keys(errorsObj).length === 0) {
            dispatch(createProduct(product));
            setProduct(initialProductState);
            setIsOpen(false);
        };
    };

    useEffect(() => {
        if(!isOpen) {
            setErrors({});
        }
    }, [isOpen])

    return (
        <>
            <Button onClick={()=> setIsOpen(true)}>
                Create product
            </Button>
            {isOpen ? (
                <Modal 
                    setIsOpen={setIsOpen} 
                    title='Create Product'
                    confirm='Create' 
                    handleConfirm={handleConfirm}
                >
                    <div>
                        <Input 
                            value={product.name}
                            onChange={(v) => handleProductChange(PRODUCT_TYPES.NAME, v)}  
                            label={PRODUCT_TYPES.NAME}
                        />
                        {errors.name ? (<p className={styles.error}>{errors.name}</p>) : ''}
                        <Input 
                            value={product.price} 
                            type='number' 
                            onChange={(v) => handleProductChange(PRODUCT_TYPES.PRICE, Number(v))} 
                            label={PRODUCT_TYPES.PRICE}
                        />
                        {errors.price ? (<p className={styles.error}>{errors.price}</p>) : ''}
                        <Input
                            value={product.quantity} 
                            type='number' 
                            onChange={(v) => handleProductChange(PRODUCT_TYPES.QUANTITY, Number(v))} 
                            label={PRODUCT_TYPES.QUANTITY}
                        />
                        {errors.quantity ? (<p className={styles.error}>{errors.quantity}</p>) : ''}
                    </div>
                </Modal>
            ) : null}
        </>
    )
}

CreateProduct.displayName = 'ModCreateProductal'

export default CreateProduct;
