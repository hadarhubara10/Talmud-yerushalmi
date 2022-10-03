import { FC } from 'react';
import { Box } from '@mui/material';

const classes = (scale: number, isPanning: boolean) => ({
  image: {
    transform: `scale(${scale})`,
    cursor: isPanning ? 'grabbing' : 'grab',
    objectFit: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

interface IProps {
  imageUrl: string;
  onMouseDown: (event: React.MouseEvent) => void;
  scale: number;
  isPanning: boolean;
}

const Image: FC<IProps> = ({ imageUrl, onMouseDown, scale, isPanning }) => {
  const sx = classes(scale, isPanning);

  return (
    <Box
      component={'img'}
      src={imageUrl}
      onMouseDown={onMouseDown}
      sx={sx.image}
      alt={'Talmud yerushalmi'}
    />
  );
};

export default Image;
