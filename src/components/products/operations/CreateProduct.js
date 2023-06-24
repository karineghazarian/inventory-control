import { useState } from "react";
import {  useDispatch } from 'react-redux'
import { Button, Modal, Input } from "../../ui-kit";
import { createProduct } from '../../../redux/products/productsSlice';

const initialProductState = {
    name: '',
    price: 0,
    quantity: 0
}

const CreateProduct = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState(initialProductState);

    const handleProductChange = (type, value) => {
        setProduct((prevState) => ({
            ...prevState,
            [type]: value
        }));
    }; 

    const handleConfirm = ()=> {
        if(product.name) {
            dispatch(createProduct(product));
            setProduct(initialProductState);
            setIsOpen(false);
        }
    }
    return (
        <>
            <Button onClick={()=> {setIsOpen(true)}}>
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
                            onChange={(v) => handleProductChange('name', v)}  
                            label='name'
                        />
                        <Input 
                            value={product.price} 
                            type='number' 
                            onChange={(v) => handleProductChange('price', Number(v))} 
                            label='price'
                        />
                        <Input
                            value={product.quantity} 
                            type='number' 
                            onChange={(v) => handleProductChange('quantity', Number(v))} 
                            label='quantity'
                        />
                    </div>
                </Modal>
            ) : null}
        </>
    )
}

CreateProduct.displayName = 'ModCreateProductal'

export default CreateProduct;
