import {
  Router
} from 'express';

const {google} = require('googleapis');
import credentials from '../credentials';

const router = Router();

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
  // const response = await calendar.events.list({
  //       auth: oauth2Client,
  //       calendarId: 'primary',
  //       timeMin: (new Date()).toISOString(),
  //       maxResults: 10,
  //       singleEvents: true,
  //       orderBy: 'startTime'
  //   });

    const event = {
      'summary': item.Name,
      'description': item.Description,
      'start': {
        // 'dateTime': '2015-05-28T09:00:00-07:00',
        'date': item.CompleteBy
      },
      'end': {
        'date': item.CompleteBy
      },
      //get email from assigned user id? or pass it in?
      // 'attendees': [
      //   {'email': 'lpage@example.com'},
      //   {'email': 'sbrin@example.com'},
      // ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          // {'method': 'popup', 'minutes': 12 * 60},
        ],
      },
    }

    //need to retrieve and use assigned users calendar id!
    const response = calendar.events.insert({
      auth: oauth2Client,
      calendarId: item.assignedUserEmail,
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.htmlLink);
    });

//   const response = await calendar.events.insert({
//     auth: oauth2Client,
//     calendarId: 'primary',
//     sendNotifications: true,
//     sendUpdates: true,
//     singleEvents: true,
//     orderBy: 'startTime'
// });
    console.log('response', response)
    res.send(response);


});

export default router;