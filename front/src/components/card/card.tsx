import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import product from "../../assets/images/product.jpg";
import {
  DoButton,
  DoButtonSecondary,
} from "../../mini-components/form/buttons/buttons";
import { ImagesGallery } from "../../mini-components/imgs-gallery/imgs-gallery";
import heart from "../../assets/images/heart-icon.svg";
import { ShoppingCart } from "@mui/icons-material";
import heartFilled from "../../assets/images/heart-filled-icon.svg";
import "./card.scss";
import { useContext, useState } from "react";
import { iProduct, homeSlicer } from "../../services/store/features/homeSlicer";

import { useDispatch } from "react-redux";
import notificationContext, {
  iAlert,
} from "../../services/context/notification/context";
export const Card = ({
  _id,
  filename,
  price,
  product_name,
  quantity,
  liked,
}: iProduct) => {
  const dispatch = useDispatch();
  const { setAlert, alert } = useContext(notificationContext);
  const { t, i18n } = useTranslation();

  const handleLike = () => {
    if (!liked) dispatch(homeSlicer.actions.setLike(_id));
    else {
      dispatch(homeSlicer.actions.setUnlike(_id));
    }
  };
  const handleAddtoCart = () => {
    dispatch(
      homeSlicer.actions.addToCart({
        _id,
        filename,
        price,
        product_name,
        quantity,
        liked,
        saved: true,
        count: 1,
      })
    );

    setAlert((pre: iAlert) => ({
      ...pre,
      open: true,
      message:
        i18n.language === "en"
          ? "One Item has been added"
          : "عنصر واحد تمت اضافته",
      action: "info",
    }));
  };
  return (
    <Grid item container md={4} xs={12} className="card" padding={2}>
      <Grid item container xs={12} padding={2} rowGap={2} className="box">
        <div className="like" onClick={handleLike}>
          {liked ? (
            <img src={heart} className="icon" />
          ) : (
            <img src={heartFilled} className="icon" />
          )}
        </div>
        <Grid item xs={12}>
          <ImagesGallery images={[filename]} />
        </Grid>
        <Grid
          item
          container
          xs={12}
          columnGap={1}
          padding={1}
          justifyContent="center"
        >
          <Grid
            item
            xs={5}
            padding={1}
            textAlign="center"
            className="productName"
          >
            {product_name}
          </Grid>
          <Grid
            item
            xs={5}
            padding={1}
            textAlign="center"
            className="productPrice"
        
          >
            {price}{" "}
            $
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "start" },
          }}
        >
          <DoButton title={t("add_to_card")} fun={handleAddtoCart}>
            <ShoppingCart />
          </DoButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
