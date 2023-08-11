import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';

const StoreLocations = ({ storeLocations, onClickStore }) => {
    return (
        <div>
            {storeLocations.map(store => (
                <Card
                    key={store.id}
                    style={{
                        margin: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => onClickStore(store)}
                >
                    <CardMedia
                        component="img"
                        height="140"
                        image={`url_to_your_store_image_${store.id}`}
                        alt={store.name}
                    />
                    <CardContent>
                        <Typography variant="h6" style={{ color: 'var(--text-primary)' }}>
                            {store.name}
                        </Typography>
                        <Typography style={{ color: 'var(--text-primary)' }}>
                            Location: {store.location}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StoreLocations;
