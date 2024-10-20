const customTheme = {
  button: {
    defaultProps: {
      variant: "filled",
      size: "md",
      color: "primaryColour",
      fullWidth: false,
      ripple: true,
      className: "",
    },
    valid: {
      variants: ["filled", "outlined", "gradient", "text"],
      sizes: ["sm", "md", "lg"],
      colors: [
        "primaryColour",
        "secondaryColour",
        "accent",
        "neutral",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
    styles: {
      base: {
        initial: {
          verticalAlign: "align-middle",
          userSelect: "select-none",
          fontFamily: "font-sans",
          fontWeight: "font-bold",
          textAlign: "text-center",
          textTransform: "uppercase",
          transition: "transition-all",
          disabled:
            "disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
        },
        fullWidth: {
          display: "block",
          width: "w-full",
        },
      },
      sizes: {
        sm: {
          fontSize: "text-xs",
          py: "py-2",
          px: "px-4",
          borderRadius: "rounded-lg",
        },
        md: {
          fontSize: "text-xs",
          py: "py-3",
          px: "px-6",
          borderRadius: "rounded-lg",
        },
        lg: {
          fontSize: "text-sm",
          py: "py-3.5",
          px: "px-7",
          borderRadius: "rounded-lg",
        },
      },
    },
    variants: {
      filled: {
        primaryColour: {
          backgroud: "bg-primaryColour",
          color: "text-night",
          shadow: "shadow-md shadow-blue-gray-500/10",
          hover: "bg-secondaryColour",
          focus: "focus:opacity-[0.85] focus:shadow-none",
          active: "active:opacity-[0.85] active:shadow-none",
        },
        secondaryColour: {
          backgroud: "bg-secondaryColour",
          color: "text-night",
          shadow: "shadow-md shadow-blue-gray-500/10",
          hover: "bg-primaryColour",
          focus: "focus:opacity-[0.85] focus:shadow-none",
          active: "active:opacity-[0.85] active:shadow-none",
        },

        accent: {},
        neutral: {},
        info: {},
        success: {},
        warning: {},
        error: {},
      },
      outlined: {},
      gradient: {},
      text: {},
    },
  },
};
export { customTheme };
