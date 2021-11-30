import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import {AddShoppingCart, CallMissedSharp} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import useStyles from './styles'

const Product = ({product, toggle}) => {
    const classes= useStyles();

    return (
        <div>
            <Card className={classes.root}>
            <Link to={`/products/${product.id}`} >
                <CardMedia className={classes.media} image={product.image} title={product.name} /> 
                </Link>
                <CardContent>
                    <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                    {product.title}
                    </Typography>
                    <Typography variant="h5">
                    {product.budget}
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