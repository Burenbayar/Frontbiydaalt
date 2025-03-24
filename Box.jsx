import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from './context/cart.jsx'


export default function Cart ({showModal}) {

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);


  return (
    showModal && (
      <div className="cart">
        <h1 >Cart</h1>
        <div className="center">
        </div>
        <div className="item-list">
          {cartItems.map((item) => (
            <div className="items" key={item.id}>
              <div className="border-b py-2 flex justify-between items-center">
                <img src={item.src} alt={item.name} className="object-fill w-28 h-28 rounded-md" />
                <div className="texts">
                  <h1 className="text1">{item.name}-{item.price}-{addToCart}</h1>
                </div>
                <div className="btns">
                <button
                  className="increasebtn"
                  onClick={() => {
                    addToCart(item)
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="increasebtn"
                  onClick={() => {
                    removeFromCart(item)
                  }}
                >
                  -
                </button>
                <button 
                onClick={() => removeFromCart(item)} 
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded">
                Remove
                </button>
              </div>
              </div>
              
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div className="total">
          <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
          <button
            className="clearbtn"
            onClick={() => {
              clearCart()
            }}
          >
            Clear cart
          </button>
        </div>
          ) : (
            <h1 className="text-gray-500">Your cart is empty</h1>
          )
        }
      </div>
    )
  )
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
}
