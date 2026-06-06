/* @ds-bundle: {"format":3,"namespace":"SpentItDesignSystem_767bfa","components":[{"name":"AccountCard","sourcePath":"components/core/AccountCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"EmptyState","sourcePath":"components/core/EmptyState.jsx"},{"name":"Fab","sourcePath":"components/core/Fab.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_ALIASES","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ListRow","sourcePath":"components/core/ListRow.jsx"},{"name":"Money","sourcePath":"components/core/Money.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"SearchBar","sourcePath":"components/core/SearchBar.jsx"},{"name":"SectionTitle","sourcePath":"components/core/SectionTitle.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"SwitchRow","sourcePath":"components/core/SwitchRow.jsx"},{"name":"TransactionRow","sourcePath":"components/core/TransactionRow.jsx"}],"sourceHashes":{"components/core/AccountCard.jsx":"9727800f7433","components/core/Badge.jsx":"64b522f4992b","components/core/Button.jsx":"58a510b6612a","components/core/Card.jsx":"42247e594bff","components/core/Chip.jsx":"434656536437","components/core/EmptyState.jsx":"58eefd566784","components/core/Fab.jsx":"16bfb17529b1","components/core/Icon.jsx":"c7af50581e02","components/core/IconButton.jsx":"3881d37e5e07","components/core/Input.jsx":"da444ef05351","components/core/ListRow.jsx":"199146adc77c","components/core/Money.jsx":"44978566d8d3","components/core/ProgressBar.jsx":"6b6a6897dc6d","components/core/SearchBar.jsx":"e301e6690af1","components/core/SectionTitle.jsx":"454e7b4d6985","components/core/SegmentedControl.jsx":"921b3082314f","components/core/Switch.jsx":"24dc132cc8a8","components/core/SwitchRow.jsx":"dee80d39f9ea","components/core/TransactionRow.jsx":"d9ebe64c90db","ui_kits/spentit-app-v2/app.jsx":"7ab66c26732c","ui_kits/spentit-app-v2/components.jsx":"520788135370","ui_kits/spentit-app/AddTransaction.jsx":"c86a4a4713a1","ui_kits/spentit-app/Analytics.jsx":"34d90970d6c1","ui_kits/spentit-app/App.jsx":"838c039f2673","ui_kits/spentit-app/Dashboard.jsx":"bbe22a075931","ui_kits/spentit-app/Onboarding.jsx":"cd9f80865853","ui_kits/spentit-app/Settings.jsx":"78f079747d07","ui_kits/spentit-app/Transactions.jsx":"d2b972fdd5d5","ui_kits/spentit-app/data.jsx":"43da2f580d89","ui_kits/spentit-app/widgets.jsx":"fc1853610359"},"inlinedExternals":[],"unexposedExports":[{"name":"formatCurrency","sourcePath":"components/core/Money.jsx"}]} */

(() => {

const __ds_ns = (window.SpentItDesignSystem_767bfa = window.SpentItDesignSystem_767bfa || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — a small status pill. Tones map to the semantic palette; the default
 * uses the neutral card fill. Use for counts, states, and tiny labels.
 */
function Badge({
  children,
  tone = 'neutral',
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: 'var(--surface-card)',
      fg: 'var(--text-secondary)'
    },
    primary: {
      bg: 'var(--color-primary-subtle)',
      fg: 'var(--color-primary)'
    },
    income: {
      bg: 'var(--green-subtle)',
      fg: 'var(--income)'
    },
    expense: {
      bg: '#fdeaec',
      fg: 'var(--expense)'
    },
    warning: {
      bg: '#fdf3e3',
      fg: 'var(--warning)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 10px',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-semibold)',
      color: tones.fg,
      background: tones.bg,
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the surface every grouped content block sits on.
 * Flat fill (no shadow), 14px radius, clips its children. Set `padded={false}`
 * when the card hosts full-bleed rows (e.g. a transaction list).
 */
function Card({
  children,
  padded = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      padding: padded ? 'var(--space-three)' : 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SpentIt icon set — Lucide outline glyphs, inlined as SVG so they render
 * offline and in static export. Stroke 2, round caps, 24x24, currentColor.
 * Add semantic aliases below to mirror the app's category vocabulary.
 */
const PATHS = {
  "shopping-cart": '<circle cx="8" cy="21" r="1"></circle> <circle cx="19" cy="21" r="1"></circle> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>',
  "utensils": '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path> <path d="M7 2v20"></path> <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>',
  "car": '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path> <circle cx="7" cy="17" r="2"></circle> <path d="M9 17h6"></path> <circle cx="17" cy="17" r="2"></circle>',
  "house": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
  "wallet": '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path> <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>',
  "gift": '<path d="M12 7v14"></path> <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path> <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"></path> <rect x="3" y="7" width="18" height="4" rx="1"></rect>',
  "heart-pulse": '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path> <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>',
  "plus": '<path d="M5 12h14"></path> <path d="M12 5v14"></path>',
  "search": '<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle>',
  "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
  "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
  "x": '<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path>',
  "lock": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  "scan-face": '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path> <path d="M17 3h2a2 2 0 0 1 2 2v2"></path> <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path> <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path> <path d="M8 14s1.5 2 4 2 4-2 4-2"></path> <path d="M9 9h.01"></path> <path d="M15 9h.01"></path>',
  "cloud-upload": '<path d="M12 13v8"></path> <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path> <path d="m8 17 4-4 4 4"></path>',
  "cloud-download": '<path d="M12 13v8l-4-4"></path> <path d="m12 21 4-4"></path> <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"></path>',
  "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1"></rect> <rect width="7" height="7" x="14" y="3" rx="1"></rect> <rect width="7" height="7" x="14" y="14" rx="1"></rect> <rect width="7" height="7" x="3" y="14" rx="1"></rect>',
  "chart-pie": '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path> <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>',
  "banknote": '<rect width="20" height="12" x="2" y="6" rx="2"></rect> <circle cx="12" cy="12" r="2"></circle> <path d="M6 12h.01M18 12h.01"></path>',
  "moon": '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>',
  "bug": '<path d="M12 20v-9"></path> <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"></path> <path d="M14.12 3.88 16 2"></path> <path d="M21 21a4 4 0 0 0-3.81-4"></path> <path d="M21 5a4 4 0 0 1-3.55 3.97"></path> <path d="M22 13h-4"></path> <path d="M3 21a4 4 0 0 1 3.81-4"></path> <path d="M3 5a4 4 0 0 0 3.55 3.97"></path> <path d="M6 13H2"></path> <path d="m8 2 1.88 1.88"></path> <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"></path>',
  "info": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 16v-4"></path> <path d="M12 8h.01"></path>',
  "settings": '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path> <circle cx="12" cy="12" r="3"></circle>',
  "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16"></path> <path d="M18 17V9"></path> <path d="M13 17V5"></path> <path d="M8 17v-3"></path>',
  "trending-up": '<path d="M16 7h6v6"></path> <path d="m22 7-8.5 8.5-5-5L2 17"></path>',
  "receipt": '<path d="M12 17V7"></path> <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"></path> <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"></path>',
  "arrow-left": '<path d="m12 19-7-7 7-7"></path> <path d="M19 12H5"></path>',
  "ellipsis": '<circle cx="12" cy="12" r="1"></circle> <circle cx="19" cy="12" r="1"></circle> <circle cx="5" cy="12" r="1"></circle>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "delete": '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path> <path d="m12 9 6 6"></path> <path d="m18 9-6 6"></path>',
  "calendar": '<path d="M8 2v4"></path> <path d="M16 2v4"></path> <rect width="18" height="18" x="3" y="4" rx="2"></rect> <path d="M3 10h18"></path>',
  "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path> <path d="m15 5 4 4"></path>',
  "trash-2": '<path d="M10 11v6"></path> <path d="M14 11v6"></path> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path> <path d="M3 6h18"></path> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  "bus": '<path d="M8 6v6"></path> <path d="M15 6v6"></path> <path d="M2 12h19.6"></path> <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path> <circle cx="7" cy="18" r="2"></circle> <path d="M9 18h5"></path> <circle cx="16" cy="18" r="2"></circle>',
  "film": '<rect width="18" height="18" x="3" y="3" rx="2"></rect> <path d="M7 3v18"></path> <path d="M3 7.5h4"></path> <path d="M3 12h18"></path> <path d="M3 16.5h4"></path> <path d="M17 3v18"></path> <path d="M17 7.5h4"></path> <path d="M17 16.5h4"></path>',
  "shopping-bag": '<path d="M16 10a4 4 0 0 1-8 0"></path> <path d="M3.103 6.034h17.794"></path> <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>',
  "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>',
  "smartphone": '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect> <path d="M12 18h.01"></path>',
  "coffee": '<path d="M10 2v2"></path> <path d="M14 2v2"></path> <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path> <path d="M6 2v2"></path>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path>'
};

// Semantic aliases used across the product UI.
const ALIASES = {
  groceries: 'shopping-cart',
  food: 'utensils',
  dining: 'coffee',
  transport: 'bus',
  car: 'car',
  rent: 'house',
  home: 'house',
  salary: 'banknote',
  income: 'trending-up',
  shopping: 'shopping-bag',
  gifts: 'gift',
  health: 'heart-pulse',
  bills: 'zap',
  phone: 'smartphone',
  entertainment: 'film',
  add: 'plus',
  back: 'arrow-left',
  next: 'chevron-right',
  prev: 'chevron-left',
  close: 'x',
  more: 'ellipsis',
  biometric: 'scan-face',
  backup: 'cloud-upload',
  restore: 'cloud-download',
  categories: 'layout-grid',
  budgets: 'chart-pie',
  analytics: 'chart-column',
  currency: 'banknote',
  theme: 'moon',
  accounts: 'wallet',
  edit: 'pencil',
  trash: 'trash-2',
  secure: 'shield-check'
};
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  strokeWidth = 2,
  style,
  ...rest
}) {
  const key = ALIASES[name] || name;
  const inner = PATHS[key] || PATHS['receipt'];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}
const ICON_NAMES = Object.keys(PATHS);
const ICON_ALIASES = ALIASES;
Object.assign(__ds_scope, { Icon, ICON_NAMES, ICON_ALIASES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — SpentIt's primary action control.
 * Filled green primary, neutral secondary, quiet ghost, and a destructive variant.
 * Press state shrinks slightly (the system's one signature motion).
 */
function Button({
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
    sm: {
      h: 36,
      px: 14,
      fs: 13,
      gap: 6,
      icon: 16
    },
    md: {
      h: 48,
      px: 18,
      fs: 15,
      gap: 8,
      icon: 18
    },
    lg: {
      h: 56,
      px: 22,
      fs: 16,
      gap: 8,
      icon: 20
    }
  }[size];
  const variants = {
    primary: {
      bg: 'var(--color-primary)',
      fg: 'var(--text-on-primary)',
      border: 'transparent',
      pressBg: 'var(--color-primary-press)'
    },
    secondary: {
      bg: 'var(--surface-card)',
      fg: 'var(--text-primary)',
      border: 'transparent',
      pressBg: 'var(--surface-accent)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--color-primary)',
      border: 'transparent',
      pressBg: 'var(--color-primary-subtle)'
    },
    danger: {
      bg: 'transparent',
      fg: 'var(--expense)',
      border: 'transparent',
      pressBg: '#fdeaec'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
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
      ...style
    }
  }, rest), leftIcon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leftIcon,
    size: sizes.icon
  }) : null, /*#__PURE__*/React.createElement("span", null, children), rightIcon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: rightIcon,
    size: sizes.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — a pill-shaped filter / selection token. Selected state fills with the
 * primary-subtle wash and switches the label to green. Used in filter rows.
 */
function Chip({
  label,
  icon,
  selected = false,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "aria-pressed": selected,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 34,
      padding: '0 14px',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-footnote)',
      fontWeight: 'var(--weight-semibold)',
      color: selected ? 'var(--color-primary)' : 'var(--text-secondary)',
      background: selected ? 'var(--color-primary-subtle)' : 'var(--surface-card)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      transition: 'background 120ms ease, color 120ms ease',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  }) : null, label);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/EmptyState.jsx
try { (() => {
/**
 * EmptyState — the centered placeholder for empty lists and charts. Quiet icon
 * in a neutral circle, a title, and an optional one-line hint.
 */
function EmptyState({
  icon = 'receipt',
  title,
  subtitle,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-two)',
      padding: 'var(--space-four)',
      textAlign: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--icon-tint-lg)',
      height: 'var(--icon-tint-lg)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--space-two)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 32,
    color: "var(--text-secondary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-callout)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-footnote)',
      color: 'var(--text-secondary)',
      maxWidth: 260,
      lineHeight: 1.45
    }
  }, subtitle) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/Fab.jsx
try { (() => {
/**
 * Fab — the floating add button. 56px green circle, the only element in the
 * system that carries a drop shadow. Shrinks on press.
 */
function Fab({
  icon = 'add',
  onClick,
  'aria-label': ariaLabel = 'Add',
  style
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": ariaLabel,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      width: 'var(--control-fab)',
      height: 'var(--control-fab)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-primary)',
      color: 'var(--text-on-primary)',
      border: 'none',
      boxShadow: 'var(--shadow-fab)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transform: pressed ? 'scale(0.92)' : 'scale(1)',
      transition: 'transform 140ms cubic-bezier(0.2,0.8,0.2,1)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28,
    strokeWidth: 2.4
  }));
}
Object.assign(__ds_scope, { Fab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Fab.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — compact, icon-only control for headers and toolbars.
 * Defaults to a quiet circular tap target; `tinted` fills it with the
 * primary-subtle wash.
 */
function IconButton({
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
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field on the neutral card fill, optional leading icon.
 * Focus lifts the border to the primary green. Pair with a label above it.
 */
function Input({
  value,
  onChange,
  placeholder,
  leadingIcon,
  type = 'text',
  disabled = false,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-two)',
      height: 48,
      padding: '0 var(--space-three)',
      background: 'var(--surface-card)',
      border: `1.5px solid ${focused ? 'var(--color-primary)' : 'transparent'}`,
      borderRadius: 'var(--radius-md)',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color 120ms ease',
      ...style
    }
  }, leadingIcon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leadingIcon,
    size: 18,
    color: "var(--text-secondary)"
  }) : null, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-body)',
      color: 'var(--text-primary)',
      minWidth: 0
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ListRow.jsx
try { (() => {
/**
 * ListRow — the settings/list workhorse. Tinted leading icon, title + optional
 * subtitle, and a trailing slot (text, custom node, or chevron for navigation).
 */
function ListRow({
  title,
  subtitle,
  leadingIcon,
  leadingIconColor = 'var(--color-primary)',
  trailingText,
  trailing,
  showChevron = true,
  disabled = false,
  onClick,
  style
}) {
  const interactive = !!onClick && !disabled;
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: interactive ? onClick : undefined,
    onPointerDown: () => interactive && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-three)',
      padding: 'var(--space-three)',
      background: pressed ? 'var(--surface-accent)' : 'transparent',
      cursor: interactive ? 'pointer' : 'default',
      opacity: disabled ? 0.45 : 1,
      transition: 'background 120ms ease',
      ...style
    }
  }, leadingIcon ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--icon-tint-sm)',
      height: 'var(--icon-tint-sm)',
      borderRadius: 'var(--radius-pill)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `color-mix(in srgb, ${leadingIconColor} 13%, transparent)`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leadingIcon,
    size: 18,
    color: leadingIconColor
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, subtitle) : null), trailing ? trailing : trailingText ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-footnote)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-secondary)'
    }
  }, trailingText) : null, interactive && showChevron ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "next",
    size: 18,
    color: "var(--text-secondary)"
  }) : null);
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Money.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};
function formatCurrency(value, currency = 'INR') {
  const symbol = SYMBOLS[currency] ?? '';
  const abs = Math.abs(value);
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  const hasDecimals = abs % 1 !== 0;
  const formatted = abs.toLocaleString(locale, {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2
  });
  return symbol ? `${symbol}${formatted}` : formatted;
}

