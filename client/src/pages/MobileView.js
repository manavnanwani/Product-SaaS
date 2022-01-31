import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { URI } from "../config";
import axios from "axios";

const MobileView = () => {
  // const { userId } = JSON.parse(sessionStorage.getItem("userInfo"));
  const initialState = { email: "", otp: "" };
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [URL, setURL] = useState("");
  const [showURL, setShowURL] = useState(false);

  const submitResponse = async () => {
    await axios
      .get(`${URI}/carts/${formData.email}/${formData.otp}`)
      .then(async (res) => {
        const prod = res.data[0];
        // CREATE PAYMENT
        const sendData = {
          emailId: formData.email,
          productname: prod.product.Title,
          OTP: formData.otp,
          amount: prod.product.amount,
          description: prod.product.Description,
          paymentUrl: `${URI}/geturl?amt=250&name="user"&emailId=${formData.email}&productname=${prod.product.Title}&description=${prod.product.Description}&otp=${formData.otp}`,
        };
        await axios
          .post(`${URI}/payments`, { data: sendData })
          .then(async (res) => {
            setURL(res.data.paymentURL);
            handleClickOpenD();
            await axios
              .post(`${URI}/mobile-responses`, formData)
              .then((res) => {
                setFormData(initialState);
                handleClick();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Helmet>
        <title>Mobile | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Response Submitted"
          action={action}
        />
        <Card sx={{ p: 3, m: 2 }}>
          <TextField
            label="Customer Email"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.email}
            onChangeCapture={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            label="OTP"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.otp}
            onChangeCapture={(e) =>
              setFormData({ ...formData, otp: e.target.value })
            }
          />
          <Button fullWidth variant="contained" onClick={submitResponse}>
            Submit
          </Button>
          <Typography
            variant="body1"
            align="center"
            sx={{ wordBreak: "break-all", mt: 2, mx: 10 }}
          >
            {showURL && URL}
          </Typography>
        </Card>
        <Dialog
          open={openD}
          onClose={handleCloseD}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Mark as Completed?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to mark this order as completed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleCloseD();
                setShowURL(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                handleCloseD();
                setShowURL(true);
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default MobileView;
