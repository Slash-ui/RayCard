import { create } from 'storybook/theming';

export default create({
  base: 'light',

  // Brand - Slash UI
  brandTitle: 'RayCard by Slash UI',
  brandUrl: 'https://slashui.com',
  brandImage: '/slashui-logo.svg',
  brandTarget: '_blank',

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"SF Mono", "Fira Code", monospace',

  // Colors - Neomorphism uses subtle, muted tones
  colorPrimary: '#6366f1', // Indigo accent
  colorSecondary: '#8b5cf6', // Purple accent

  // Text
  textColor: '#4a5568',
  textInverseColor: '#f7fafc',

  // UI - Soft gray background characteristic of neomorphism
  appBg: '#e8ecef',
  appContentBg: '#e8ecef',
  appPreviewBg: '#e8ecef',
  appBorderColor: 'rgba(255, 255, 255, 0.6)',
  appBorderRadius: 16,

  // Toolbar
  barTextColor: '#64748b',
  barSelectedColor: '#6366f1',
  barHoverColor: '#8b5cf6',
  barBg: '#e8ecef',

  // Forms
  inputBg: '#e8ecef',
  inputBorder: 'rgba(255, 255, 255, 0.5)',
  inputTextColor: '#4a5568',
  inputBorderRadius: 12,
});
