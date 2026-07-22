const API_BASE = 'https://vibecheck-backend-hyhv.onrender.com';

const ImageSection = ({ product }) => {
  const imgSrc = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : `${API_BASE}${product.imageUrl}`;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-zinc-100 aspect-square">
      <img
        src={imgSrc}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      {/* Style tags */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        {product.styleTags?.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/80 backdrop-blur-sm text-zinc-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
