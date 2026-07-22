import Eyebrow from './Eyebrow';

const WelcomeBlock = () => (
  <div className="mt-7 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
    <div>
      <Eyebrow style={{ color: 'var(--mood-accent)' }}>
        Curated for you · Status: Platinum VIP
      </Eyebrow>
      <h1
        className="fx-display text-3xl md:text-4xl font-medium tracking-tight mt-2"
        style={{ color: 'var(--mood-text)' }}
      >
        Hey Gorgeous, Welcome Back! ✨
      </h1>
    </div>
  </div>
);

export default WelcomeBlock;
