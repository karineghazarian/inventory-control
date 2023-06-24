import CreateProduct from "./components/product/CreateProduct";
import Table from "./components/ui-kit/table/Table";
import { useSelector } from 'react-redux';

function App() {
  const products = useSelector((state)=> state.products.value);

  return (
    <div className="App">
      <CreateProduct />
      <Table columns={['name', 'price', 'quantity', 'actions']} rows={products.map(product => ({
        ...product,
        'actions': () => <>
          <div>edit</div>
          <div>delete</div>
        </>
      }))}/>
    </div>
  );
}

export default App;
