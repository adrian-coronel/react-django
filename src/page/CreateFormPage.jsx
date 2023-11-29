import React, { useState, useEffect } from 'react';

export default function CreateFormPage() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
  });

  // Estado para almacenar las categorías disponibles
  const [categorias, setCategorias] = useState([]);

  // Efecto para obtener las categorías disponibles al cargar la página
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categoria')  // Ruta de la API para obtener las categorías
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al obtener categorías:', error));
  }, []);

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( JSON.stringify(formData));
    fetch('http://127.0.0.1:8000/api/producto/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto creado:', data);
        // Puedes redirigir o realizar otras acciones después de crear el producto
      })
      .catch(error => console.error('Error al crear el producto:', error));
  };

  return (
    <>
      <div className="text-white py-4">
        <div className="container">
          <div className="card">
            <div className="">
              <h3 className="mb-0">Crear Producto</h3>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Input para el nombre del producto */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleInputChange} required />
              </div>
              {/* Input para el precio del producto */}
              <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio del Producto</label>
                <input type="number" className="form-control" id="precio" name="precio" onChange={handleInputChange} required />
              </div>
              {/* Input para el stock del producto */}
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock del Producto</label>
                <input type="number" className="form-control" id="stock" name="stock" onChange={handleInputChange} required />
              </div>
              {/* Select para elegir la categoría del producto */}
              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoría del Producto</label>
                <select className="form-select" id="categoria" name="categoria" onChange={handleInputChange} required>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  ))}
                </select>
              </div>
              {/* Botón para enviar el formulario */}
              <button type="submit" className="btn btn-primary">Crear Producto</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
