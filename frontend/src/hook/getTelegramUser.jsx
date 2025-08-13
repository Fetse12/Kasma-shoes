import React, { useEffect, useState } from 'react';
import useStore from '../zustand/store';

const TelegramWebApp = () => {
    const { user, setUser } = useStore();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', window.Telegram.WebApp.colorScheme === 'dark');


        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready(); // Notify Telegram that the app is ready

            const userData = window.Telegram.WebApp.initDataUnsafe.user;

            // Get user information
            if (userData) {
                setUser({
                    first_name: userData.first_name,
                    hash: window.Telegram.WebApp.initDataUnsafe.hash,
                    telegram_user_id: userData.id,
                    username: userData.username
                })
            } else {
                console.log('cant fetch user data from telegram');
            }
            console.log(user);


        } else {
            console.error('Telegram Web App not initialized');
            setLogs((prevLogs) => [...prevLogs, 'Telegram Web App not initialized']);
        }
    }, []);
};

export default TelegramWebApp;
