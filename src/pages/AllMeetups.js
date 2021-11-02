import { useState, useEffect } from 'react';
import MeetupList from "../components/meetups/MeetupList";
// const DUMMY_DATA = [
//     {
//     id: 'm1',
//     title: 'This is a first meetup',
//     image:
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Meetupstreet 5, 12345 Meetup City',
//     description:
//     'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//     },
//     {
//     id: 'm2',
//     title: 'This is a second meetup',
//     image:
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Meetupstreet 5, 12345 Meetup City',
//     description:
//     'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//     },
// ];
function AllMeetupsPage() {
    const [isLoading, setIsLoading] = useState(true); //returns an array with two elements, element 1 is current state snapshot and 2nd is a function for updating the state
    const [loadedMeetups, setLoadedMeetups] = useState([]);
    
    useEffect(() => {
        setIsLoading(true);
        //excuted only under certain circumstances, when the 2nd argument has changed
        fetch('https://react-getting-started-b876f-default-rtdb.firebaseio.com/meetups.json'
        //fetch defaults to a get request, and returns a promise
        ).then(response => {
            return response.json();//json also returns a promise as well so.. it has to be returned/resolved first
        }).then(data => {
            //we want to extract an array of meetups and then pass to meetup list
            const meetups = [];
            for (const key in data) {
                const meetup = {
                    id: key,
                    ...data[key]
                    // ... is called the spread operator (default js), copies all key value pairs
                };
                meetups.push(meetup);
            }
            setIsLoading(false);
            setLoadedMeetups(meetups);
        });
    }, []);//arg 1 is a function , 2nd arg is an array of external dependancies
    //this code will only run once when the page is rendered for the first time, because there are no external dependancies

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return <section>
        <h1>All Meetups Page</h1>
        <MeetupList meetups={loadedMeetups}/>
        </section>;
}

export default AllMeetupsPage;