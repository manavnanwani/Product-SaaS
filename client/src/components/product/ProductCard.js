import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Avatar,
  Typography,
  Grid,
} from "@material-ui/core";

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
