import React from 'react';
import { Icon } from './Icon';

/**
 * Button — SpentIt's primary action control.
 * Filled green primary, neutral secondary, quiet ghost, and a destructive variant.
 * Press state shrinks slightly (the system's one signature motion).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);

  const sizes = {
    sm: { h: 36, px: 14, fs: 13, gap: 6, icon: 16 },
    md: { h: 48, px: 18, fs: 15, gap: 8, icon: 18 },
    lg: { h: 56, px: 22, fs: 16, gap: 8, icon: 20 },
  }[size];

  const variants = {
    primary: { bg: 'var(--color-primary)', fg: 'var(--text-on-primary)', border: 'transparent', pressBg: 'var(--color-primary-press)' },
    secondary: { bg: 'var(--surface-card)', fg: 'var(--text-primary)', border: 'transparent', pressBg: 'var(--surface-accent)' },
    ghost: { bg: 'transparent', fg: 'var(--color-primary)', border: 'transparent', pressBg: 'var(--color-primary-subtle)' },
    danger: { bg: 'transparent', fg: 'var(--expense)', border: 'transparent', pressBg: '#fdeaec' },
  }[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes.gap,
        width: fullWidth ? '100%' : 'auto',
        height: sizes.h,
        padding: `0 ${sizes.px}px`,
        fontFamily: 'var(--font-display)',
        fontSize: sizes.fs,
        fontWeight: 'var(--weight-bold)',
        letterSpacing: '-0.1px',
        color: variants.fg,
        background: pressed && !disabled ? variants.pressBg : variants.bg,
        border: `1px solid ${variants.border}`,
        borderRadius: 'var(--radius-lg)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 120ms cubic-bezier(0.2,0.8,0.2,1), background 120ms ease',
        outline: 'none',
        ...style,
      }}
      {...rest}
    >
      {leftIcon ? <Icon name={leftIcon} size={sizes.icon} /> : null}
      <span>{children}</span>
      {rightIcon ? <Icon name={rightIcon} size={sizes.icon} /> : null}
    </button>
  );
}
