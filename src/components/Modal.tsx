import { FC, useState, useEffect } from 'react';
import { Box, Button, Modal as ModalMui } from '@mui/material';
import { IPosition } from '../models/IPosition';
import Image from './Image';

const classes = (position: IPosition) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    transform: `translate(${position.x}px, ${position.y}px)`,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
  },
});

interface IProps {
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

const Modal: FC<IProps> = ({ imageUrl, open, onClose }) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<IPosition>({
    oldX: 0,
    oldY: 0,
    x: 0,
    y: 0,
    z: 1,
  });
  const [isPanning, setPanning] = useState<boolean>(false);
  const sx = classes(position);

  const onMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setPanning(true);
    setPosition({
      ...position,
      oldX: event.clientX,
      oldY: event.clientY,
    });
  };

  useEffect(() => {
    const mouseup = () => {
      setPanning(false);
    };

    const mousemove = (event: MouseEvent) => {
      if (isPanning) {
        setPosition({
          ...position,
          x: position.x + event.clientX - position.oldX,
          y: position.y + event.clientY - position.oldY,
          oldX: event.clientX,
          oldY: event.clientY,
        });
      }
    };

    window.addEventListener('mouseup', mouseup);
    window.addEventListener('mousemove', mousemove);

    return () => {
      window.removeEventListener('mouseup', mouseup);
      window.removeEventListener('mousemove', mousemove);
    };
  });

  return (
    <ModalMui open={open} onClose={onClose} sx={sx.root}>
      <Box sx={sx.modal}>
        <Image
          imageUrl={imageUrl}
          onMouseDown={onMouseDown}
          scale={scale}
          isPanning={isPanning}
        />
        <Box sx={sx.buttons}>
          <Button variant="contained" onClick={() => setScale(scale + 0.1)}>
            +
          </Button>
          <Button variant="contained" onClick={() => setScale(scale - 0.1)}>
            -
          </Button>
        </Box>
      </Box>
    </ModalMui>
  );
};

export default Modal;
