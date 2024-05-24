import React from "react";
import { Button } from "@mui/material";

const ResponsiveButton = ({ isLoading }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      sx={{
        width: "100%",
        maxWidth: "200px",
        height: "50px",
        marginY: "1rem",
        "@media (max-width: 600px)": {
          maxWidth: "100%",
        },
      }}
      disabled={isLoading}
    >
      {isLoading ? "Signing In..." : "Sign In"}
    </Button>
  );
};

export default ResponsiveButton;
