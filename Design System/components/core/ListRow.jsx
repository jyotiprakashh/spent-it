import React from 'react';
import { Icon } from './Icon';

/**
 * ListRow — the settings/list workhorse. Tinted leading icon, title + optional
 * subtitle, and a trailing slot (text, custom node, or chevron for navigation).
 */
export function ListRow({
  title,
  subtitle,
  leadingIcon,
  leadingIconColor = 'var(--color-primary)',
  trailingText,
  trailing,
  showChevron = true,
  disabled = false,
  onClick,
  style,
}) {
  const interactive = !!onClick && !disabled;
  const [pressed, setPressed] = React.useState(false);
  return (
    <div
      onClick={interactive ? onClick : undefined}
      onPointerDown={() => interactive && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-three)',
        padding: 'var(--space-three)',
        background: pressed ? 'var(--surface-accent)' : 'transparent',
        cursor: interactive ? 'pointer' : 'default',
        opacity: disabled ? 0.45 : 1,
        transition: 'background 120ms ease',
        ...style,
      }}
    >
      {leadingIcon ? (
        <div
          style={{
            width: 'var(--icon-tint-sm)',
            height: 'var(--icon-tint-sm)',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `color-mix(in srgb, ${leadingIconColor} 13%, transparent)`,
            flexShrink: 0,
          }}
        >
          <Icon name={leadingIcon} size={18} color={leadingIconColor} />
        </div>
      ) : null}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </span>
        {subtitle ? (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {subtitle}
          </span>
        ) : null}
      </div>
      {trailing ? (
        trailing
      ) : trailingText ? (
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-footnote)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)' }}>
          {trailingText}
        </span>
      ) : null}
      {interactive && showChevron ? <Icon name="next" size={18} color="var(--text-secondary)" /> : null}
    </div>
  );
}
