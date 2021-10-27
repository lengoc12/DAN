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
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Typography from '@mui/material/Typography';
import './searchbar.css';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Apis, { endpoints } from "../configs/Apis";
import { useEffect, useState } from "react";


const categories = ['HOODIE & SWEATER', 'SKIRT', 'OUTER', 'BAG', 'HAT', 'SHOES', 'PANTS', 'TOP'];


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
      <DialogTitle>Select Category</DialogTitle>
      <List sx={{ pt: 0 }}>
        {categories.map((category) => (
          <ListItem button onClick={() => handleListItemClick(category)} key={category}>
            <ListItemAvatar>
              <Avatar style={{color:'#0d5835', backgroundColor:"#f5f5f5"}}>
                <CheckroomIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={category} />
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

export default function SelectCategory() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(categories[1]);

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
        <FormLabel component="legend">Category</FormLabel>
        <Typography variant="subtitle1" component="div">
          {selectedValue}
        </Typography>
        <br />
        <Button className="btn-select-price" variant="outlined" onClick={handleClickOpen}>
          Select Category
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