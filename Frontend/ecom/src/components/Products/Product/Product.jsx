import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import {AddShoppingCart, CallMissedSharp} from '@material-ui/icons'

import useStyles from './styles'

const Product = ({product, toggle}) => {
    const classes= useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.image} title={product.name} /> 
                <CardContent>
                    <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                    {product.name}
                    </Typography>
                    <Typography variant="h5">
                    {product.price}
                    </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                    </CardContent>
                    <CardActions disableSpacing className={classes.CardActions} >
                        <IconButton aria-label="Open product details" onClick={toggle}>
                            <AddShoppingCart/>
                            </IconButton>
                        </CardActions>
            </Card>
            </div>
    )
}

export default Product;