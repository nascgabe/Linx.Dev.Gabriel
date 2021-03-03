import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CustomDialog = ({
  title,
  confirmLabel,
  children,
  onConfirm,
  onCancel,
  ...rest
}) => (
  <Dialog
    {...rest}
    onClose={onCancel}
    aria-labelledby="confirm-dialog-slide-title"
    aria-describedby="confirm-dialog-slide-description"
  >
    <DialogTitle id="confirm-dialog-slide-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-slide-description">
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        size={"medium"}
        variant={"contained"}
        color="primary"
        autofocus
        onClick={() => window.location.reload()}
      >
        Entendi
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
