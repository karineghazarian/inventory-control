import {Table} from '../ui-kit';
import EditProduct from '../product/actions/EditProduct';
import DeleteProduct from '../product/actions/DeleteProduct';
import { useSelector } from 'react-redux';

const Products = ()=> {
    const products = useSelector((state)=> state.products.value);
    return (
        <Table columns={['name', 'price', 'quantity', 'actions']} rows={products.map(product => ({
            ...product,
            'actions': (id) => 
            <>
              <EditProduct id={id}/>
              <DeleteProduct id={id}/>
              </>
          }))}/>
    );
};

Products.dispplayName = 'Products';
export default Products;