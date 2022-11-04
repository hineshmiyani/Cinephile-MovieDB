import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { fetchToken } from "../../utils";

type Props = {
  openLoginModal: boolean;
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
  contentText: string;
};

const AlertLoginModal = ({ openLoginModal, setOpenLoginModal, contentText }: Props) => {
  return (
    <>
      <Dialog open={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <DialogTitle>{"Alert !"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant='outlined' onClick={() => setOpenLoginModal(false)}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              fetchToken();
              setOpenLoginModal(false);
            }}
            autoFocus
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertLoginModal;
