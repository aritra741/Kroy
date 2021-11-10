import React from "react";
import {Grid} from '@material-ui/core'
import Product from "./Product/Product";

const products=[
    {id: 1, name: "Shoes", description: "Running shoes", price: "5 taka", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-buy-running-shoes-1611448820.jpg?crop=0.516xw:0.774xh;0.247xw,0.226xh&resize=640:*" },
    {id: 2, name: "Macbook", description: "Apple macbook", price: "10 taka", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000" },
    
]

const Products = () => {
    return (
        <main>
        <Grid container justifyContent='center' spacing={4}>
        {
            products.map((product)=>(
                <Grid item key={product.id} xs={12} sm={6} md ={4} lg={3}  >
                    <Product product={product} />
                    </Grid>
            ))
        }
        </Grid>
        </main>
    )
}

export default Products;