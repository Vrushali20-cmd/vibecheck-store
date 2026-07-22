/**
 * MatchBadge
 * Shows a colour-coded confidence score:
 *  90%+  → green
 *  75–89 → amber
 *  <75   → zinc
 */
const MatchBadge = ({ score }) => {
  const num = parseInt(score, 10) || 0;
  const color =
    num >= 90 ? '#22C55E' :
    num >= 75 ? '#F59E0B' :
               '#A1A1AA';

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
      />
      <span
        className="fx-mono text-[11px] font-bold"
        style={{ color }}
      >
        {score} match
      </span>
    </div>
  );
};

export default MatchBadge;
