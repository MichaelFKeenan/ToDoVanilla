import {
  Router
} from 'express';

const {
  google
} = require('googleapis');
import credentials from '../credentials';

const router = Router();

const url = process.env.URL ? process.env.URL : "https://to-do-vanilla.herokuapp.com"

router.post('/event', async function (req, res) {
  const item = req.body;

  var oauth2Client = new google.auth.OAuth2(
    credentials.clientID,
    credentials.clientSecret,
    credentials.callbackURL
  );

  oauth2Client.credentials = {
    access_token: req.user.refreshToken.access_token,
    refresh_token: req.user.refreshToken.id_token
  };

  var calendar = google.calendar('v3');

  var eventRequest = generateGoogleEventRequest(item);
  console.log('eventRequest', eventRequest)
  const response = calendar.events.insert({
    auth: oauth2Client,
    calendarId: req.user.emailAddress,
    resource: eventRequest,
  }, function (err, newEvent) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', newEvent);
  });

  res.send(response);
});

//move all this stuff to a new service, this will all be re-used for edit etc
const generateGoogleEventRequest = (item) => {
  return {
    'summary': item.Name,
    'description': generateEventDescription(item),
    'start': {
      'date': item.CompleteBy
    },
    'end': {
      'date': item.CompleteBy
    },
    'attendees': [{
      'email': item.assignedUserEmail
    }],
    'sendNotifications': true,
    'sendUpdates': true,
    'reminders': {
      'useDefault': false,
      'overrides': [{
        'method': 'email',
        'minutes': 24 * 60
      }, ],
    }
  }
}

const generateEventDescription = (item) => 
`<h2>${item.Name}</h2>
</br>
<h4>Description:</h4>
${item.Description}
</br>
<h4>Assined To:</h4>
${item.assignedUserEmail}
</br>
<a href='${url}/items'>View Item</a>`

export default router;