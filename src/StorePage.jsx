import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import ProductItem from './ProductItem';

const StorePage = ({ store, products }) => {
    return (
        <Container>
            <Typography variant="h4" style={{ color: 'var(--text-primary)', display: 'flex', justifyContent: 'center' }} >
                {store.name} Products
            </Typography>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
                        <ProductItem product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default StorePage;
