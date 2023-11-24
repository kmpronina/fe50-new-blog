import React, { BaseSyntheticEvent, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  createPostFromTMS,
  generateImage,
} from '#api/services/postServices/postServices';

interface Props {
  open: boolean;
  onClose: () => void;
}
const AddPostDialog: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleChangeTitle = (e: BaseSyntheticEvent) => {
    setTitle(e.target.value);
  };

  const handleChangeText = (e: BaseSyntheticEvent) => {
    setText(e.target.value);
  };

  const handleChangeImage = async () => {
    const newData = await generateImage();
    setImage(newData ? URL.createObjectURL(newData) : null);
  };

  const handleClose = () => {
    onClose();
  };

  const handleDone = () => {
    if (image === null) return;
    createPostFromTMS({
      image,
      text,
      title,
      description: text,
      lesson_num: 15,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add some information about your post please</DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: '10px' }}>
          <Box sx={{ display: ' flex', alignItems: 'center' }}>
            <Box
              sx={{ width: '150px', height: '150px', background: '#c4c4c4' }}
              onClick={handleChangeImage}
            >
              {image && (
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={image}
                  alt={'random pic'}
                />
              )}
            </Box>
            <Typography>Click to change the image</Typography>
          </Box>
          <TextField
            value={title}
            label={'Title of your post'}
            onChange={handleChangeTitle}
          />
          <TextField
            value={text}
            label={'Description of your post'}
            onChange={handleChangeText}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button onClick={handleDone}>save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;
