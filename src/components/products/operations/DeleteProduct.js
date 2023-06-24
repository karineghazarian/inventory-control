import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from "../../ui-kit";
import { deleteProduct } from '../../../redux/products/productsSlice';
import { Trash } from 'tabler-icons-react';
import styles from './operations.module.css'

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
        <Trash
            size={26}
            strokeWidth={2}
            color={'#79a1d2'}
            onClick={() => setIsOpen(true)}
            className={styles.actionIcon}
        />
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