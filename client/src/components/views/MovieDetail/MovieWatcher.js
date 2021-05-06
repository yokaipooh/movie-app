import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ReactVideo } from "reactjs-media";
import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MovieWatcher() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="color-primary hasLabel hasIcon ltr-v8pdkb"
        tabindex="-1"
        type="button"
        onClick={handleOpen}
        style={{}}
      >
        <CaretRightOutlined />
        <span className="ltr-zd4xih">Watch Moive</span>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/4_ZiJGY5F38"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> */}
          <ReactVideo
                src="http://ngoclamhotel.vn/wp-content/plugins/wp-useronline/jw8/?v=aHR0cHM6Ly93ZWIubG90dXNjZG4udm4vMjAyMS80LzgvYjU3YjI1MWM3YzkyNjZhYjk2NmJmMWFiNzBkNmNiMzBfMTU4OTYzODcxNTc3Ny1jeGtvbGNncmJzLm1wNC9tYXN0ZXIubTN1OA=="
                poster="//i0.wp.com/image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg"
                type="video/mp4"
                primaryColor="red"
                // other props
            />
        </Fade>
      </Modal>
    </div>
  );
}
