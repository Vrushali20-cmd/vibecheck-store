import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ImageSection    from './components/ImageSection';
import ProductInfo     from './components/ProductInfo';
import VariantSelector from './components/VariantSelector';
import AddToCartBar    from './components/AddToCartBar';

const ProductDetail = ({ onAddToCart, onCartOpen }) => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { state }    = useLocation();

  const [product,  setProduct]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [selected, setSelected] = useState({ size: '', color: '', shade: '' });

  useEffect(() => {
    // If product was passed via navigation state, use it directly
    if (state?.product) {
      const p = { ...state.product, _id: id };
      setProduct(p);
      if (p.variants?.length) {
        const first = p.variants[0];
        setSelected({ size: first.size || '', color: first.color || '', shade: first.shadeName || '' });
      }
      setLoading(false);
      return;
    }

    // Otherwise fetch from API using index
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        if (data.variants?.length) {
          const first = data.variants[0];
          setSelected({ size: first.size || '', color: first.color || '', shade: first.shadeName || '' });
        }
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, state]);

  const handleAddToCart = async (productId, size, color, qty) => {
    if (onAddToCart) {
      await onAddToCart(productId, size, color, qty);
      onCartOpen && onCartOpen();
    }
  };

  const handleBuyNow = async (productId, size, color, qty) => {
    if (onAddToCart) {
      await onAddToCart(productId, size, color, qty);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-pink-400 animate-pulse text-sm">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 text-sm">{error || 'Product not found'}</p>
        <button onClick={() => navigate('/dashboard')} className="text-pink-500 text-xs font-semibold underline">
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9FA] pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-700 mb-6 transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ImageSection product={product} />
          <div className="flex flex-col gap-6">
            <ProductInfo product={product} />
            <div className="h-px bg-zinc-100" />
            <VariantSelector product={product} selected={selected} onSelect={setSelected} />
            {product.variants?.length > 0 && (
              <p className="text-xs text-green-600 font-semibold">✓ In stock — ready to ship</p>
            )}
          </div>
        </div>
      </div>

      <AddToCartBar
        product={product}
        selected={selected}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductDetail;