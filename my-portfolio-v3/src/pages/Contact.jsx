import React from "react";
import { Typography, TextField, Button, Box } from "@mui/material";

function Contact() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contact Me
      </Typography>
      <TextField label="Your Name" fullWidth margin="normal" />
      <TextField label="Your Email" type="email" fullWidth margin="normal" />
      <TextField
        label="Message"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Send
      </Button>
    </Box>
  );
}

export default Contact;