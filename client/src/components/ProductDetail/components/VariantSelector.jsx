const VariantSelector = ({ product, selected, onSelect }) => {
  const { variants = [], category } = product;

  if (!variants.length) return null;

  // Get unique sizes
  const sizes  = [...new Set(variants.map(v => v.size).filter(Boolean))];
  // Get unique colors
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean))];
  // Get unique shades (makeup)
  const shades = variants.filter(v => v.shadeName);

  return (
    <div className="space-y-4">

      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p className="text-xs font-bold text-zinc-600 mb-2">
            Size
            {selected.size && (
              <span className="ml-2 text-pink-500 font-normal">— {selected.size}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variant = variants.find(v => v.size === size);
              const outOfStock = variant?.stock === 0;
              const isSelected = selected.size === size;
              return (
                <button
                  key={size}
                  onClick={() => !outOfStock && onSelect({ ...selected, size })}
                  disabled={outOfStock}
                  className="w-12 h-12 rounded-xl border-2 text-xs font-bold transition-all relative"
                  style={{
                    borderColor: isSelected ? '#E8638C' : '#E4E4E7',
                    background:  isSelected ? '#E8638C' : '#fff',
                    color:       isSelected ? '#fff'     : outOfStock ? '#D4D4D8' : '#3F3F46',
                  }}
                >
                  {size}
                  {outOfStock && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-full h-px bg-zinc-300 rotate-45 absolute" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color selector */}
      {colors.length > 0 && (
        <div>
          <p className="text-xs font-bold text-zinc-600 mb-2">
            Color
            {selected.color && (
              <span className="ml-2 text-pink-500 font-normal">— {selected.color}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const isSelected = selected.color === color;
              return (
                <button
                  key={color}
                  onClick={() => onSelect({ ...selected, color })}
                  className="px-4 py-2 rounded-xl border-2 text-xs font-semibold transition-all"
                  style={{
                    borderColor: isSelected ? '#E8638C' : '#E4E4E7',
                    background:  isSelected ? '#FFF0F4' : '#fff',
                    color:       isSelected ? '#E8638C' : '#52525B',
                  }}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Shade selector (makeup) */}
      {shades.length > 0 && (
        <div>
          <p className="text-xs font-bold text-zinc-600 mb-2">
            Shade
            {selected.shade && (
              <span className="ml-2 text-pink-500 font-normal">— {selected.shade}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {shades.map((v) => {
              const isSelected = selected.shade === v.shadeName;
              return (
                <button
                  key={v.shadeName}
                  onClick={() => onSelect({ ...selected, shade: v.shadeName })}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-semibold transition-all"
                  style={{
                    borderColor: isSelected ? '#E8638C' : '#E4E4E7',
                    background:  isSelected ? '#FFF0F4' : '#fff',
                  }}
                >
                  {v.shadeHex && (
                    <span
                      className="w-4 h-4 rounded-full border border-zinc-200"
                      style={{ background: v.shadeHex }}
                    />
                  )}
                  {v.shadeName}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default VariantSelector;
