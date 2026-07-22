import { useState, useEffect } from 'react';
import axios from 'axios';
import { LOOK_CATEGORIES, OCCASION_STYLE_TAGS } from '../components/StyleBooth/constants';

const API_BASE = 'https://vibecheck-backend-hyhv.onrender.com';

/**
 * Scores a product against target style tags.
 * Returns a number 0–100.
 */
const scoreProduct = (product, targetTags, budgetMax) => {
  // Reject if over budget
  if (product.price > budgetMax) return 0;

  const productTags = product.styleTags || [];
  if (productTags.length === 0) return 50; // neutral score if no tags

  const matches = productTags.filter((t) =>
    targetTags.some((target) => t.toLowerCase().includes(target.toLowerCase()))
  ).length;

  // Base score from tag overlap (max 85), + small bonus for being in-budget
  const tagScore = Math.round((matches / targetTags.length) * 85);
  const budgetBonus = product.price <= budgetMax * 0.6 ? 10 : 5;

  return Math.min(99, tagScore + budgetBonus);
};

/**
 * Picks the best-matching product from an array.
 * Returns { product, matchScore } or null if array is empty.
 */
const pickBest = (products, targetTags, budgetMax) => {
  if (!products || products.length === 0) return null;

  const scored = products
    .map((p) => ({ product: p, score: scoreProduct(p, targetTags, budgetMax) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  const best = scored[0];
  return {
    product: best.product,
    matchScore: `${best.score}%`,
  };
};

/**
 * useStyleBooth(occasion, brief)
 *
 * occasion: string — one of the OCCASIONS ids
 * brief: { budgetMax: number, colorVibe: string }
 *
 * Returns: { look, loading, error }
 * look: { outfit, shoes, bag, accessory, makeup }
 * Each value: { product, matchScore } | null
 */
export const useStyleBooth = (occasion, brief) => {
  const [look, setLook]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!occasion || !brief) return;

    const source = axios.CancelToken.source();

    const fetchLook = async () => {
      setLoading(true);
      setError(null);

      try {
        const targetTags = OCCASION_STYLE_TAGS[occasion] || [];
        const budgetMax  = brief.budgetMax ?? Infinity;

        // Fetch all categories in parallel
        const requests = LOOK_CATEGORIES.map(({ category }) =>
          axios.get(`${API_BASE}/api/products?category=${category}`, {
            cancelToken: source.token,
          })
        );

        const responses = await Promise.all(requests);

        // Build the look: pick best product per category
        const assembled = {};
        LOOK_CATEGORIES.forEach(({ key }, i) => {
          const products = Array.isArray(responses[i].data) ? responses[i].data : [];
          assembled[key] = pickBest(products, targetTags, budgetMax);
        });

        setLook(assembled);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error('StyleBooth fetch error:', err);
        setError('Could not load your look. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLook();
    return () => source.cancel();
  }, [occasion, brief?.budgetMax, brief?.colorVibe]);

  return { look, loading, error };
};
