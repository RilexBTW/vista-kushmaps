import React from 'react';
import { Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';

const StorePage = ({ store, products, onAddToCart }) => {
    return (
        <div>
            <Typography variant="h5" style={{ color: 'var(--text-primary)' }}>{store.name}</Typography>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item key={product.id} xs={6} md={4} lg={6}>
                        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CardMedia component="img" height="140" image={`url_to_your_product_image_${product.id}`} alt={product.name} />
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'var(--text-primary)' }}>
                                    {product.name}
                                </Typography>
                                <Typography style={{ color: 'var(--text-primary)' }}>
                                    Price: ${product.price}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default StorePage;
