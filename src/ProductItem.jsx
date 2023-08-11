import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductItem = ({ product }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={`url_to_your_image_${product.id}`} // Replace with actual image URL
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6" style={{ color: 'var(--text-primary)' }}>
                    {product.name}
                </Typography>
                <Typography style={{ color: 'var(--text-primary)' }}>
                    Price: ${product.price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductItem;
