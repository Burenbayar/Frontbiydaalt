import { useState } from "react";
const Quantity = () =>{
    const [quantity,setQuantity] = useState(1);
    const increaseQuantity = () =>{
        setQuantity(quantity+1);
    };

    const decreaseQuantity = () => {
        setQuantity(quantity- 1);
    };
    return (
        <div className="info">
            <span className="text" >quantity: </span>
            <button onClick={increaseQuantity}disabled={quantity === 15}>+</button>
            <span>{quantity}</span>
            <button onClick={decreaseQuantity} disabled= {quantity ===0 }>-</button>
        </div>
    );
};
export default Quantity;