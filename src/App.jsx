import React, { useEffect, useRef, useState } from 'react';
import { CssBaseline, AppBar, BottomNavigation, BottomNavigationAction, Toolbar, Typography, Container, Grid } from '@mui/material';
import { Home, Explore, Favorite } from '@mui/icons-material';
import './App.css';
import './colors.css';
import ButtonAppBar from './ButtonAppBar';

const devMode = !window.invokeNative;

const App = () => {
    const [theme, setTheme] = useState('dark');
    const [direction, setDirection] = useState('N');
    const [notificationText, setNotificationText] = useState('Notification text');
    const appDiv = useRef(null);

    const products = [
        { id: 1, name: 'Product 1', price: 19.99 },
        { id: 2, name: 'Product 2', price: 29.99 },
        { id: 3, name: 'Product 3', price: 39.99 },
        { id: 4, name: 'Product 4', price: 49.99 },
        // Add more products as needed
    ];

    const { setPopUp, setContextMenu, selectGIF, selectGallery, selectEmoji, fetchNui, sendNotification, getSettings, onSettingsChange, colorPicker, useCamera } = window;

    useEffect(() => {
        if (devMode) {
            document.getElementsByTagName('html')[0].style.visibility = 'visible';
            document.getElementsByTagName('body')[0].style.visibility = 'visible';
            return;
        } else {
            getSettings().then((settings) => setTheme(settings.display.theme));
            onSettingsChange((settings) => setTheme(settings.display.theme));
        }

        fetchNui('getDirection').then((direction) => setDirection(direction));

        window.addEventListener('message', (e) => {
            if (e.data?.type === 'updateDirection') setDirection(e.data.direction);
        });
    }, []);

    useEffect(() => {
        if (notificationText === '') setNotificationText('Notification text');
    }, [notificationText]);

    return (
        <AppProvider>
        <ButtonAppBar className="bottom-navigation" />
        <div className="app" ref={appDiv} data-theme={theme}>
            <CssBaseline />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Products</Typography>
                    </Grid>
                    {products.map(product => (
                        <Grid item key={product.id} xs={6}>
                            {/* Product item */}
                            <Typography variant="h6" style={{ color: 'var(--text-primary)' }}>
                                {product.name}
                            </Typography>
                            <p style={{ color: 'var(--text-primary)' }}>
                                Price: ${product.price}
                            </p>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <BottomNavigation className="bottom-navigation">
                <BottomNavigationAction label="Home" icon={<Home />} />
                <BottomNavigationAction label="Explore" icon={<Explore />} />
                <BottomNavigationAction label="Favorite" icon={<Favorite />} />
            </BottomNavigation>
        </div>
    </AppProvider>
    );
};

const AppProvider = ({ children }) => {
    if (devMode) {
        return <div className='dev-wrapper'>{children}</div>;
    } else return children;
};

const fetchData = (action, data) => {
    if (!action || !data) return;

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };

    return new Promise((resolve, reject) => {
        fetch(`https://${window.resourceName}/${action}`, options)
            .then((response) => response.json())
            .then(resolve)
            .catch(reject);
    });
};

export default App;
