import React from 'react';
import { Icon } from './Icon';

/**
 * IconButton — compact, icon-only control for headers and toolbars.
 * Defaults to a quiet circular tap target; `tinted` fills it with the
 * primary-subtle wash.
 */
export function IconButton({
  icon,
  size = 40,
  iconSize = 20,
  color = 'var(--text-primary)',
  tinted = false,
  shape = 'circle',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: tinted ? 'var(--color-primary-subtle)' : pressed ? 'var(--surface-card)' : 'transparent',
        color: tinted ? 'var(--color-primary)' : color,
        border: 'none',
        borderRadius: shape === 'circle' ? 'var(--radius-pill)' : 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transform: pressed && !disabled ? 'scale(0.92)' : 'scale(1)',
        transition: 'transform 120ms cubic-bezier(0.2,0.8,0.2,1), background 120ms ease',
        outline: 'none',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
}
