import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1A202C", // Main background color
    // Add other color scales as needed for your design
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold", // Adjust button text style if needed
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === "dark" ? "brand.800" : "brand.300", // Use brand colors or adjust as needed
        _hover: {
          bg: "brand.700", // Modify as per your design requirements
        },
      }),
    },
  },
  // Other components can be styled similarly
};

const styles = {
  global: {
    body: {
      bg: "brand.900", // Set global background color for the body
      color: "white", // Ensure text color is set for readability
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
