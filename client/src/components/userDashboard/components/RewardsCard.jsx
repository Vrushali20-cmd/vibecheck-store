import Eyebrow from './Eyebrow';

const COUPONS = [
  { code: 'FLASH15', desc: '15% off the Solstice Capsule' },
  { code: 'FIRSTFIT', desc: 'Free virtual try-on kit' },
];

const RewardsCard = () => (
  <div
    className="lg:col-span-4 border p-6 flex flex-col"
    style={{
      background: 'var(--mood-card)',
      borderColor: 'var(--mood-border)',
      borderRadius: 'var(--mood-radius)',
    }}
  >
    <Eyebrow style={{ color: 'var(--mood-accent2)' }}>Rewards Ledger</Eyebrow>
    <h3
      className="fx-display text-lg font-medium mt-1"
      style={{ color: 'var(--mood-text)' }}
    >
      Your Available Coupons
    </h3>

    <p className="fx-mono text-[10px] mt-3" style={{ color: 'var(--mood-sub)' }}>
      Current points:{' '}
      <span className="font-bold" style={{ color: 'var(--mood-accent)' }}>
        1,450 VIBES
      </span>
    </p>

    <div className="mt-4 flex flex-col gap-2">
      {COUPONS.map((c) => (
        <div
          key={c.code}
          className="flex items-center justify-between px-3 py-2 rounded-lg border"
          style={{ borderColor: 'var(--mood-border)' }}
        >
          <span className="fx-mono text-[10px] font-bold" style={{ color: 'var(--mood-accent)' }}>
            {c.code}
          </span>
          <span className="text-[10px] text-right" style={{ color: 'var(--mood-sub)' }}>
            {c.desc}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default RewardsCard;