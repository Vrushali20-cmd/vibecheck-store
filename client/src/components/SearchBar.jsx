import { useState, useEffect, useRef } from 'react';

const STYLE_TAGS = [
  'Boho Chic', 'Elegant', 'Soft Girl', 'Y2K', 'Minimal',
  'Ethnic', 'Festive', 'Glam', 'Casual', 'Bridal',
];

const SORT_OPTIONS = [
  { value: '',           label: 'Relevance' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc',   label: 'Name: A-Z' },
];

const SearchBar = ({ filters, onChange }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);
  const debounceRef = useRef(null);

  // Debounce search input — waits 400ms after user stops typing
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ ...filters, search: localSearch });
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [localSearch]);

  const set = (key, value) => onChange({ ...filters, [key]: value });

  const clearAll = () => {
    setLocalSearch('');
    onChange({ search: '', minPrice: '', maxPrice: '', styleTag: '', sort: '' });
  };

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.styleTag || filters.sort;

  return (
    <div className="mt-8 space-y-3">

      {/* Search input row */}
      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl border"
          style={{ background: 'var(--mood-card)', borderColor: 'var(--mood-border)' }}
        >
          {/* Search icon */}
          <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--mood-sub)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>

          <input
            type="text"
            placeholder="Search dresses, bags, makeup…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: 'var(--mood-text)' }}
          />

          {/* Clear search */}
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="text-lg leading-none"
              style={{ color: 'var(--mood-sub)' }}
            >×</button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(v => !v)}
          className="px-4 py-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all"
          style={{
            background:  showFilters ? 'var(--mood-accent)' : 'var(--mood-card)',
            borderColor: showFilters ? 'var(--mood-accent)' : 'var(--mood-border)',
            color:       showFilters ? '#fff' : 'var(--mood-text)',
          }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          )}
        </button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div
          className="p-4 rounded-2xl border space-y-4"
          style={{ background: 'var(--mood-card)', borderColor: 'var(--mood-border)' }}
        >

          {/* Price range */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--mood-sub)' }}>
              Price Range
            </p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min ₹"
                value={filters.minPrice || ''}
                onChange={(e) => set('minPrice', e.target.value)}
                className="w-24 px-3 py-2 rounded-xl border text-xs outline-none"
                style={{ background: 'var(--mood-bg)', borderColor: 'var(--mood-border)', color: 'var(--mood-text)' }}
              />
              <span className="text-xs" style={{ color: 'var(--mood-sub)' }}>to</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={filters.maxPrice || ''}
                onChange={(e) => set('maxPrice', e.target.value)}
                className="w-24 px-3 py-2 rounded-xl border text-xs outline-none"
                style={{ background: 'var(--mood-bg)', borderColor: 'var(--mood-border)', color: 'var(--mood-text)' }}
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--mood-sub)' }}>
              Sort By
            </p>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => set('sort', opt.value)}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all"
                  style={{
                    borderColor: filters.sort === opt.value ? 'var(--mood-accent)' : 'var(--mood-border)',
                    background:  filters.sort === opt.value ? 'var(--mood-accent)' : 'transparent',
                    color:       filters.sort === opt.value ? '#fff' : 'var(--mood-sub)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style tags */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--mood-sub)' }}>
              Style
            </p>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => set('styleTag', filters.styleTag === tag ? '' : tag)}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all"
                  style={{
                    borderColor: filters.styleTag === tag ? 'var(--mood-accent)' : 'var(--mood-border)',
                    background:  filters.styleTag === tag ? 'var(--mood-accent)' : 'transparent',
                    color:       filters.styleTag === tag ? '#fff' : 'var(--mood-sub)',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs font-semibold underline"
              style={{ color: 'var(--mood-accent)' }}
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Active search result count will show in ProductGrid */}
    </div>
  );
};

export default SearchBar;
