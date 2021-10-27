import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import "./banner.css";
import Box from '@mui/material/Box';
import {Col} from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function CategoryCard(props) {
  const theme = useTheme();

  return (
    <Col sm={6} md={3} p={2}  className="col-cat">
      <Link className="link" href={props.item.name} underline="none" color="inherit">
        <Card sx={{ display: 'flex'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }} className="box-name">
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h7">
                {props.item.name}
              </Typography>
            </CardContent>
            
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 , height: 198}}
            image={props.item.image}
            alt="Live from space album cover"
          />
        </Card>
      </Link>
    </Col>
  );
}