/**
 * Money — the typographic treatment for every currency value.
 * Tightened numerals (-0.2 tracking); tone maps to the semantic palette
 * (income green, expense red, muted grey). `signed` prepends + for positives.
 */
function Money({
  value,
  currency = 'INR',
  tone = 'default',
  size = 16,
  weight = 600,
  signed = false,
  style,
  ...rest
}) {
  const color = {
    default: 'var(--text-primary)',
    income: 'var(--income)',
    expense: 'var(--expense)',
    muted: 'var(--text-secondary)'
  }[tone];
  const prefix = signed ? value > 0 ? '+ ' : value < 0 ? '− ' : '' : value < 0 ? '− ' : '';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size,
      fontWeight: weight,
      letterSpacing: 'var(--tracking-money)',
      color,
      whiteSpace: 'nowrap',
      fontVariantNumeric: 'tabular-nums',
      ...style
    }
  }, rest), prefix, formatCurrency(value, currency));
}
Object.assign(__ds_scope, { formatCurrency, Money });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Money.jsx", error: String((e && e.message) || e) }); }

// components/core/AccountCard.jsx
try { (() => {
/**
 * AccountCard — the horizontally-scrolled balance card on the dashboard.
 * 130px wide; selecting it draws a 2px border in the account's accent color.
 * Pass `account=null` to render the "All" rollup.
 */
function AccountCard({
  account,
  totalNetWorth = 0,
  selected = false,
  onClick,
  style
}) {
  const isAll = account == null;
  const name = isAll ? 'All' : account.name;
  const balance = isAll ? totalNetWorth : account.balance;
  const accent = isAll ? 'var(--color-primary)' : account.color || 'var(--color-primary)';
  const icon = isAll ? 'layout-grid' : account.icon || 'wallet';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      width: 130,
      flexShrink: 0,
      padding: 'var(--space-three)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-card)',
      border: `2px solid ${selected ? accent : 'transparent'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-one)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 140ms ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-pill)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `color-mix(in srgb, ${accent} 13%, transparent)`,
      marginBottom: 'var(--space-one)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: accent
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-footnote)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement(__ds_scope.Money, {
    value: balance,
    currency: isAll ? 'INR' : account.currency || 'INR',
    tone: balance < 0 ? 'expense' : 'default',
    size: 13,
    weight: 600
  }));
}
Object.assign(__ds_scope, { AccountCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AccountCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
/**
 * ProgressBar — budget consumption track. Fill color shifts with thresholds:
 * green under 80%, amber 80–99%, red at/over 100%. Rounded, 8px tall.
 */
function ProgressBar({
  value = 0,
  max = 100,
  height = 8,
  color,
  style
}) {
  const pct = max > 0 ? Math.min(100, value / max * 100) : 0;
  const ratio = max > 0 ? value / max : 0;
  const fill = color || (ratio >= 1 ? 'var(--expense)' : ratio >= 0.8 ? 'var(--warning)' : 'var(--color-primary)');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      background: 'var(--line)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: fill,
      borderRadius: 'var(--radius-pill)',
      transition: 'width 320ms cubic-bezier(0.2,0.8,0.2,1)'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SearchBar.jsx
try { (() => {
/**
 * SearchBar — the transactions search field: search glyph, live input, clear.
 * Sits on the neutral card fill with a pill-soft 12px radius.
 */
function SearchBar({
  value,
  onChange,
  onClose,
  placeholder = 'Search notes or categories',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-two)',
      height: 44,
      padding: '0 var(--space-three)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    autoFocus: true,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-body)',
      color: 'var(--text-primary)',
      minWidth: 0
    }
  }), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close search",
    style: {
      display: 'flex',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 18,
    color: "var(--text-secondary)"
  })) : null);
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionTitle — the uppercase overline that labels every block
 * (THIS MONTH, RECENT, SPENDING). 11px / 700 / +0.6 tracking, secondary ink.
 */
function SectionTitle({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-overline)',
      fontWeight: 'var(--weight-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-overline)',
      color: 'var(--text-secondary)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/**
 * SegmentedControl — the inline pill toggle (Expense / Income, ranges, etc.).
 * The selected segment lifts onto a white surface; income/expense options can
 * tint their label via the `tone` field. 2–3 options.
 */
function SegmentedControl({
  options,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 4,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, options.map(opt => {
    const selected = opt.value === value;
    const fg = selected ? opt.tone === 'income' ? 'var(--income)' : opt.tone === 'expense' ? 'var(--expense)' : 'var(--text-primary)' : 'var(--text-secondary)';
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      onClick: () => onChange && onChange(opt.value),
      "aria-pressed": selected,
      style: {
        minWidth: 100,
        padding: '8px 22px',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        background: selected ? 'var(--surface-raised)' : 'transparent',
        boxShadow: selected ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-body)',
        fontWeight: 'var(--weight-semibold)',
        color: fg,
        cursor: 'pointer',
        transition: 'background 140ms ease, color 140ms ease'
      }
    }, opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
/**
 * Switch — iOS-style toggle. Off is the neutral track; on fills with the
 * primary green. The thumb slides with the system's soft spring easing.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 50,
      height: 30,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      padding: 2,
      background: checked ? 'var(--color-primary)' : 'var(--line)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background 180ms ease',
      display: 'flex',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
      transition: 'transform 180ms cubic-bezier(0.2,0.8,0.2,1)'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/SwitchRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SwitchRow — a ListRow whose trailing slot is a Switch. The whole row is
 * informational; only the switch toggles. Used for Biometric lock, etc.
 */
function SwitchRow({
  checked,
  onChange,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.ListRow, _extends({}, rest, {
    showChevron: false,
    trailing: /*#__PURE__*/React.createElement(__ds_scope.Switch, {
      checked: checked,
      onChange: onChange
    })
  }));
}
Object.assign(__ds_scope, { SwitchRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SwitchRow.jsx", error: String((e && e.message) || e) }); }

// components/core/TransactionRow.jsx
try { (() => {
/**
 * TransactionRow — one line in any transaction list. Category glyph in a tinted
 * circle, category name over a note/account subtitle, and the signed amount.
 * 60px tall, full-bleed (lives inside a non-padded Card).
 */
function TransactionRow({
  tx,
  onClick,
  style
}) {
  const [pressed, setPressed] = React.useState(false);
  const isIncome = tx.type === 'income';
  const signed = isIncome ? tx.amount : -tx.amount;
  const subtitle = tx.note && tx.note.trim() !== '' ? tx.note : tx.account;
  const color = tx.color || 'var(--text-secondary)';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-three)',
      height: 60,
      padding: '0 var(--space-three)',
      background: pressed ? 'var(--surface-accent)' : 'var(--surface-raised)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 120ms ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--icon-tint-md)',
      height: 'var(--icon-tint-md)',
      borderRadius: 'var(--radius-pill)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `color-mix(in srgb, ${color} 13%, transparent)`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: tx.icon,
    size: 20,
    color: color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, tx.category), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-footnote)',
      color: 'var(--text-secondary)',
      marginTop: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, subtitle)), /*#__PURE__*/React.createElement(__ds_scope.Money, {
    value: signed,
    currency: tx.currency || 'INR',
    tone: isIncome ? 'income' : 'expense',
    size: 15,
    signed: true
  }));
}
Object.assign(__ds_scope, { TransactionRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TransactionRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app-v2/app.jsx
try { (() => {
/* SpentIt v2 — screens + app shell */
const {
  Icon,
  Btn,
  Card,
  Money,
  fmtMoney,
  Label,
  Toggle,
  Segment,
  Row,
  TxnRow,
  Chip,
  Fab,
  Bar,
  Empty
} = window;

// ===== MOCK DATA =====
const CAT = {
  groceries: {
    name: 'Groceries',
    icon: 'groceries'
  },
  dining: {
    name: 'Dining',
    icon: 'dining'
  },
  transport: {
    name: 'Transport',
    icon: 'transport'
  },
  rent: {
    name: 'Rent',
    icon: 'rent'
  },
  shopping: {
    name: 'Shopping',
    icon: 'shopping'
  },
  health: {
    name: 'Health',
    icon: 'health'
  },
  entertainment: {
    name: 'Entertainment',
    icon: 'entertainment'
  },
  bills: {
    name: 'Bills',
    icon: 'bills'
  },
  phone: {
    name: 'Phone',
    icon: 'phone'
  },
  salary: {
    name: 'Salary',
    icon: 'salary'
  }
};
const ACCOUNTS = [{
  id: 1,
  name: 'Cash',
  icon: 'wallet',
  balance: 5400
}, {
  id: 2,
  name: 'HDFC',
  icon: 'banknote',
  balance: 72180
}, {
  id: 3,
  name: 'Card',
  icon: 'receipt',
  balance: 6740
}];
const TXNS = [{
  id: 1,
  type: 'expense',
  cat: 'groceries',
  amount: 1240,
  note: 'BigBasket',
  account: 'HDFC',
  date: 'Today'
}, {
  id: 2,
  type: 'expense',
  cat: 'dining',
  amount: 560,
  note: 'Blue Tokai',
  account: 'Card',
  date: 'Today'
}, {
  id: 3,
  type: 'expense',
  cat: 'transport',
  amount: 80,
  note: 'Metro',
  account: 'Cash',
  date: 'Today'
}, {
  id: 4,
  type: 'income',
  cat: 'salary',
  amount: 62000,
  note: 'June salary',
  account: 'HDFC',
  date: 'Yesterday'
}, {
  id: 5,
  type: 'expense',
  cat: 'shopping',
  amount: 2399,
  note: 'Running shoes',
  account: 'Card',
  date: 'Yesterday'
}, {
  id: 6,
  type: 'expense',
  cat: 'bills',
  amount: 899,
  note: 'Electricity',
  account: 'HDFC',
  date: 'Yesterday'
}, {
  id: 7,
  type: 'expense',
  cat: 'rent',
  amount: 18000,
  note: 'Flat rent',
  account: 'HDFC',
  date: '3 Jun'
}, {
  id: 8,
  type: 'expense',
  cat: 'health',
  amount: 640,
  note: 'Pharmacy',
  account: 'Cash',
  date: '3 Jun'
}, {
  id: 9,
  type: 'expense',
  cat: 'entertainment',
  amount: 499,
  note: 'Cinema',
  account: 'Card',
  date: '2 Jun'
}, {
  id: 10,
  type: 'expense',
  cat: 'phone',
  amount: 299,
  note: 'Recharge',
  account: 'HDFC',
  date: '2 Jun'
}, {
  id: 11,
  type: 'expense',
  cat: 'groceries',
  amount: 760,
  note: 'Vegetables',
  account: 'Cash',
  date: '1 Jun'
}];
const SPENDING = [{
  cat: 'rent',
  total: 18000
}, {
  cat: 'groceries',
  total: 8400
}, {
  cat: 'dining',
  total: 5600
}, {
  cat: 'shopping',
  total: 4399
}, {
  cat: 'bills',
  total: 3100
}, {
  cat: 'transport',
  total: 1900
}];
const MONTHLY = [{
  m: 'Jan',
  v: 41200
}, {
  m: 'Feb',
  v: 38600
}, {
  m: 'Mar',
  v: 45100
}, {
  m: 'Apr',
  v: 39800
}, {
  m: 'May',
  v: 43900
}, {
  m: 'Jun',
  v: 41497
}];
const SUMMARY = {
  income: 62000,
  expense: 41497,
  net: 20503,
  netWorth: 84320
};

// ===== CHROME =====
function StatusBar({
  light
}) {
  const c = light ? '#fff' : '#0C0C0C';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 54,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 22px 8px',
      flexShrink: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 34,
      background: '#111',
      borderRadius: 18,
      zIndex: 10
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: c,
      letterSpacing: -0.2
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: c
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "10",
    viewBox: "0 0 16 10",
    fill: c
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6",
    width: "3",
    height: "4",
    rx: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.3",
    y: "4",
    width: "3",
    height: "6",
    rx: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8.6",
    y: "2",
    width: "3",
    height: "8",
    rx: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12.9",
    y: "0",
    width: "3",
    height: "10",
    rx: "0.8"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "11",
    viewBox: "0 0 24 11",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "20",
    height: "10",
    rx: "2.5",
    stroke: c,
    strokeOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "15",
    height: "7",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "3.5",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: c,
    fillOpacity: "0.4"
  }))));
}
function MonthSel({
  label = 'June 2026',
  onP,
  onN,
  noNext
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '6px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onP,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 6,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "prev",
    size: 20,
    color: "#0C0C0C"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: -0.2,
      color: '#0C0C0C',
      minWidth: 120,
      textAlign: 'center'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    onClick: onN,
    disabled: noNext,
    style: {
      background: 'none',
      border: 'none',
      cursor: noNext ? 'default' : 'pointer',
      padding: 6,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 20,
    color: noNext ? '#C0C0C0' : '#0C0C0C'
  })));
}

// ===== ONBOARDING =====
const SLIDES = [{
  icon: 'lock',
  title: 'Your money,\nnever shared',
  body: 'No accounts. No cloud. No tracking. SpentIt is 100% offline — your data never leaves your phone.'
}, {
  icon: 'add',
  title: 'Log in seconds',
  body: 'Tap +, pick a category, type an amount. That\'s it.'
}, {
  icon: 'backup',
  title: 'Back up on\nyour terms',
  body: 'Create an encrypted backup you control. We\'ll remind you weekly.'
}];
function Onboarding({
  onDone
}) {
  const [i, setI] = React.useState(0);
  const s = SLIDES[i];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '8px 18px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 600,
      color: '#8A8A8A'
    }
  }, "Skip")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 36px',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 24,
      background: '#E8FBF5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 38,
    color: "#00D09C",
    sw: 1.5
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 28px',
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: -0.5,
      color: '#0C0C0C',
      textAlign: 'center',
      whiteSpace: 'pre-line',
      lineHeight: 1.2
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: '#8A8A8A',
      textAlign: 'center',
      maxWidth: 260
    }
  }, s.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 6
    }
  }, SLIDES.map((_, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      width: k === i ? 20 : 6,
      height: 6,
      borderRadius: 3,
      background: k === i ? '#00D09C' : '#E0E0E0',
      transition: 'all 220ms ease'
    }
  }))), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: () => i < SLIDES.length - 1 ? setI(i + 1) : onDone()
  }, i === SLIDES.length - 1 ? 'Get started' : 'Continue')));
}

// ===== DASHBOARD =====
function Dashboard({
  onAdd,
  onTxns,
  onCat
}) {
  const [acct, setAcct] = React.useState(null);
  const total = SPENDING.reduce((a, s) => a + s.total, 0);
  const maxSpend = SPENDING[0].total;
  const recent = TXNS.slice(0, 4);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(MonthSel, {
    noNext: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      flex: 1,
      paddingBottom: 90
    },
    className: "ns"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 16px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Net worth"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 800,
      letterSpacing: -1.5,
      color: '#0C0C0C',
      lineHeight: 1.1,
      margin: '6px 0 12px'
    }
  }, "\u20B9", SUMMARY.netWorth.toLocaleString('en-IN')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: '#8A8A8A',
      marginBottom: 3
    }
  }, "Income"), /*#__PURE__*/React.createElement(Money, {
    value: SUMMARY.income,
    tone: "income",
    size: 16,
    weight: 700
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 36,
      background: '#EBEBEB',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: '#8A8A8A',
      marginBottom: 3
    }
  }, "Expenses"), /*#__PURE__*/React.createElement(Money, {
    value: SUMMARY.expense,
    tone: "default",
    size: 16,
    weight: 700
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 36,
      background: '#EBEBEB',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: '#8A8A8A',
      marginBottom: 3
    }
  }, "Saved"), /*#__PURE__*/React.createElement(Money, {
    value: SUMMARY.net,
    tone: "income",
    size: 16,
    weight: 700,
    signed: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '0 16px 16px',
      overflowX: 'auto'
    },
    className: "ns"
  }, [{
    id: null,
    name: 'All',
    icon: 'layout-grid',
    balance: SUMMARY.netWorth
  }, ...ACCOUNTS].map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id ?? 'all',
    onClick: () => setAcct(a.id),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      padding: '10px 12px',
      minWidth: 90,
      background: '#fff',
      border: `1.5px solid ${acct === a.id ? '#00D09C' : '#EBEBEB'}`,
      borderRadius: 12,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      background: acct === a.id ? '#E8FBF5' : '#F4F4F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 15,
    color: acct === a.id ? '#00D09C' : '#8A8A8A'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 600,
      color: acct === a.id ? '#00D09C' : '#6B6B6B'
    }
  }, a.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 700,
      color: '#0C0C0C',
      letterSpacing: -0.2
    }
  }, "\u20B9", (a.balance / 1000).toFixed(1), "k")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Spending this month"), /*#__PURE__*/React.createElement(Money, {
    value: total,
    size: 13,
    weight: 600,
    tone: "muted"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, SPENDING.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.cat,
    onClick: () => onCat(s.cat),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: '#F2F2F2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: CAT[s.cat].icon,
    size: 15,
    color: "#6B6B6B"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 500,
      color: '#0C0C0C',
      minWidth: 72,
      flexShrink: 0
    }
  }, CAT[s.cat].name), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: '#EFEFEF',
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${s.total / maxSpend * 100}%`,
      height: '100%',
      background: '#00D09C',
      borderRadius: 2
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 600,
      color: '#8A8A8A',
      minWidth: 52,
      textAlign: 'right'
    }
  }, "\u20B9", (s.total / 1000).toFixed(1), "k")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    pad: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 14px 10px'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Recent"), /*#__PURE__*/React.createElement("button", {
    onClick: onTxns,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 600,
      color: '#00D09C',
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, "See all ", /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 13,
    color: "#00D09C"
  }))), recent.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: t.id
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#F4F4F4',
      margin: '0 16px'
    }
  }), /*#__PURE__*/React.createElement(TxnRow, {
    tx: {
      category: CAT[t.cat].name,
      icon: CAT[t.cat].icon,
      note: t.note,
      account: t.account,
      amount: t.amount,
      type: t.type
    },
    onClick: onTxns
  })))))), /*#__PURE__*/React.createElement(Fab, {
    onClick: onAdd
  }));
}

