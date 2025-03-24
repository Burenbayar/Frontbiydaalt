const SizeSelector = ({ sizes, selectedSize, setSelectedSize, setQuantity }) => {
    const handleSizeChange = (size) => {
        setSelectedSize(size);
        // Automatically set the quantity to 1 when the size is selected
        const selectedSizeData = sizes.find(item => item.size === size);
        setQuantity(selectedSizeData ? 1 : 0); // If size is found, set quantity to 1
    };

    return (
        <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <select 
                value={selectedSize} 
                onChange={(e) => handleSizeChange(e.target.value)} 
                className="mt-1 p-2 border rounded-md w-full"
            >
                {sizes.map((sizeOption, index) => (
                    <option 
                        key={index} 
                        value={sizeOption.size} 
                        disabled={sizeOption.quantity === 0}  // Disable if out of stock
                    >
                        {sizeOption.size} ({sizeOption.quantity} in stock)
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SizeSelector;

