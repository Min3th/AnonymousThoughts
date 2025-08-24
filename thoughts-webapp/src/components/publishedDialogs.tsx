import { Dialog, DialogTitle, DialogContent, Typography, IconButton, DialogActions, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

type ThoughtDialogProps = {
  open: boolean;
  onClose: () => void;
  generatedId: string | null;
};

export const ThoughtDialog = ({ open, onClose, generatedId }: ThoughtDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const copyToClipboard = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2, // 16px rounded corners
            boxShadow: 4,
          },
        },
      }}
    >
      <DialogTitle>Thought Added Successfully!</DialogTitle>
      <DialogContent>
        <Typography>
          Your ID: <strong>{generatedId}</strong>
          <IconButton onClick={copyToClipboard}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