// ===== TRANSACTIONS =====
function Transactions({
  onAdd,
  initCat
}) {
  const [acct, setAcct] = React.useState(null);
  const [cat, setCat] = React.useState(initCat || null);
  const [q, setQ] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const rows = TXNS.filter(t => (!acct || t.account === acct) && (!cat || t.cat === cat) && (!q || t.note.toLowerCase().includes(q.toLowerCase()) || CAT[t.cat].name.toLowerCase().includes(q.toLowerCase())));
  const groups = [];
  rows.forEach(t => {
    let g = groups.find(x => x.d === t.date);
    if (!g) {
      g = {
        d: t.date,
        items: []
      };
      groups.push(g);
    }
    g.items.push(t);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 6px',
      flexShrink: 0
    }
  }, cat && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCat(null),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      borderRadius: 16,
      border: '1px solid #E4E4E4',
      background: '#F8F8F8',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 600,
      color: '#0C0C0C'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: CAT[cat].icon,
    size: 13,
    color: "#6B6B6B"
  }), CAT[cat].name, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 13,
    color: "#8A8A8A"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 8,
      overflowX: 'auto'
    },
    className: "ns"
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "All",
    sel: !acct,
    onClick: () => setAcct(null)
  }), ACCOUNTS.map(a => /*#__PURE__*/React.createElement(Chip, {
    key: a.id,
    label: a.name,
    sel: acct === a.name,
    onClick: () => setAcct(a.name === acct ? null : a.name)
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSearch(!search);
      setQ('');
    },
    style: {
      width: 36,
      height: 36,
      borderRadius: 18,
      border: '1px solid #E4E4E4',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: search ? 'close' : 'search',
    size: 17,
    color: "#6B6B6B"
  }))), search && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
      padding: '8px 12px',
      background: '#F4F4F4',
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    color: "#8A8A8A"
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search transactions",
    autoFocus: true,
    style: {
      flex: 1,
      border: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      color: '#0C0C0C',
      outline: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 90
    },
    className: "ns"
  }, groups.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Empty, {
    icon: "receipt",
    title: "No transactions",
    sub: "Try a different filter or tap + to add one"
  })) : groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.d
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 16px 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: '#8A8A8A'
    }
  }, g.d), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 600,
      color: '#8A8A8A'
    }
  }, (() => {
    const n = g.items.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0);
    return (n >= 0 ? '+₹' : '−₹') + Math.abs(n).toLocaleString('en-IN');
  })())), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #EBEBEB',
      margin: '0 16px 8px',
      overflow: 'hidden'
    }
  }, g.items.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: t.id
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#F4F4F4',
      margin: '0 16px'
    }
  }), /*#__PURE__*/React.createElement(TxnRow, {
    tx: {
      category: CAT[t.cat].name,
      icon: CAT[t.cat].icon,
      note: t.note,
      account: t.account,
      amount: t.amount,
      type: t.type
    },
    onClick: () => {}
  }))))))), /*#__PURE__*/React.createElement(Fab, {
    onClick: onAdd
  }));
}

