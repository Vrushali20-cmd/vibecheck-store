const CATEGORIES = [
  { name: 'Dresses',     icon: '👗' },
  { name: 'Makeup',      icon: '💄' },
  { name: 'Bags',        icon: '👜' },
  { name: 'Shoes',       icon: '👟' },
  { name: 'Accessories', icon: '🎀' },
];

const CategoryTabs = ({ activeTab, onSelect }) => (
  <div className="mt-12 flex gap-3 overflow-x-auto pb-2 fx-scrollbar-none">
    {CATEGORIES.map((cat) => {
      const selected = activeTab === cat.name;
      return (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className="px-5 py-3 rounded-full text-xs font-semibold border whitespace-nowrap transition-all"
          style={{
            background: selected ? 'var(--mood-text)' : 'var(--mood-card)',
            color:      selected ? 'var(--mood-bg)'   : 'var(--mood-text)',
            borderColor: 'var(--mood-border)',
          }}
        >
          {cat.icon} {cat.name}
        </button>
      );
    })}
  </div>
);

export default CategoryTabs;