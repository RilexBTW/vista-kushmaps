import React, { useEffect, useRef, useState } from 'react';
import { CssBaseline, BottomNavigation, BottomNavigationAction, Container, Typography, Backdrop } from '@mui/material';
import { Home, Explore, ShoppingCart } from '@mui/icons-material';
import StoreLocations from './StoreLocations';
import Cart from './Cart';
import StorePage from './StorePage';
import EmptyCart from './EmptyCart';
import './App.css';
import './colors.css';
import ButtonAppBar from './ButtonAppBar';
import CartEmptyMessagePopup from './CartEmptyMessagePopup';

const devMode = !window.invokeNative;

const App = () => {
    const [theme, setTheme] = useState('dark');
    const [direction, setDirection] = useState('N');
    const [notificationText, setNotificationText] = useState('Notification text');
    const [showLocations, setShowLocations] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const appDiv = useRef(null);
    const [isCartEmptyPopupOpen, setIsCartEmptyPopupOpen] = useState(false);
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);

    const products = [
        { id: 1, name: 'OG Kush Joint', price: 19.99 },
        { id: 2, name: 'Sour Amnesia Joint', price: 29.99 },
        { id: 3, name: 'Pineapple Express Joint', price: 39.99 },
        { id: 4, name: 'Honeybun Joint', price: 49.99 },
        // Add more products as needed
    ];

    const storeLocations = [
        { id: 1, name: 'Cookies', location: 'Location 1' },
        { id: 2, name: 'Opening Soon', location: 'TBD' },
        { id: 3, name: 'Opening Soon', location: 'TBD' },
        // Add more store locations as needed <ButtonAppBar className="bottom-navigation" />
    ];

    const handleHomeClick = () => {
        setSelectedStore(null);
        setShowLocations(false);
    };

    const handleCartButtonClick = () => {
        if (cartItems.length === 0) {
            setIsCartEmptyPopupOpen(true);
        } else {
            setShowLocations(false);
        }
        setIsCartPopupOpen(!isCartPopupOpen); // Toggle the cart popup
    };

    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
    };

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
    <div className="app" ref={appDiv} data-theme={theme}>
        <CssBaseline />
        <Container>
            <Typography variant="h4" style={{ color: 'var(--text-primary)', display: 'flex', justifyContent: 'center' }}>
                KushMaps
            </Typography>
            {showLocations && !selectedStore ? (
                <StoreLocations
                    storeLocations={storeLocations}
                    onClickStore={setSelectedStore}
                    onClickProduct={handleAddToCart}
                />
            ) : (
                selectedStore ? (
                    <StorePage store={selectedStore} products={products} onAddToCart={handleAddToCart} />
                ) : (
                    cartItems.length > 0 && !showLocations ? (
                        <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
                    ) : (
                        showLocations && cartItems.length === 0 && (
                            <EmptyCart /> // Display the EmptyCart component when cart is empty and viewing the cart
                        )
                    )
                )
            )}
            <Backdrop open={isCartPopupOpen} onClick={handleCartButtonClick} style={{ zIndex: 1100, position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }} />
        </Container>
        <BottomNavigation className="bottom-navigation">
            <BottomNavigationAction label="Home" icon={<Home />} onClick={handleHomeClick} />
            <BottomNavigationAction label="Locations" icon={<Explore />} onClick={() => setShowLocations(true)} />
            <BottomNavigationAction label="Cart" icon={<ShoppingCart />} onClick={handleCartButtonClick} />
        </BottomNavigation>
        <CartEmptyMessagePopup open={isCartEmptyPopupOpen} onClose={() => setIsCartEmptyPopupOpen(false)} />
    </div>
</AppProvider>

    );
};

const AppProvider = ({ children }) => {
    if (devMode) {
        return <div className='dev-wrapper'>{children}</div>;
    } else return children;
};

// ... (fetchData and other functions)

export default App;