// ===== ADD TRANSACTION =====
const CATS_EXP = ['groceries', 'dining', 'transport', 'rent', 'shopping', 'health', 'entertainment', 'bills'];
const CATS_INC = ['salary'];
function AddTxn({
  onClose,
  onSave
}) {
  const [type, setType] = React.useState('expense');
  const [amt, setAmt] = React.useState('0');
  const [cat, setCat] = React.useState('groceries');
  const [acct, setAcct] = React.useState('HDFC');
  const [note, setNote] = React.useState('');
  const cats = type === 'expense' ? CATS_EXP : CATS_INC;
  React.useEffect(() => setCat(cats[0]), [type]);
  const press = k => setAmt(cur => {
    if (k === 'back') return cur.length <= 1 ? '0' : cur.slice(0, -1);
    if (k === '.') return cur.includes('.') ? cur : cur + '.';
    if (cur === '0') return k;
    if (cur.includes('.') && cur.split('.')[1].length >= 2) return cur;
    return cur + k;
  });
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];
  const isEmpty = amt === '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px 4px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 36,
      height: 36,
      borderRadius: 18,
      border: 'none',
      background: '#F4F4F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 18,
    color: "#6B6B6B"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      fontWeight: 700,
      color: '#0C0C0C'
    }
  }, "New entry"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(Segment, {
    value: type,
    onChange: setType,
    options: [{
      value: 'expense',
      label: 'Expense',
      tone: 'expense'
    }, {
      value: 'income',
      label: 'Income',
      tone: 'income'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '12px 0 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 48,
      fontWeight: 800,
      letterSpacing: -2,
      color: isEmpty ? '#D0D0D0' : '#0C0C0C'
    }
  }, "\u20B9", amt)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      padding: '0 16px 16px',
      overflowX: 'auto'
    },
    className: "ns"
  }, cats.map(k => {
    const sel = cat === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setCat(k),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: sel ? '#00D09C' : '#F2F2F2',
        border: sel ? 'none' : '1.5px solid transparent',
        transition: 'background 120ms ease'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: CAT[k].icon,
      size: 20,
      color: sel ? '#fff' : '#8A8A8A'
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 600,
        color: sel ? '#00D09C' : '#8A8A8A',
        letterSpacing: 0.2
      }
    }, CAT[k].name));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 16px 10px',
      padding: '2px 0',
      background: '#F8F8F8',
      borderRadius: 12,
      border: '1px solid #EBEBEB'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pencil",
    size: 16,
    color: "#A0A0A0"
  }), /*#__PURE__*/React.createElement("input", {
    value: note,
    onChange: e => setNote(e.target.value),
    placeholder: "Add a note",
    style: {
      flex: 1,
      border: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      color: '#0C0C0C',
      outline: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#EBEBEB',
      margin: '0 14px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAcct(acct === 'HDFC' ? 'Cash' : 'HDFC'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wallet",
    size: 16,
    color: "#A0A0A0"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: '#0C0C0C'
    }
  }, acct), /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 14,
    color: "#C8C8C8",
    style: {
      marginLeft: 'auto'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 12px 10px',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8
    }
  }, KEYS.map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => press(k),
    style: {
      height: 50,
      borderRadius: 12,
      border: '1px solid #F0F0F0',
      background: '#FAFAFA',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 500,
      color: '#0C0C0C',
      transition: 'background 80ms ease'
    }
  }, k === 'back' ? /*#__PURE__*/React.createElement(Icon, {
    name: "delete",
    size: 20,
    color: "#6B6B6B"
  }) : k))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: () => onSave({
      type,
      amt,
      cat,
      acct,
      note
    })
  }, type === 'income' ? 'Add income' : 'Add expense'))));
}

// ===== ANALYTICS =====
function Analytics() {
  const total = SPENDING.reduce((a, s) => a + s.total, 0);
  const peak = Math.max(...MONTHLY.map(m => m.v));
  const avg = Math.round(MONTHLY.reduce((a, m) => a + m.v, 0) / MONTHLY.length);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 12px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: -0.5,
      color: '#0C0C0C'
    }
  }, "Analytics")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 90,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '0 16px 90px'
    },
    className: "ns"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, [{
    label: 'Avg/month',
    val: avg,
    sub: '−5% vs last year',
    pos: true
  }, {
    label: 'Net saved',
    val: SUMMARY.net,
    sub: `${Math.round(SUMMARY.net / SUMMARY.income * 100)}% of income`,
    pos: true
  }].map(item => /*#__PURE__*/React.createElement(Card, {
    key: item.label
  }, /*#__PURE__*/React.createElement(Label, null, item.label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Money, {
    value: item.val,
    size: 20,
    weight: 800,
    tone: item.pos ? 'income' : 'default',
    signed: item.pos
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      color: '#8A8A8A'
    }
  }, item.sub)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: 16,
      display: 'block'
    }
  }, "6-month spending"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 130
    }
  }, MONTHLY.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.m,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      height: '100%',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      fontWeight: 600,
      color: i === 5 ? '#0C0C0C' : '#8A8A8A'
    }
  }, "\u20B9", Math.round(m.v / 1000), "k"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 28,
      background: i === 5 ? '#00D09C' : '#EEF9F5',
      borderRadius: '6px 6px 0 0',
      height: `${m.v / peak * 100}%`,
      transition: 'height 400ms ease'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 600,
      color: i === 5 ? '#0C0C0C' : '#8A8A8A'
    }
  }, m.m))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: 14,
      display: 'block'
    }
  }, "By category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, SPENDING.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.cat,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: '#F2F2F2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: CAT[s.cat].icon,
    size: 15,
    color: "#6B6B6B"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 500,
      color: '#0C0C0C',
      minWidth: 76,
      flexShrink: 0
    }
  }, CAT[s.cat].name), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Bar, {
    v: s.total,
    max: SPENDING[0].total,
    color: "#00D09C"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 600,
      color: '#8A8A8A',
      minWidth: 52,
      textAlign: 'right'
    }
  }, "\u20B9", (s.total / 1000).toFixed(1), "k")))))));
}

