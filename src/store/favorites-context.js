import { createContext, useState } from 'react';

//this will return a react component - components start with capital character..
const FavoritesContext = createContext(
    {
        favorites: [],
        totalFavorites: 0,
        addFavorite: (favoriteMeetup) => { },
        removeFavorite: (meetupId) => { },
        itemIsFavorite: (meetupId) => { }
    });

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([]);
    
    function addFavoriteHandler(favoriteMeetup) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteMeetup);//making sure you are on the latest snapshot
        });
    }

    function removeFavoriteHandler(meetupId) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.filter(meetup => meetup.id !== meetupId);//filter is a built in function that executes for every item in the array
        });
    }

    function itemIsFavoriteHandler(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId);//some is if some item matches 
    }
    
    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler,
    };
    
    
    return <FavoritesContext.Provider value = {context}>
        {props.children}
    </FavoritesContext.Provider>
    }

export default FavoritesContext;

