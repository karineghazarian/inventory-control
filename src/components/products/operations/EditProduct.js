import { useEffect, useState } from 'react';
import { Button, Modal, Input } from "../../ui-kit";
import { editProduct } from '../../../redux/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from 'tabler-icons-react';
import styles from './operations.module.css'

const initialProductState = {
    name: '',
    price: 0,
    quantity: 0
}
const EditProduct = ({id})=> {
    const products = useSelector((state) => state.products.value);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState(initialProductState);

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

    const handleProductChange = (type, value) => {
        setProduct((prevState) => ({
            ...prevState,
            [type]: value
        }));
    }; 

    const handleConfirm = ()=> {
        if(product.id) {
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
                            onChange={(v) => handleProductChange('name', v)}  
                            label='name'
                        />
                        <Input 
                            value={product.price} 
                            type='number' 
                            onChange={(v) => handleProductChange('price', v)} 
                            label='price'
                        />
                        <Input
                            value={product.quantity} 
                            type='number' 
                            onChange={(v) => handleProductChange('quantity', v)} 
                            label='quantity'
                        />
                    </div>
                </Modal>
            ) : null}
        </>
    );
}

EditProduct.displayName = 'EditProduct';
export default EditProduct;