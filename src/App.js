import CreateProduct from "./components/product/CreateProduct";
import Table from "./components/ui-kit/table/Table";
import { useSelector } from 'react-redux';
import EditProduct from "./components/product/actions/EditProduct";
import DeleteProduct from "./components/product/actions/DeleteProduct";

function App() {
  const products = useSelector((state)=> state.products.value);

  return (
    <div className="App">
      <CreateProduct />
      <Table columns={['name', 'price', 'quantity', 'actions']} rows={products.map(product => ({
        ...product,
        'actions': (id) => 
        <>
          <EditProduct id={id}/>
          <DeleteProduct id={id}/>
          </>
      }))}/>
    </div>
  );
}

export default App;
