import { useEffect, useRef, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ButtonAppBar from './ButtonAppBar';
import SimpleBottomNavigation from './SimpleBottomNavigation';


import './App.css';

const devMode = !window.invokeNative;




const App = () => {
    const [theme, setTheme] = useState('dark');
    const [direction, setDirection] = useState('N');
    const [notificationText, setNotificationText] = useState('Notification text');
    const appDiv = useRef(null);
    
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      

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

// ...
// <ButtonAppBar />
return (
    <AppProvider>
      <div className='app' ref={appDiv} data-theme={theme}>
        <div className='app-wrapper'>
          <div className='header'>
            <ButtonAppBar />
            <div className='title'>KushMaps</div>
            <div className='subtitle'>v0.1</div>
          </div>
          <div className='bottomnav-wrapper'>
            <SimpleBottomNavigation />
          </div>
        </div>
      </div>
    </AppProvider>
  );
  
  // ...
  
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
