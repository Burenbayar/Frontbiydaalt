const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => {
    return (
        <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <div className="flex space-x-2">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-blue-900' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;
