import { IconBell, IconMoon, IconSun } from './Icons';
import Eyebrow from './Eyebrow';

const TopBar = ({ mood, notificationCount, isDarkMode, onToggleDark }) => (
  <div
    className="flex justify-between items-center pb-4 border-b"
    style={{ borderColor: 'var(--mood-border)' }}
  >
    {/* Left: bell + session label */}
    <div className="flex items-center gap-3">
      <button
        aria-label={`Notifications, ${notificationCount} unread`}
        className="relative p-2 rounded-full"
        style={{ color: 'var(--mood-text)' }}
      >
        <IconBell width={18} height={18} />
        {notificationCount > 0 && (
          <span
            className="fx-mono absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
            style={{ background: 'var(--mood-accent)' }}
          >
            {notificationCount}
          </span>
        )}
      </button>
      <span className="fx-mono text-[10px]" style={{ color: 'var(--mood-sub)' }}>
        Signed in · Style Vault synced
      </span>
    </div>

    {/* Right: mood eyebrow + dark toggle */}
    <div className="flex items-center gap-3">
      <Eyebrow style={{ color: 'var(--mood-sub)' }}>{mood.eyebrow}</Eyebrow>
      <button
        onClick={onToggleDark}
        aria-label={isDarkMode ? 'Switch to day mode' : 'Switch to night mode'}
        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
        style={{
          borderColor: 'var(--mood-border)',
          color: 'var(--mood-accent)',
          background: 'var(--mood-card)',
        }}
      >
        {isDarkMode
          ? <IconMoon width={15} height={15} />
          : <IconSun width={15} height={15} />
        }
      </button>
    </div>
  </div>
);

export default TopBar;