// ===== SETTINGS =====
function Grp({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.7,
      color: '#8A8A8A',
      padding: '0 4px 6px'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid #EBEBEB',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, React.Children.map(children, (c, i) => /*#__PURE__*/React.createElement("div", {
    style: i > 0 ? {
      borderTop: '1px solid #F4F4F4'
    } : {}
  }, c))));
}
function Settings() {
  const [bio, setBio] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 12px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: -0.5,
      color: '#0C0C0C'
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 90,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    },
    className: "ns"
  }, /*#__PURE__*/React.createElement(Grp, {
    title: "General"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "currency",
    iconColor: "#00D09C",
    title: "Currency",
    trailText: "INR (\u20B9)",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "theme",
    iconColor: "#7E57C2",
    title: "Theme",
    trailText: "Light",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement(Grp, {
    title: "Security"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "biometric",
    iconColor: "#00D09C",
    title: "Biometric lock",
    sub: "Require Face ID to open",
    trail: /*#__PURE__*/React.createElement(Toggle, {
      on: bio,
      onChange: setBio
    }),
    chevron: false
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "lock",
    iconColor: "#5C6BC0",
    title: "Auto-lock",
    trailText: "30s",
    onClick: bio ? () => {} : undefined,
    disabled: !bio
  })), /*#__PURE__*/React.createElement(Grp, {
    title: "Manage"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "accounts",
    iconColor: "#00D09C",
    title: "Accounts",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "categories",
    iconColor: "#F5A623",
    title: "Categories",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "budgets",
    iconColor: "#EC407A",
    title: "Budgets",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement(Grp, {
    title: "Data"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "backup",
    iconColor: "#00D09C",
    title: "Backup",
    sub: "Encrypted .spentit file",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "restore",
    iconColor: "#5C6BC0",
    title: "Restore",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement(Grp, {
    title: "About"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "secure",
    iconColor: "#00D09C",
    title: "100% offline",
    sub: "No accounts \xB7 no cloud \xB7 no tracking"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "info",
    iconColor: "#9E9E9E",
    title: "Version",
    trailText: "1.0.0"
  }))));
}

// ===== APP SHELL =====
const TABS = [{
  k: 'dashboard',
  l: 'Home',
  i: 'house'
}, {
  k: 'transactions',
  l: 'Transactions',
  i: 'receipt'
}, {
  k: 'analytics',
  l: 'Analytics',
  i: 'chart-column'
}, {
  k: 'settings',
  l: 'Settings',
  i: 'settings'
}];
function TabBar({
  tab,
  setTab
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 80,
      paddingBottom: 16,
      background: '#fff',
      borderTop: '1px solid #F0F0F0',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 10,
      zIndex: 30
    }
  }, TABS.map(t => {
    const on = tab === t.k;
    return /*#__PURE__*/React.createElement("button", {
      key: t.k,
      onClick: () => setTab(t.k),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px 0'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.i,
      size: 22,
      color: on ? '#00D09C' : '#C0C0C0',
      sw: on ? 2 : 1.5
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 600,
        color: on ? '#00D09C' : '#C0C0C0'
      }
    }, t.l));
  }));
}
function Toast({
  msg
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 96,
      background: '#0C0C0C',
      color: '#fff',
      borderRadius: 12,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      zIndex: 60,
      animation: 'toastIn 200ms ease',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "#00D09C",
    sw: 2
  }), msg);
}
function App() {
  const [stage, setStage] = React.useState('onboarding');
  const [tab, setTab] = React.useState('dashboard');
  const [adding, setAdding] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [drillCat, setDrillCat] = React.useState(null);
  const showToast = m => {
    setToast(m);
    setTimeout(() => setToast(null), 2000);
  };
  let screen = null;
  if (tab === 'dashboard') screen = /*#__PURE__*/React.createElement(Dashboard, {
    onAdd: () => setAdding(true),
    onTxns: () => {
      setDrillCat(null);
      setTab('transactions');
    },
    onCat: c => {
      setDrillCat(c);
      setTab('transactions');
    }
  });else if (tab === 'transactions') screen = /*#__PURE__*/React.createElement(Transactions, {
    key: drillCat || 'all',
    onAdd: () => setAdding(true),
    initCat: drillCat
  });else if (tab === 'analytics') screen = /*#__PURE__*/React.createElement(Analytics, null);else screen = /*#__PURE__*/React.createElement(Settings, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "screen"
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      overflow: 'hidden'
    }
  }, stage === 'onboarding' ? /*#__PURE__*/React.createElement(Onboarding, {
    onDone: () => setStage('app')
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      paddingBottom: 0
    }
  }, screen), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    setTab: t => {
      setDrillCat(null);
      setTab(t);
    }
  }), adding && /*#__PURE__*/React.createElement(AddTxn, {
    onClose: () => setAdding(false),
    onSave: () => {
      setAdding(false);
      showToast('Added successfully');
    }
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 7,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 5,
      borderRadius: 3,
      background: '#0C0C0C',
      opacity: 0.22,
      zIndex: 70
    }
  })));
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app-v2/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app-v2/components.jsx
try { (() => {
/* SpentIt v2 — standalone design primitives (no DS bundle dependency).
   Key v2 changes: white cards on #F8F8F8 page, stroke-1.5 icons, monochrome
   category icons, slimmer buttons (40px), tighter rows (56px), hairline borders. */

// ===== ICON SET (Lucide outline, inlined for offline/static rendering) =====
const PATHS = {
  "shopping-cart": '<circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>',
  "utensils": '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>',
  "car": '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle>',
  "house": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
  "wallet": '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>',
  "gift": '<path d="M12 7v14"></path><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"></path><rect x="3" y="7" width="18" height="4" rx="1"></rect>',
  "heart-pulse": '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>',
  "plus": '<path d="M5 12h14"></path><path d="M12 5v14"></path>',
  "search": '<path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle>',
  "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
  "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
  "x": '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  "lock": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  "scan-face": '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path>',
  "cloud-upload": '<path d="M12 13v8"></path><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="m8 17 4-4 4 4"></path>',
  "cloud-download": '<path d="M12 13v8l-4-4"></path><path d="m12 21 4-4"></path><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"></path>',
  "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>',
  "chart-pie": '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>',
  "banknote": '<rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path>',
  "moon": '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>',
  "bug": '<path d="M12 20v-9"></path><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"></path><path d="M21 21a4 4 0 0 0-3.81-4"></path><path d="M21 5a4 4 0 0 1-3.55 3.97"></path><path d="M22 13h-4"></path><path d="M3 21a4 4 0 0 1 3.81-4"></path><path d="M3 5a4 4 0 0 0 3.55 3.97"></path><path d="M6 13H2"></path>',
  "info": '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>',
  "settings": '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle>',
  "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>',
  "trending-up": '<path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path>',
  "receipt": '<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"></path>',
  "arrow-left": '<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>',
  "ellipsis": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "delete": '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path><path d="m12 9 6 6"></path><path d="m18 9-6 6"></path>',
  "calendar": '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>',
  "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path>',
  "trash-2": '<path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  "bus": '<path d="M8 6v6"></path><path d="M15 6v6"></path><path d="M2 12h19.6"></path><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path><circle cx="7" cy="18" r="2"></circle><path d="M9 18h5"></path><circle cx="16" cy="18" r="2"></circle>',
  "film": '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M7 3v18"></path><path d="M3 7.5h4"></path><path d="M3 12h18"></path><path d="M3 16.5h4"></path><path d="M17 3v18"></path><path d="M17 7.5h4"></path><path d="M17 16.5h4"></path>',
  "shopping-bag": '<path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>',
  "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>',
  "smartphone": '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path>',
  "coffee": '<path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path><path d="M6 2v2"></path>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>'
};
const ALIASES = {
  groceries: 'shopping-cart',
  food: 'utensils',
  dining: 'coffee',
  transport: 'bus',
  car: 'car',
  rent: 'house',
  home: 'house',
  salary: 'banknote',
  income: 'trending-up',
  shopping: 'shopping-bag',
  gifts: 'gift',
  health: 'heart-pulse',
  bills: 'zap',
  phone: 'smartphone',
  entertainment: 'film',
  add: 'plus',
  back: 'arrow-left',
  next: 'chevron-right',
  prev: 'chevron-left',
  close: 'x',
  more: 'ellipsis',
  biometric: 'scan-face',
  backup: 'cloud-upload',
  restore: 'cloud-download',
  categories: 'layout-grid',
  budgets: 'chart-pie',
  analytics: 'chart-column',
  currency: 'banknote',
  theme: 'moon',
  accounts: 'wallet',
  edit: 'pencil',
  trash: 'trash-2',
  secure: 'shield-check'
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  sw = 1.5,
  style
}) {
  const k = ALIASES[name] || name;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: PATHS[k] || PATHS['receipt']
    }
  });
}
function Btn({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  disabled,
  onClick,
  style
}) {
  const [p, setP] = React.useState(false);
  const S = {
    sm: {
      h: 32,
      px: 12,
      fs: 12
    },
    md: {
      h: 40,
      px: 16,
      fs: 14
    },
    lg: {
      h: 48,
      px: 20,
      fs: 15
    }
  }[size];
  const V = {
    primary: {
      bg: '#00D09C',
      fg: '#fff',
      pb: '#00B88A'
    },
    secondary: {
      bg: '#F0F0F0',
      fg: '#0C0C0C',
      pb: '#E4E4E4'
    },
    ghost: {
      bg: 'transparent',
      fg: '#00D09C',
      pb: '#E0FAF3'
    },
    danger: {
      bg: 'transparent',
      fg: '#F45B69',
      pb: '#FEF2F3'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      width: fullWidth ? '100%' : 'auto',
      height: S.h,
      padding: `0 ${S.px}px`,
      fontFamily: 'var(--font-display)',
      fontSize: S.fs,
      fontWeight: 600,
      color: V.fg,
      background: p && !disabled ? V.pb : V.bg,
      border: 'none',
      borderRadius: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: p && !disabled ? 'scale(0.97)' : 'scale(1)',
      transition: 'transform 120ms ease, background 100ms ease',
      outline: 'none',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: S.h < 44 ? 14 : 16,
    sw: 2
  }) : null, /*#__PURE__*/React.createElement("span", null, children));
}
function Card({
  children,
  pad = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #EBEBEB',
      padding: pad ? 14 : 0,
      overflow: 'hidden',
      ...style
    }
  }, children);
}
const fmtMoney = (v, cur = 'INR') => ({
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
}[cur] ?? '') + Math.abs(v).toLocaleString('en-IN', {
  maximumFractionDigits: 2
});
function Money({
  value,
  currency = 'INR',
  tone = 'default',
  size = 15,
  weight = 600,
  signed = false,
  style
}) {
  const color = {
    default: '#0C0C0C',
    income: '#00D09C',
    expense: '#0C0C0C',
    muted: '#8A8A8A'
  }[tone];
  const pre = signed ? value > 0 ? '+ ' : value < 0 ? '− ' : '' : value < 0 ? '− ' : '';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '-0.2px',
      color,
      whiteSpace: 'nowrap',
      ...style
    }
  }, pre, fmtMoney(value, currency));
}
function Label({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      color: '#8A8A8A',
      ...style
    }
  }, children);
}
function Toggle({
  on = false,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    onClick: () => onChange?.(!on),
    style: {
      width: 46,
      height: 28,
      borderRadius: 14,
      border: 'none',
      padding: 2,
      background: on ? '#00D09C' : '#DCDCDC',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: on ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      transition: 'background 180ms ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }
  }));
}
function Segment({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      background: '#F0F0F0',
      borderRadius: 10
    }
  }, options.map(o => {
    const s = o.value === value;
    const fg = s ? o.tone === 'income' ? '#00D09C' : o.tone === 'expense' ? '#F45B69' : '#0C0C0C' : '#8A8A8A';
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange?.(o.value),
      style: {
        minWidth: 96,
        padding: '8px 18px',
        border: 'none',
        borderRadius: 8,
        background: s ? '#fff' : 'transparent',
        boxShadow: s ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        fontFamily: 'var(--font-display)',
        fontSize: 14,
        fontWeight: 600,
        color: fg,
        cursor: 'pointer',
        transition: 'all 140ms ease'
      }
    }, o.label);
  }));
}
function Row({
  icon,
  iconColor = '#00D09C',
  title,
  sub,
  trailText,
  trail,
  chevron = true,
  onClick,
  disabled,
  style
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: !disabled && onClick,
    onPointerDown: () => !disabled && onClick && setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 16px',
      background: p ? '#FAFAFA' : 'transparent',
      cursor: onClick && !disabled ? 'pointer' : 'default',
      opacity: disabled ? 0.45 : 1,
      transition: 'background 100ms ease',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 17,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `${iconColor}18`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17,
    color: iconColor
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: '#0C0C0C',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      color: '#8A8A8A',
      marginTop: 1
    }
  }, sub)), trail || trailText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      color: '#8A8A8A'
    }
  }, trailText), onClick && !disabled && chevron && /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 16,
    color: "#C8C8C8"
  }));
}
function TxnRow({
  tx,
  onClick
}) {
  const [p, setP] = React.useState(false);
  const signed = tx.type === 'income' ? tx.amount : -tx.amount;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 56,
      padding: '0 16px',
      background: p ? '#FAFAFA' : '#fff',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 100ms ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F2F2F2',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tx.icon,
    size: 18,
    color: "#6B6B6B"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: '#0C0C0C',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, tx.category), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      color: '#8A8A8A',
      marginTop: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, tx.note || tx.account)), /*#__PURE__*/React.createElement(Money, {
    value: signed,
    tone: tx.type === 'income' ? 'income' : 'default',
    size: 14,
    weight: 600,
    signed: true
  }));
}
function Chip({
  label,
  icon,
  sel = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    type: "button",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 32,
      padding: '0 12px',
      border: sel ? '1.5px solid #00D09C' : '1px solid #E4E4E4',
      borderRadius: 16,
      background: sel ? '#E8FBF5' : '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      fontWeight: 600,
      color: sel ? '#00D09C' : '#6B6B6B',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 12,
    color: sel ? '#00D09C' : '#8A8A8A'
  }), label);
}
function Fab({
  onClick,
  style
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Add",
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      position: 'absolute',
      right: 16,
      bottom: 24,
      width: 52,
      height: 52,
      borderRadius: 26,
      background: '#00D09C',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 14px rgba(0,208,156,0.4)',
      transform: p ? 'scale(0.92)' : 'scale(1)',
      transition: 'transform 140ms ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 24,
    color: "#fff",
    sw: 2.5
  }));
}
function Bar({
  v = 0,
  max = 100,
  color
}) {
  const pct = Math.min(100, max > 0 ? v / max * 100 : 0);
  const r = max > 0 ? v / max : 0;
  const fill = color || (r >= 1 ? '#F45B69' : r >= 0.8 ? '#F5A623' : '#00D09C');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 4,
      background: '#EFEFEF',
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: fill,
      borderRadius: 2,
      transition: 'width 300ms ease'
    }
  }));
}
function Empty({
  icon,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 32,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 30,
      background: '#F0F0F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 26,
    color: "#A0A0A0"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      fontWeight: 600,
      color: '#0C0C0C'
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      color: '#8A8A8A',
      maxWidth: 240,
      lineHeight: 1.4
    }
  }, sub));
}
Object.assign(window, {
  Icon,
  Btn,
  Card,
  Money,
  fmtMoney,
  Label,
  Toggle,
  Segment,
  Row,
  TxnRow,
  Chip,
  Fab,
  Bar,
  Empty
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app-v2/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/AddTransaction.jsx
try { (() => {
/* SpentIt UI kit — Add Transaction modal (amount, type, category, keypad). */
const _dsA = window.SpentItDesignSystem_767bfa;
function AddTransaction({
  onClose,
  onSave
}) {
  const {
    SegmentedControl,
    Icon,
    IconButton,
    Button,
    Input
  } = _dsA;
  const {
    CATEGORIES
  } = window.SpentItData;
  const [type, setType] = React.useState('expense');
  const [amount, setAmount] = React.useState('0');
  const [cat, setCat] = React.useState('groceries');
  const [account, setAccount] = React.useState('HDFC');
  const [note, setNote] = React.useState('');
  const catKeys = type === 'income' ? ['salary'] : ['groceries', 'dining', 'transport', 'rent', 'shopping', 'health', 'entertainment', 'bills'];
  React.useEffect(() => {
    setCat(catKeys[0]);
  }, [type]);
  const press = k => {
    setAmount(cur => {
      if (k === 'back') return cur.length <= 1 ? '0' : cur.slice(0, -1);
      if (k === '.') return cur.includes('.') ? cur : cur + '.';
      if (cur === '0') return k;
      if (cur.includes('.') && cur.split('.')[1].length >= 2) return cur;
      return cur + k;
    });
  };
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];
  const amountColor = type === 'income' ? 'var(--income)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-page)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "close",
    "aria-label": "Cancel",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, "New transaction"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '4px 0 10px'
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: type,
    onChange: setType,
    options: [{
      value: 'expense',
      label: 'Expense',
      tone: 'expense'
    }, {
      value: 'income',
      label: 'Income',
      tone: 'income'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '6px 0 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 44,
      fontWeight: 800,
      letterSpacing: -1,
      color: amountColor
    }
  }, "\u20B9", amount)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      paddingBottom: 6
    },
    className: "noscroll"
  }, catKeys.map(k => {
    const c = CATEGORIES[k];
    const sel = cat === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setCat(k),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        width: 58
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: sel ? c.color : `color-mix(in srgb, ${c.color} 13%, transparent)`,
        transition: 'background 140ms ease'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.icon,
      size: 22,
      color: sel ? '#fff' : c.color
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: sel ? 'var(--text-primary)' : 'var(--text-secondary)',
        whiteSpace: 'nowrap'
      }
    }, c.name));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '12px 16px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    leadingIcon: "pencil",
    placeholder: "Add a note",
    value: note,
    onChange: e => setNote(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAccount(account === 'HDFC' ? 'Cash' : 'HDFC'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 14px',
      height: 48,
      borderRadius: 12,
      border: 'none',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wallet",
    size: 16,
    color: "var(--text-secondary)"
  }), account)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: '0 16px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8
    }
  }, KEYS.map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => press(k),
    style: {
      height: 52,
      borderRadius: 14,
      border: 'none',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, k === 'back' ? /*#__PURE__*/React.createElement(Icon, {
    name: "delete",
    size: 22,
    color: "var(--text-primary)"
  }) : k))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: () => onSave({
      type,
      amount,
      cat,
      account,
      note
    })
  }, type === 'income' ? 'Add income' : 'Add expense'))));
}
Object.assign(window, {
  AddTransaction
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/AddTransaction.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/Analytics.jsx
try { (() => {
/* SpentIt UI kit — Analytics screen (charts & insights). */
const _dsAn = window.SpentItDesignSystem_767bfa;
function Analytics() {
  const {
    Card,
    SectionTitle,
    Money,
    Icon
  } = _dsAn;
  const {
    MONTHLY,
    SPENDING,
    CATEGORIES,
    SUMMARY
  } = window.SpentItData;
  const slices = SPENDING.slice(0, 5).map(s => ({
    value: s.total,
    color: CATEGORIES[s.cat].color,
    label: CATEGORIES[s.cat].name,
    icon: CATEGORIES[s.cat].icon
  }));
  const total = slices.reduce((a, s) => a + s.value, 0);
  const avg = Math.round(MONTHLY.reduce((a, m) => a + m.v, 0) / MONTHLY.length);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "Analytics")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      height: 'calc(100% - 52px)',
      paddingBottom: 110,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '8px 16px 110px'
    },
    className: "noscroll"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: 'var(--text-secondary)'
    }
  }, "Avg / month"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Money, {
    value: avg,
    size: 20,
    weight: 700
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
      color: 'var(--income)',
      fontSize: 12,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 14,
    color: "var(--income)"
  }), " 5.4% lower")), /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: 'var(--text-secondary)'
    }
  }, "Net saved"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Money, {
    value: SUMMARY.net,
    size: 20,
    weight: 700,
    tone: "income",
    signed: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, "33% of income"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionTitle, null, "Last 6 Months"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(window.BarChart, {
    data: MONTHLY,
    highlight: 5
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionTitle, null, "By Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      margin: '16px 0'
    }
  }, /*#__PURE__*/React.createElement(window.Donut, {
    slices: slices,
    total: total,
    size: 150
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, slices.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 5,
      background: s.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, s.label), /*#__PURE__*/React.createElement(Money, {
    value: s.value,
    size: 13,
    tone: "muted"
  })))))));
}
Object.assign(window, {
  Analytics
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/Analytics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/App.jsx
try { (() => {
/* SpentIt UI kit — App shell: phone frame, tab bar, routing, toast. */
const _dsApp = window.SpentItDesignSystem_767bfa;
function TabBar({
  active,
  onChange
}) {
  const {
    Icon
  } = _dsApp;
  const tabs = [{
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'house'
  }, {
    key: 'transactions',
    label: 'Transactions',
    icon: 'receipt'
  }, {
    key: 'analytics',
    label: 'Analytics',
    icon: 'chart-column'
  }, {
    key: 'settings',
    label: 'Settings',
    icon: 'settings'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 84,
      paddingBottom: 18,
      background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 8,
      zIndex: 30
    }
  }, tabs.map(t => {
    const on = active === t.key;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange(t.key),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 23,
      color: on ? 'var(--color-primary)' : 'var(--text-secondary)',
      strokeWidth: on ? 2.4 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: on ? 'var(--color-primary)' : 'var(--text-secondary)'
      }
    }, t.label));
  }));
}
function Toast({
  message
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 100,
      background: 'var(--ink-900)',
      color: 'var(--surface-0)',
      borderRadius: 12,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      zIndex: 60,
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      animation: 'toastIn 240ms cubic-bezier(0.2,0.8,0.2,1)'
    }
  }, /*#__PURE__*/React.createElement(_dsApp.Icon, {
    name: "check",
    size: 18,
    color: "var(--color-primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, message));
}
function App() {
  const [stage, setStage] = React.useState('onboarding'); // onboarding | app
  const [tab, setTab] = React.useState('dashboard');
  const [adding, setAdding] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [drillCat, setDrillCat] = React.useState(null);
  const showToast = m => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };
  const goTxns = cat => {
    setDrillCat(cat || null);
    setTab('transactions');
  };
  let screen = null;
  if (tab === 'dashboard') screen = /*#__PURE__*/React.createElement(window.Dashboard, {
    onAdd: () => setAdding(true),
    onSeeAll: () => goTxns(null),
    onCategory: c => goTxns(c)
  });else if (tab === 'transactions') screen = /*#__PURE__*/React.createElement(window.Transactions, {
    key: drillCat || 'all',
    initialCategory: drillCat,
    onAdd: () => setAdding(true),
    onOpen: () => setAdding(true)
  });else if (tab === 'analytics') screen = /*#__PURE__*/React.createElement(window.Analytics, null);else if (tab === 'settings') screen = /*#__PURE__*/React.createElement(window.Settings, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "phone-screen"
  }, /*#__PURE__*/React.createElement(window.StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      overflow: 'hidden'
    }
  }, stage === 'onboarding' ? /*#__PURE__*/React.createElement(window.Onboarding, {
    onFinish: () => setStage('app')
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      paddingBottom: 0
    }
  }, screen), /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: t => {
      setDrillCat(null);
      setTab(t);
    }
  }), adding && /*#__PURE__*/React.createElement(window.AddTransaction, {
    onClose: () => setAdding(false),
    onSave: () => {
      setAdding(false);
      showToast('Transaction added');
    }
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    message: toast
  }))), /*#__PURE__*/React.createElement("div", {
    className: "home-indicator"
  })));
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/Dashboard.jsx
try { (() => {
/* SpentIt UI kit — Dashboard screen. */
const _ds = window.SpentItDesignSystem_767bfa;
function Dashboard({
  onAdd,
  onSeeAll,
  onCategory
}) {
  const {
    Card,
    Money,
    SectionTitle,
    AccountCard,
    TransactionRow,
    Fab
  } = _ds;
  const {
    ACCOUNTS,
    TXNS,
    SPENDING,
    SUMMARY,
    CATEGORIES
  } = window.SpentItData;
  const [account, setAccount] = React.useState(null);
  const slices = SPENDING.slice(0, 5).map(s => ({
    value: s.total,
    color: CATEGORIES[s.cat].color,
    label: CATEGORIES[s.cat].name,
    icon: CATEGORIES[s.cat].icon,
    cat: s.cat
  }));
  const otherTotal = SPENDING.slice(5).reduce((a, s) => a + s.total, 0);
  if (otherTotal > 0) slices.push({
    value: otherTotal,
    color: '#AEB6BF',
    label: 'Other',
    icon: 'more',
    cat: null
  });
  const total = slices.reduce((a, s) => a + s.value, 0);
  const recent = TXNS.slice(0, 4);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(window.MonthSelector, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      height: 'calc(100% - 52px)',
      paddingBottom: 120
    },
    className: "noscroll"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Net Worth"), /*#__PURE__*/React.createElement(Money, {
    value: SUMMARY.netWorth,
    size: 30,
    weight: 700
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '16px 16px 0',
      overflowX: 'auto'
    },
    className: "noscroll"
  }, /*#__PURE__*/React.createElement(window.SpentItDS_AccountAll, {
    account: account,
    setAccount: setAccount
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionTitle, null, "This Month"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 8
    }
  }, [['Income', SUMMARY.income, 'income'], ['Expense', SUMMARY.expense, 'expense'], ['Net', SUMMARY.net, 'income']].map(([l, v, t]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, l), /*#__PURE__*/React.createElement(Money, {
    value: v,
    size: 17,
    tone: t,
    signed: l === 'Net'
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionTitle, null, "Spending"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      margin: '14px 0'
    }
  }, /*#__PURE__*/React.createElement(window.Donut, {
    slices: slices,
    total: total
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, slices.map(s => {
    const pct = Math.round(s.value / total * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: s.label,
      onClick: () => s.cat && onCategory(s.cat),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 0',
        cursor: s.cat ? 'pointer' : 'default'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 5,
        background: s.color,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement(_ds.Icon, {
      name: s.icon,
      size: 14,
      color: "var(--text-secondary)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-primary)'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        minWidth: 34,
        textAlign: 'right'
      }
    }, pct, "%"), /*#__PURE__*/React.createElement(Money, {
      value: s.value,
      size: 13,
      tone: "muted"
    }));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padded: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 16px 4px'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Recent"), /*#__PURE__*/React.createElement("button", {
    onClick: onSeeAll,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-primary)',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'var(--font-display)'
    }
  }, "See all ", /*#__PURE__*/React.createElement(_ds.Icon, {
    name: "next",
    size: 14,
    color: "var(--color-primary)"
  }))), recent.map(t => /*#__PURE__*/React.createElement(TransactionRow, {
    key: t.id,
    tx: {
      category: window.SpentItData.CATEGORIES[t.cat].name,
      icon: window.SpentItData.CATEGORIES[t.cat].icon,
      color: window.SpentItData.CATEGORIES[t.cat].color,
      note: t.note,
      account: t.account,
      amount: t.amount,
      type: t.type
    },
    onClick: onSeeAll
  }))))), /*#__PURE__*/React.createElement(Fab, {
    "aria-label": "Add transaction",
    onClick: onAdd,
    style: {
      position: 'absolute',
      right: 16,
      bottom: 24
    }
  }));
}

