import React from "react";
import {useState} from "react"
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import Filter from './filter';
// import QuantitySelector from './QuantitySelector';
import Quantity from "./quantity";
const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.color);
    const [selectedSize, setSelectedSize] = useState(product.sizes);  

    return (
        <div className="border p-4 rounded-lg shadow-lg">
          <div>
            <img src={product.src} alt={product.name} className="object-fill rounded-md" />
          </div>
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-500">Price: ${product.price}</p>
            
            {/* Here we call the ColorSelector, SizeSelector, and QuantitySelector components */}
            <ColorSelector 
                colors={product.color} 
                selectedColor={selectedColor} 
                setSelectedColor={setSelectedColor} 
            />
            <SizeSelector 
                sizes={product.sizes} 
                selectedSize={selectedSize} 
                setSelectedSize={setSelectedSize} 
                setQuantity={setQuantity} 
            />
            <button 
                onClick={() => addToCart(product)} 
                className="ml-8 mt-2 bg-blue-500 text-white px-4  rounded w-48 hover:bg-blue-700 ">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
