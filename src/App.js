import React from 'react';
import './style.css';

function Product({ handleSelect, handleQuantatiy }) {
  return (
    <tr>
      <select name="Menu" onChange={handleSelect}>
        <option value="null" hidden>
          Select Menu
        </option>
        <option value="Coffee">Coffee</option>
        <option value="Tea">Tea</option>
        <option value="Sandwich">Sandwich</option>
        <option value="Maggie">Maggie</option>
      </select>
      <input placeholder="Select Quantity" onChange={handleQuantatiy} />
    </tr>
  );
}

export default function App() {
  const [Cname, setName] = React.useState('');
  const [data, setData] = React.useState({});
  const [history, setHistory] = React.useState([]);
  const [componentList, setComponentList] = React.useState([<Product />]);
  const [ifBill, setBill] = React.useState(false);

  const handleSelect = (e) => {
    data.menu = e.target.value;
    setData({
      ...data,
    });
  };

  const handleQuantatiy = (e) => {
    data.quantity = e.target.value;
    setData({
      ...data,
    });
  };

  const calculateTotal = (menu, quantity) => {
    let price = 0;
    switch (menu) {
      case 'Coffee':
        price = 40;
        break;
      case 'Tea':
        price = 20;
        break;
      case 'Sandwich':
        price = 60;
        break;
      case 'Maggie':
        price = 60;
        break;
      default:
        break;
    }
    return price * quantity;
  };

  const handleAdd = () => {
    const { menu, quantity } = data;
    const total = calculateTotal(menu, quantity);
    setHistory([
      ...history,
      { menu, quantity, price: calculateTotal(menu, quantity), total },
    ]);
    setData({});
    setComponentList([...componentList, <Product />]);
  };

  const handleBill = () => {
    setBill(true);
  };

  return (
    <div>
      <h2>Customer Name: </h2>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Customer Name"
      />

      <div>
        <table>
          <button onClick={handleAdd}>Add</button>
          {componentList.map(() => {
            return (
              <Product
                handleSelect={handleSelect}
                handleQuantatiy={handleQuantatiy}
              />
            );
          })}
        </table>
        <button onClick={handleBill}>Bill</button>
        {ifBill && (
          <div>
            <h3>Total bill of {Cname}</h3>
            {history.map((e) => (
              <>
                <tr>
                  <td>Menu: {e.menu}</td>
                  <td>Price: {e.price}</td>
                  <td>Quantity: {e.quantity}</td>
                </tr>
              </>
            ))}
            <h3>
              Total: {history.reduce((total, item) => total + item.total, 0)}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
