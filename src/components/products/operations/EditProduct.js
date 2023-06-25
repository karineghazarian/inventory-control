import { useEffect, useState } from 'react';
import { Modal, Input } from "../../ui-kit";
import { editProduct } from '../../../redux/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from 'tabler-icons-react';
import styles from './operations.module.css'
import { validateValue, validateAll } from '../validate'
import { PRODUCT_TYPES } from "../config";

const initialProductState = {
    [PRODUCT_TYPES.NAME]: '',
    [PRODUCT_TYPES.PRICE]: 0,
    [PRODUCT_TYPES.QUANTITY]: 0
}

const EditProduct = ({id})=> {
    const products = useSelector((state) => state.products.value);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState(initialProductState);
    const [errors, setErrors] = useState({});

    useEffect(()=> {
        if(isOpen && id)
        {
            const currentProduct = products.find((product)=> product.id === id);
            if(currentProduct) 
            {
                setProduct(currentProduct);
            } 
        };
    }, [id, products, isOpen])

    useEffect(() => {
        if(!isOpen) {
            setErrors({});
        }
    }, [isOpen])

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

        if(product.id && Object.keys(errorsObj).length === 0) {
            dispatch(editProduct(product));
            setIsOpen(false);
        }
    }
    return (
        <>
        <Edit
            size={26}
            strokeWidth={2}
            color={'#79a1d2'}
            onClick={() => setIsOpen(true)}
            className={styles.actionIcon}
        />
        {isOpen ? (
                <Modal 
                    setIsOpen={setIsOpen} 
                    title='Edit Product'
                    confirm='Edit' 
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
                            onChange={(v) => handleProductChange(PRODUCT_TYPES.PRICE, v)} 
                            label={PRODUCT_TYPES.PRICE}
                        />
                        {errors.price ? (<p className={styles.error}>{errors.price}</p>) : ''}
                        <Input
                            value={product.quantity} 
                            type='number' 
                            onChange={(v) => handleProductChange(PRODUCT_TYPES.QUANTITY, v)} 
                            label={PRODUCT_TYPES.QUANTITY}
                        />
                        {errors.quantity ? (<p className={styles.error}>{errors.quantity}</p>) : ''}
                    </div>
                </Modal>
            ) : null}
        </>
    );
}

EditProduct.displayName = 'EditProduct';
export default EditProduct;