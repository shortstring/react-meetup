import { useHistory } from 'react-router-dom';
import NewMeetupForm from '../components/meetups/NewMeetupForm';
function NewMeetupPage() {
    const history = useHistory(); //an object that exposes methods that allow us to manipulate broswer history
    function addMeetupHandler(meetupData) {
        //default sends a get request
        // 1st argument is a string (the url to request) .json is required for firebase..not for react
        // so we need to send a post request by adding 2nd arg
        fetch('https://react-getting-started-b876f-default-rtdb.firebaseio.com/meetups.json',
            {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            // history.push()//push new page onto history, allows use to push back button .. but doesnt make sense
            history.replace('/');//navigate back to the starting page.
        });
    }

    return <section>
        <div>New Meetups Page</div>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </section>;
}

export default NewMeetupPage;