import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IVideo } from "../../services/interfaces";
import { styles } from "./styles";

type Props = {
  trailer: IVideo | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const TrailerModal = ({ trailer, open, setOpen }: Props) => {
  return (
    <>
      <Modal closeAfterTransition sx={styles.modal} open={open} onClose={() => setOpen(false)}>
        {trailer ? (
          <iframe
            data-autoplay
            className='video'
            src={`https://www.youtube.com/embed/${trailer?.key}`}
            title='Trailer'
            frameBorder='0'
            data-allow='autoplay'
            allowFullScreen
          />
        ) : (
          <Box>Trailer doesn&apos;t found</Box>
        )}
      </Modal>
    </>
  );
};

export default TrailerModal;
