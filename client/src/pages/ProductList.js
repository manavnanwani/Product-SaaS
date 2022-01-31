import React, { useState, useEffect, useLayoutEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Divider,
  Avatar,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ProductListToolbar from "../components/product/ProductListToolbar";
import { URI } from "../config";
import axios from "axios";

const ProductList = () => {
  const ProductCard = ({ product, ...rest }) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar alt="Product" src={product.media} variant="square" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.Title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.Description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              <Button variant="outlined" onClick={() => addToCart(product)}>
                Add To Cart
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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

  const [products, setProducts] = useState([]);
  console.log(products);
  const getProducts = async () => {
    await axios
      .get(`${URI}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const addToCart = async (prod) => {
    const { userId, name, email } = JSON.parse(
      sessionStorage.getItem("userInfo")
    );

    // CREATE PAYMENT
    // const sendData = {
    //   name,
    //   emailId: email,
    //   productname: prod.Title,
    //   OTP: prod.OTP,
    //   amount: 250,
    //   description: prod.Description,
    //   paymentUrl: `${URI}/geturl?amt=250&name=${name}&emailId=${email}&productname=${prod.Title}&description=${prod.Description}&otp=${prod.OTP}`,
    // };

    // await axios
    //   .post(`${URI}/payments`, { data: sendData })
    //   .then((res) => {
    //     var win = window.open(res.data.paymentURL, "_blank");
    //     win.focus();
    //   })
    //   .catch((err) => console.log(err));

    // SAVE PRODUCT
    const data = {
      userID: userId,
      product: prod,
      productID: prod._id,
      userEmail: email,
      OTP: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    };
    await axios
      .post(`${URI}/carts`, data)
      .then((res) => handleClick())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Products | Material Kit</title>
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
          message="Product Added"
          action={action}
        />
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination color="primary" count={3} size="small" />
            </Box> */}
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