// Horizontal account selector row
function SpentItDS_AccountAll({
  account,
  setAccount
}) {
  const {
    AccountCard
  } = _ds;
  const {
    ACCOUNTS,
    SUMMARY
  } = window.SpentItData;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AccountCard, {
    account: null,
    totalNetWorth: SUMMARY.netWorth,
    selected: account === null,
    onClick: () => setAccount(null)
  }), ACCOUNTS.map(a => /*#__PURE__*/React.createElement(AccountCard, {
    key: a.id,
    account: a,
    selected: account === a.id,
    onClick: () => setAccount(a.id)
  })));
}
Object.assign(window, {
  Dashboard,
  SpentItDS_AccountAll
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/Onboarding.jsx
try { (() => {
/* SpentIt UI kit — Onboarding (privacy-first intro). */
const _dsO = window.SpentItDesignSystem_767bfa;
const SLIDES = [{
  icon: 'lock',
  title: 'Your money stays here',
  body: 'No accounts. No cloud sync. No tracking. SpentIt is 100% offline — your data never leaves your phone.'
}, {
  icon: 'add',
  title: 'Log expenses in seconds',
  body: 'Tap +, pick a category and account, type an amount. That\u2019s it.'
}, {
  icon: 'backup',
  title: 'Back up regularly',
  body: 'Create an encrypted backup file you control. We\u2019ll nudge you weekly.'
}];
function Onboarding({
  onFinish
}) {
  const {
    Button,
    Icon
  } = _dsO;
  const [i, setI] = React.useState(0);
  const slide = SLIDES[i];
  const next = () => i === SLIDES.length - 1 ? onFinish() : setI(i + 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '8px 20px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onFinish,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "Skip")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 36px',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: 28,
      background: 'var(--color-primary-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: slide.icon,
    size: 42,
    color: "var(--color-primary)",
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: -0.5,
      color: 'var(--text-primary)'
    }
  }, slide.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-secondary)',
      maxWidth: 300
    }
  }, slide.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8
    }
  }, SLIDES.map((_, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      width: k === i ? 22 : 8,
      height: 8,
      borderRadius: 4,
      background: k === i ? 'var(--color-primary)' : 'var(--line)',
      transition: 'all 220ms ease'
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: next
  }, i === SLIDES.length - 1 ? 'Get started' : 'Next')));
}
Object.assign(window, {
  Onboarding
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/Settings.jsx
try { (() => {
/* SpentIt UI kit — Settings screen. */
const _dsS = window.SpentItDesignSystem_767bfa;
function SettingsGroup({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: 'var(--text-secondary)',
      padding: '0 4px 6px'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 14,
      overflow: 'hidden'
    }
  }, React.Children.map(children, (c, i) => /*#__PURE__*/React.createElement("div", {
    style: i > 0 ? {
      borderTop: '1px solid var(--border-subtle)'
    } : undefined
  }, c))));
}
function Settings() {
  const {
    ListRow,
    SwitchRow
  } = _dsS;
  const [bio, setBio] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      height: 'calc(100% - 56px)',
      paddingBottom: 110,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    },
    className: "noscroll"
  }, /*#__PURE__*/React.createElement(SettingsGroup, {
    title: "General"
  }, /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "currency",
    leadingIconColor: "#00d09c",
    title: "Currency",
    trailingText: "INR (\u20B9)",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "theme",
    leadingIconColor: "#7e57c2",
    title: "Theme",
    trailingText: "Light",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement(SettingsGroup, {
    title: "Security"
  }, /*#__PURE__*/React.createElement(SwitchRow, {
    leadingIcon: "biometric",
    leadingIconColor: "#00d09c",
    title: "Biometric lock",
    subtitle: "Require Face ID to open",
    checked: bio,
    onChange: setBio
  }), /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "lock",
    leadingIconColor: "#5c6bc0",
    title: "Auto-lock",
    trailingText: "30s",
    onClick: () => {},
    disabled: !bio
  })), /*#__PURE__*/React.createElement(SettingsGroup, {
    title: "Manage"
  }, /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "accounts",
    leadingIconColor: "#00d09c",
    title: "Accounts",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "categories",
    leadingIconColor: "#f5a623",
    title: "Categories",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "budgets",
    leadingIconColor: "#ec407a",
    title: "Budgets",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement(SettingsGroup, {
    title: "Data"
  }, /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "backup",
    leadingIconColor: "#00d09c",
    title: "Backup",
    subtitle: "Encrypted .spentit file",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "restore",
    leadingIconColor: "#5c6bc0",
    title: "Restore",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement(SettingsGroup, {
    title: "About"
  }, /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "secure",
    leadingIconColor: "#00d09c",
    title: "100% offline",
    subtitle: "No accounts \xB7 no cloud \xB7 no tracking",
    showChevron: false
  }), /*#__PURE__*/React.createElement(ListRow, {
    leadingIcon: "info",
    leadingIconColor: "#6b6b6b",
    title: "Version",
    trailingText: "1.0.0",
    showChevron: false
  }))));
}
Object.assign(window, {
  Settings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/Settings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/Transactions.jsx
try { (() => {
/* SpentIt UI kit — Transactions list screen (grouped by date, search, filters). */
const _dsT = window.SpentItDesignSystem_767bfa;
function Transactions({
  onAdd,
  onOpen,
  initialCategory
}) {
  const {
    Card,
    TransactionRow,
    SearchBar,
    Chip,
    IconButton,
    Fab,
    Icon,
    EmptyState
  } = _dsT;
  const {
    TXNS,
    CATEGORIES,
    ACCOUNTS
  } = window.SpentItData;
  const [account, setAccount] = React.useState(null);
  const [category, setCategory] = React.useState(initialCategory || null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const filtered = TXNS.filter(t => {
    if (account && t.account !== account) return false;
    if (category && t.cat !== category) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      if (!t.note.toLowerCase().includes(s) && !CATEGORIES[t.cat].name.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  // group by date label preserving order
  const groups = [];
  filtered.forEach(t => {
    let g = groups.find(x => x.date === t.date);
    if (!g) {
      g = {
        date: t.date,
        items: []
      };
      groups.push(g);
    }
    g.items.push(t);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 8px'
    }
  }, category && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCategory(null),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: `color-mix(in srgb, ${CATEGORIES[category].color} 13%, transparent)`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: CATEGORIES[category].icon,
    size: 14,
    color: CATEGORIES[category].color
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, CATEGORIES[category].name), /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14,
    color: "var(--text-secondary)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 8,
      overflowX: 'auto'
    },
    className: "noscroll"
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "All",
    selected: account === null,
    onClick: () => setAccount(null)
  }), ACCOUNTS.map(a => /*#__PURE__*/React.createElement(Chip, {
    key: a.id,
    label: a.name,
    icon: a.icon,
    selected: account === a.name,
    onClick: () => setAccount(a.name)
  }))), /*#__PURE__*/React.createElement(IconButton, {
    icon: searchOpen ? 'close' : 'search',
    "aria-label": "Search",
    onClick: () => {
      setSearchOpen(!searchOpen);
      setQ('');
    }
  })), searchOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClose: () => {
      setSearchOpen(false);
      setQ('');
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      height: searchOpen ? 'calc(100% - 116px)' : 'calc(100% - 60px)',
      paddingBottom: 120
    },
    className: "noscroll"
  }, groups.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "receipt",
    title: "No transactions",
    subtitle: "Try clearing filters or tap + to add one"
  })) : groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.date
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '14px 16px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: 'var(--text-secondary)'
    }
  }, g.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, (() => {
    const net = g.items.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0);
    return (net < 0 ? '− ₹' : '₹') + Math.abs(net).toLocaleString('en-IN');
  })())), g.items.map(t => /*#__PURE__*/React.createElement(TransactionRow, {
    key: t.id,
    tx: {
      category: CATEGORIES[t.cat].name,
      icon: CATEGORIES[t.cat].icon,
      color: CATEGORIES[t.cat].color,
      note: t.note,
      account: t.account,
      amount: t.amount,
      type: t.type
    },
    onClick: onOpen
  }))))), /*#__PURE__*/React.createElement(Fab, {
    "aria-label": "Add transaction",
    onClick: onAdd,
    style: {
      position: 'absolute',
      right: 16,
      bottom: 24
    }
  }));
}
Object.assign(window, {
  Transactions
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/Transactions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/data.jsx
try { (() => {
/* SpentIt UI kit — mock data (all local, mirrors the app's domain types). */

const CATEGORIES = {
  groceries: {
    name: 'Groceries',
    icon: 'groceries',
    color: '#00d09c'
  },
  dining: {
    name: 'Dining',
    icon: 'dining',
    color: '#f5a623'
  },
  transport: {
    name: 'Transport',
    icon: 'transport',
    color: '#5c6bc0'
  },
  rent: {
    name: 'Rent',
    icon: 'rent',
    color: '#6c63ff'
  },
  shopping: {
    name: 'Shopping',
    icon: 'shopping',
    color: '#ec407a'
  },
  health: {
    name: 'Health',
    icon: 'health',
    color: '#26a69a'
  },
  entertainment: {
    name: 'Entertainment',
    icon: 'entertainment',
    color: '#7e57c2'
  },
  bills: {
    name: 'Bills',
    icon: 'bills',
    color: '#42a5f5'
  },
  phone: {
    name: 'Phone',
    icon: 'phone',
    color: '#5c6bc0'
  },
  salary: {
    name: 'Salary',
    icon: 'salary',
    color: '#00d09c'
  }
};
const ACCOUNTS = [{
  id: 1,
  name: 'Cash',
  icon: 'wallet',
  color: '#00d09c',
  balance: 5400,
  currency: 'INR'
}, {
  id: 2,
  name: 'HDFC',
  icon: 'banknote',
  color: '#5c6bc0',
  balance: 72180,
  currency: 'INR'
}, {
  id: 3,
  name: 'Card',
  icon: 'receipt',
  color: '#f5a623',
  balance: 6740,
  currency: 'INR'
}];

// type, category key, amount, note, account, day label, time
const TXNS = [{
  id: 1,
  type: 'expense',
  cat: 'groceries',
  amount: 1240,
  note: 'BigBasket order',
  account: 'HDFC',
  date: 'Today',
  time: '9:24 AM'
}, {
  id: 2,
  type: 'expense',
  cat: 'dining',
  amount: 560,
  note: 'Blue Tokai',
  account: 'Card',
  date: 'Today',
  time: '8:10 AM'
}, {
  id: 3,
  type: 'expense',
  cat: 'transport',
  amount: 80,
  note: 'Metro',
  account: 'Cash',
  date: 'Today',
  time: '7:55 AM'
}, {
  id: 4,
  type: 'income',
  cat: 'salary',
  amount: 62000,
  note: 'June salary',
  account: 'HDFC',
  date: 'Yesterday',
  time: '10:00 AM'
}, {
  id: 5,
  type: 'expense',
  cat: 'shopping',
  amount: 2399,
  note: 'Running shoes',
  account: 'Card',
  date: 'Yesterday',
  time: '6:30 PM'
}, {
  id: 6,
  type: 'expense',
  cat: 'bills',
  amount: 899,
  note: 'Electricity',
  account: 'HDFC',
  date: 'Yesterday',
  time: '2:15 PM'
}, {
  id: 7,
  type: 'expense',
  cat: 'rent',
  amount: 18000,
  note: 'Flat rent',
  account: 'HDFC',
  date: '3 Jun',
  time: '11:00 AM'
}, {
  id: 8,
  type: 'expense',
  cat: 'health',
  amount: 640,
  note: 'Pharmacy',
  account: 'Cash',
  date: '3 Jun',
  time: '9:40 AM'
}, {
  id: 9,
  type: 'expense',
  cat: 'entertainment',
  amount: 499,
  note: 'Cinema',
  account: 'Card',
  date: '2 Jun',
  time: '8:00 PM'
}, {
  id: 10,
  type: 'expense',
  cat: 'phone',
  amount: 299,
  note: 'Recharge',
  account: 'HDFC',
  date: '2 Jun',
  time: '1:20 PM'
}, {
  id: 11,
  type: 'expense',
  cat: 'groceries',
  amount: 760,
  note: 'Vegetables',
  account: 'Cash',
  date: '1 Jun',
  time: '5:30 PM'
}];

// Spending breakdown for the dashboard donut (this month)
const SPENDING = [{
  cat: 'rent',
  total: 18000
}, {
  cat: 'groceries',
  total: 8400
}, {
  cat: 'dining',
  total: 5600
}, {
  cat: 'shopping',
  total: 4399
}, {
  cat: 'bills',
  total: 3100
}, {
  cat: 'transport',
  total: 1900
}];
const BUDGETS = [{
  cat: 'groceries',
  spent: 8400,
  limit: 10000
}, {
  cat: 'dining',
  spent: 5600,
  limit: 6000
}, {
  cat: 'shopping',
  spent: 4399,
  limit: 4000
}, {
  cat: 'transport',
  spent: 1900,
  limit: 3000
}];

// 6-month expense bars for analytics
const MONTHLY = [{
  m: 'Jan',
  v: 41200
}, {
  m: 'Feb',
  v: 38600
}, {
  m: 'Mar',
  v: 45100
}, {
  m: 'Apr',
  v: 39800
}, {
  m: 'May',
  v: 43900
}, {
  m: 'Jun',
  v: 41497
}];
const SUMMARY = {
  income: 62000,
  expense: 41497,
  net: 20503,
  netWorth: 84320
};
window.SpentItData = {
  CATEGORIES,
  ACCOUNTS,
  TXNS,
  SPENDING,
  BUDGETS,
  MONTHLY,
  SUMMARY
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/spentit-app/widgets.jsx
try { (() => {
/* SpentIt UI kit — shared widgets: status bar, month selector, charts. */
const DS = window.SpentItDesignSystem_767bfa;
const {
  Icon,
  Money,
  SectionTitle,
  Card
} = DS;
function StatusBar({
  dark
}) {
  const fg = dark ? '#EFEFEF' : '#0C0C0C';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: fg,
      letterSpacing: -0.2
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: fg
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "11",
    viewBox: "0 0 17 11",
    fill: fg
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "5",
    width: "3",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.5",
    width: "3",
    height: "8.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 16 11",
    fill: fg
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.2c2 0 3.9.8 5.3 2.1l1.2-1.3C12.8 1.2 10.5.3 8 .3S3.2 1.2 1.5 3l1.2 1.3C4.1 3 6 2.2 8 2.2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 5.6c1.1 0 2.1.4 2.8 1.2l1.2-1.3C10.9 4.4 9.5 3.8 8 3.8s-2.9.6-4 1.7l1.2 1.3C5.9 6 6.9 5.6 8 5.6z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "9",
    r: "1.6"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "25",
    height: "12",
    viewBox: "0 0 25 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "11",
    rx: "3",
    stroke: fg,
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "16",
    height: "8",
    rx: "1.5",
    fill: fg
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: fg,
    opacity: "0.4"
  }))));
}
function MonthSelector({
  label = 'June 2026',
  onPrev,
  onNext,
  nextDisabled
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '8px 16px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onPrev,
    "aria-label": "Previous month",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 6,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 22,
    color: "var(--text-primary)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-primary)',
      letterSpacing: -0.2,
      minWidth: 130,
      textAlign: 'center'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    disabled: nextDisabled,
    "aria-label": "Next month",
    style: {
      background: 'none',
      border: 'none',
      cursor: nextDisabled ? 'default' : 'pointer',
      padding: 6,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 22,
    color: nextDisabled ? 'var(--text-secondary)' : 'var(--text-primary)'
  })));
}

// Donut via conic-gradient + center hole.
function Donut({
  slices,
  total,
  currency = 'INR',
  size = 168
}) {
  let acc = 0;
  const stops = slices.map(s => {
    const start = acc / total * 360;
    acc += s.value;
    const end = acc / total * 360;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(', ');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: `conic-gradient(${stops})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '21%',
      borderRadius: '50%',
      background: 'var(--surface-card)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      color: 'var(--text-secondary)'
    }
  }, "Total"), /*#__PURE__*/React.createElement(Money, {
    value: total,
    currency: currency,
    size: 16,
    weight: 700
  })));
}

// Simple vertical bar chart.
function BarChart({
  data,
  max,
  height = 150,
  highlight
}) {
  const peak = max || Math.max(...data.map(d => d.v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 10,
      height
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      height: '100%',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 30,
      height: `${d.v / peak * 100}%`,
      background: highlight === i ? 'var(--color-primary)' : 'var(--green-subtle)',
      borderRadius: 8,
      transition: 'height 400ms cubic-bezier(0.2,0.8,0.2,1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: highlight === i ? 'var(--text-primary)' : 'var(--text-secondary)'
    }
  }, d.m))));
}
Object.assign(window, {
  StatusBar,
  MonthSelector,
  Donut,
  BarChart
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/spentit-app/widgets.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AccountCard = __ds_scope.AccountCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Fab = __ds_scope.Fab;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.ICON_ALIASES = __ds_scope.ICON_ALIASES;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.Money = __ds_scope.Money;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.SwitchRow = __ds_scope.SwitchRow;

__ds_ns.TransactionRow = __ds_scope.TransactionRow;

})();
