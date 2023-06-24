import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from "../../ui-kit";
import { deleteProduct } from '../../../redux/products/productsSlice';

const DeleteProduct = ({id})=> {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = ()=> {
        if(id) {
            dispatch(deleteProduct(id));
            setIsOpen(false);
        }
    }
    return (
        <>
        <Button onClick={() => setIsOpen(true)}>
            Delete
        </Button>
        {isOpen ? (
                <Modal 
                    setIsOpen={setIsOpen} 
                    title='Delete Product'
                    confirm='Delete' 
                    message={'Are you sure you want to delete this product?'}
                    handleConfirm={handleDelete}
                />
            ) : null}
        </>
    )
}

DeleteProduct.displayName = 'DeleteProduct';
export default DeleteProduct;