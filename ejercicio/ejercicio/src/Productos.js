import React, { useState } from "react";

function Productos() {
  const productos = [
    { id: 1, nombre: "Camisas", precio: 20, cantidadSeleccionada: 0 },
    { id: 2, nombre: "Pantalones", precio: 30, cantidadSeleccionada: 0 },
    { id: 3, nombre: "Zapatos", precio: 50, cantidadSeleccionada: 0 }
  ];

  const [productosSeleccionados, setProductosSeleccionados] = useState(productos);

  const seleccionarProducto = (id) => {
    const productoSeleccionado = productosSeleccionados.find((p) => p.id === id);
    if (productoSeleccionado.cantidadSeleccionada < 15) {
      const nuevosProductos = productosSeleccionados.map((p) => {
        if (p.id === id) {
          return { ...p, cantidadSeleccionada: p.cantidadSeleccionada + 1 };
        }
        return p;
      });
      setProductosSeleccionados(nuevosProductos);
    }
  };

  const deseleccionarProducto = (id) => {
    const productoSeleccionado = productosSeleccionados.find((p) => p.id === id);
    if (productoSeleccionado.cantidadSeleccionada > 0) {
      const nuevosProductos = productosSeleccionados.map((p) => {
        if (p.id === id) {
          return { ...p, cantidadSeleccionada: p.cantidadSeleccionada - 1 };
        }
        return p;
      });
      setProductosSeleccionados(nuevosProductos);
    }
  };

  const total = productosSeleccionados.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidadSeleccionada,
    0
  );

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {productosSeleccionados.map((p) => (
          <li key={p.id}>
            <span>{p.nombre}</span>
            <span>{p.precio}€</span>
            <button onClick={() => seleccionarProducto(p.id)}>
              Agregar ({p.cantidadSeleccionada}/15)
            </button>
            {p.cantidadSeleccionada > 0 && (
              <span>
                {p.cantidadSeleccionada} x {p.nombre}
                <button onClick={() => deseleccionarProducto(p.id)}>Deseleccionar</button>
              </span>
            )}
          </li>
        ))}
        <li>
          <strong>Total:</strong> {total}€
          {productosSeleccionados
            .filter((p) => p.cantidadSeleccionada > 0)
            .map((p) => (
              <div key={p.id}>
                {p.cantidadSeleccionada} x {p.nombre}
              </div>
            ))}
        </li>
      </ul>
    </div>
  );
}

export default Productos;
