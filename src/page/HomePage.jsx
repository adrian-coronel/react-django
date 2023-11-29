import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function HomePage() {
  
  const [productos, setProductos] = useState([]);
  const [recuperado, setRecuperado] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/producto')
      .then((response) => response.json())
      .then((prod) => {
        setProductos(prod);
        setRecuperado(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const mostrarTabla = () => {
    return (
      <div className="text-white py-4">
        <div className="container">
          <div className="card">
            <div className="">
              <h3 className="mb-0">Tabla de Productos</h3>
            </div>
            <a href='/create' className='btn btn-primary' >Crear nuevo producto</a>
            <div className="card-body">
              <table className="table table-striped text-white">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(prod => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.categoria.nombre}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {recuperado ? mostrarTabla() : <div className="mt-4">Recuperando datos...</div>}
    </div>
  );
}

export default HomePage;
