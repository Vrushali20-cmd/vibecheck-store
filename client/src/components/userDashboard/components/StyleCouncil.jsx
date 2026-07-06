import { IconArrow } from './Icons';
import Eyebrow from './Eyebrow';

const INFLUENCER_PICKS = [
  {
    curator: '@kavya.vibe',
    lookName: 'Soft Matcha Aesthetic',
    itemsCount: 4,
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
  },
  {
    curator: '@ananya_cyber',
    lookName: 'Neo-Tokyo Midnight Transit',
    itemsCount: 3,
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80',
  },
];

const StyleCouncil = () => (
  <div className="mt-14">
    <div className="flex items-center justify-between mb-4">
      <h3 className="fx-display text-lg font-medium" style={{ color: 'var(--mood-text)' }}>
        Style Council Picks
      </h3>
      <Eyebrow style={{ color: 'var(--mood-sub)' }}>Curated by your faves</Eyebrow>
    </div>

    <div className="flex gap-4 overflow-x-auto pb-2 fx-scrollbar-none">
      {INFLUENCER_PICKS.map((pick) => (
        <div
          key={pick.curator}
          className="min-w-[240px] border overflow-hidden flex-shrink-0"
          style={{
            background: 'var(--mood-card)',
            borderColor: 'var(--mood-border)',
            borderRadius: 'var(--mood-radius)',
          }}
        >
          <div className="h-36 overflow-hidden">
            <img
              src={pick.img}
              alt={pick.lookName}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <span className="fx-mono text-[10px] font-bold" style={{ color: 'var(--mood-accent)' }}>
              {pick.curator}
            </span>
            <h4 className="text-sm font-semibold mt-1" style={{ color: 'var(--mood-text)' }}>
              {pick.lookName}
            </h4>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px]" style={{ color: 'var(--mood-sub)' }}>
                {pick.itemsCount} items in this look
              </span>
              <IconArrow width={14} height={14} style={{ color: 'var(--mood-accent)' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StyleCouncil;