// import React, { useEffect, useState } from "react";
// import ProductCard from "./productCard";
// import axios from "axios";
// import Filter from "./filter";


// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:3002/get/products");
//         const data = await response.json();
  
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else if (data.products) {
//           setProducts(data.products);
//         } else {
//           console.error("API response is not an array:", data);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };
  
//     fetchProducts();
//   }, []);

//   const [filteredProducts,setFilteredProducts] = useState(products);
//   const [filters, setFilters] = useState({
//     name: "",
//     color: "",
//     minPrice: "",
//     maxPrice: "",
//   });

//   useEffect(() => {
//     const { name, color, minPrice, maxPrice } = filters;

//     const filtered = products.filter((product) => {
//       return (
//         (name === "" || product.name.toLowerCase().includes(name.toLowerCase())) &&
//         (color === "" || product.color.includes(color)) &&
//         (minPrice === "" || product.price >= parseFloat(minPrice)) &&
//         (maxPrice === "" || product.price <= parseFloat(maxPrice))
//       );
//     });

//     setFilteredProducts(filtered);
//   }, [filters]);

//   return (
//     <div className="container mx-auto p-6">
//        <Filter filters={filters} setFilters={setFilters} />
//       <h1 className="text-2xl font-bold">Product List</h1>
//       <div className="grid grid-cols-5 gap-6 mt-4">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
// Frontend (React + TailwindCSS)

import { useState, useEffect, useContext } from 'react';

import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import Filter from './filter';
import ProductCard from './productCard';
import Cart from './Box';
import { CartContext } from './context/cart';

// const ProductCard = ({ product, addToCart }) => {
//   const [quantity, setQuantity] = useState(1);
//     const [selectedColor, setSelectedColor] = useState(product.color);
//     const [selectedSize, setSelectedSize] = useState(product.sizes);  

//     return (
//         <div className="border p-4 rounded-lg shadow-lg">
//           <div>
//             <img src={product.src} alt={product.name} />
//           </div>
//             <h2 className="text-lg font-bold">{product.name}</h2>
//             <p className="text-gray-500">Price: ${product.price}</p>
            
//             {/* Here we call the ColorSelector, SizeSelector, and QuantitySelector components */}
//             <ColorSelector 
//                 colors={product.color} 
//                 selectedColor={selectedColor} 
//                 setSelectedColor={setSelectedColor} 
//             />
//             <SizeSelector 
//                 sizes={product.sizes} 
//                 selectedSize={selectedSize} 
//                 setSelectedSize={setSelectedSize} 
//                 setQuantity={setQuantity} 
//             />
//             <QuantitySelector 
//                 quantity={quantity} 
//                 setQuantity={setQuantity} 
//             />
            
//             <button 
//                 onClick={() => addToCart(product,selectedColor, selectedSize)} 
//                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
//                 Add to Cart
//             </button>
//         </div>
//     );
// };

const ProductList = () => {
    const { addToCart } = useContext(CartContext)
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/get/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    // const addToCart = (product, quantity, color, size) => {
    //     setCart([...cart, { ...product, quantity, color, size }]);
    // };


    return (
        <div>
            <h1 className="text-2xl font-bold p-4">Product List</h1>
            {/* <Filter applyFilter={applyFilter} /> */}
            <div className="grid grid-cols-5 gap-4 p-4">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
            <div className="p-4 mt-4 border-t">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                < Cart showModal={true} />
                {/* {cart.length === 0 ? (
                    <p className="text-gray-500">Cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="border-b py-2 flex justify-between items-center">
                                {item.name} - {item.quantity} pcs - {item.color} - {item.size} - ${item.price * item.quantity}
                                <button 
                                    onClick={() => removeFromCart(index)} 
                                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )} */}
                {/* <h3 className="text-lg font-bold mt-4">Total Price: ${getTotalPrice()}</h3> */}
            </div>
        </div>
    );
};

export default ProductList;
