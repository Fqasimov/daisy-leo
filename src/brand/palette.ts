// Sampled from the studio photos (references/images) — see DESIGN.md.
export const C = {
  obsidian: '#0e0c0b',
  ink: '#181511',
  tissue: '#f0eadb',
  tissueDeep: '#e6dece',
  sand: '#b3a592',
  mocha: '#5b5349',
  walnut: '#4a3727',
  walnutDeep: '#2c2018',
  satin: '#171112',
  gold: '#c9a961',
  goldLight: '#e0c27e',
  goldDeep: '#8f7f50',
  emerald: '#173830',
  emeraldMid: '#2a5850',
  aventurine: '#6b8780',
} as const;

/**
 * The logo's gold-to-garnet fill, stepped per mane stroke instead of a gradient
 * (order matches LOGO.mane: clockwise from the top).
 */
export const MANE_TONES = ['#efdcae', '#e8cd92', '#e0c27e', '#b8894f', '#7d3138', '#6a2530', '#8e4a50', '#c69680', '#dcb98a'];
export const FLOWER_TONE = '#ead2a0';
