import React, { useEffect, useState } from "react";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Avatar,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import getInitials from "../utils/getInitials";
import customers from "../__mocks__/customers";
import { URI } from "../config";
import axios from "axios";

const CustomerList = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getItems();
  }, []);

  const [items, setItems] = useState([]);
  const getItems = async () => {
    const { userId } = JSON.parse(sessionStorage.getItem("userInfo"));
    await axios
      .get(`${URI}/carts/${userId}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  console.log(items);

  return (
    <>
      <Helmet>
        <title>Cart | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Product Description</TableCell>
                        <TableCell>OTP</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.slice(0, limit).map((item) => (
                        <TableRow hover key={item.id}>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {item.product.Title}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{item.product.Description}</TableCell>
                          <TableCell>{item.OTP}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              {/* <TablePagination
                component="div"
                count={customers.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              /> */}
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
