import { FC, useState } from 'react';
import { Button, Box } from '@mui/material';
import Modal from './Modal';

const sx = {
  root: {
    width: '100vh',
    height: '100vh',
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Main: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={sx.root}>
      <Button sx={sx.button} onClick={handleOpen} variant="contained">
        פתיחת התמונה
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        imageUrl="https://assets.talmudyerushalmi.com/manuscripts/venice/0303_FL77977460.jpg"
      />
    </Box>
  );
};

export default Main;
