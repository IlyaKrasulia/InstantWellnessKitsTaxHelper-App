export const COLORS = {
  // Base Backgrounds
  white: "#FFFFFF",
  background: "#F8F9FA", // Soft airy background for the whole page
  surface: "#FFFFFF", // Card and modal backgrounds

  // Primary Actions (BetterMe Style)
  primaryGradient: "linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)",
  primarySolid: "#38BDF8", // Fallback or secondary primary

  gray: "#696969",

  // Text Colors
  textPrimary: "#2D3142", // Almost black for high readability
  textSecondary: "#9094A6", // Soft grey for descriptions and placeholders
  textMuted: "#C1C4D2", // Very light grey for borders or disabled text

  // Semantic Colors
  success: "#82C09A", // Soft green for "Paid" or "Success"
  warning: "#F3A683", // Soft orange for "Pending"
  error: "#E77F7F", // Gentle red for errors
  errorLighter: "#ff4c4c", // For hover effects

  // Interactive Elements
  border: "#E8EBF0", // Subtle border for inputs and tables
  hoverOverlay: "rgba(192, 183, 229, 0.08)", // Light purple tint for hover states
};

export const FONT_SIZES = {
  h1: "32px", // Page titles
  h2: "24px", // Section headers
  body: "16px", // Main textbbb
  small: "14px", // Table headers, captions
  tiny: "12px", // Labels or button text
};

export const SHADOWS = {
  soft: "0 8px 30px rgba(0, 0, 0, 0.05)", // Floating card effect
  input: "inset 0 2px 4px rgba(0, 0, 0, 0.02)", // Subtle depth for inputs
};

export const BORDER_RADIUS = {
  small: "8px", // Checkboxes/Tags
  medium: "16px", // Cards/Modals
  large: "30px", // Buttons (pill-shaped)
};

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "40px",
};

export const FONTS = {
  family: "'Gilroy', sans-serif",
  weight: {
    regular: 400,
    medium: 500, // Добавили для меню и таблиц
    bold: 700,
  },
};
