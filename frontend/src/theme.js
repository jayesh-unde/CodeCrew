import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1A202C", // Main background color
    800: "#1e1e1e", // Newly added editor background color
    700: "#2D3748", // Example darker color for hover states, adjust as needed
    300: "#cbd5e0",
    200:"#262626",
    text: '#ffffff', // Lighter color for light mode or contrast
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === "dark" ? "brand.800" : "brand.300",
        _hover: {
          bg: "brand.700",
        },
      }),
    },
    
  },
  
  // Apply editor background color to specific components if needed
  Box: {
    baseStyle: {
      bg: "brand.800", // Using the same color for Boxes to match the editor
    },
  },
  Text: {
    baseStyle: {
      color: 'brand.text', // Set text color globally for all Text components
    },
  },
};

const styles = {
  global: {
    body: {
      bg: "brand.900", // Uses the main background color
      color: "white", // Ensures text color is set for readability
    },
    // You can add more global styles if needed
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors,
  components,
  styles,
});

export default theme;
