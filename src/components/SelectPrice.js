import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from '@mui/material/Typography';
import './searchbar.css';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const prices = ['Từ 100000 - Đến 500000', 'Từ 100000 - Đến 500000', 'Từ 1000000 - Đến 2000000', 'Trên 2000000'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Price</DialogTitle>
      <List sx={{ pt: 0 }}>
        {prices.map((price) => (
          <ListItem button onClick={() => handleListItemClick(price)} key={price}>
            <ListItemAvatar>
              <Avatar style={{color:'#0d5835', backgroundColor:"#f5f5f5"}}>
                <MonetizationOnIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={price} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SelectPrice() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(prices[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Price</FormLabel>
        <Typography variant="subtitle1" component="div">
          {selectedValue}
        </Typography>
        <br />
        <Button className="btn-select-price" variant="outlined" onClick={handleClickOpen}>
          Select Price
        </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </FormControl>
    </div>
  );
}