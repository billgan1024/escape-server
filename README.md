## Escape Server Backend
The backend functionality for my game [Escape](https://github.com/pblpbl1024/escape). This was made using Express.js and various features of Firebase including its REST API implementation, Firebase Authentication, Cloud Functions, and Cloud Firestore.
## Features
### HTTPS-secured API endpoints
* This allows secure transmission of player data like login data, player stats, and user-generated content like custom levels
### Database security rules
* Players are only allowed to read data from the database when they are signed in. Additionally, they are only allowed to edit their own document once they are signed in. 
### Server-side anticheat
* Since I plan to create leaderboards for players to compete for the best time to complete each level, the system is set up so that all users can view detailed data about any user's submission. This allows for anyone to verify that certain requests were legitimate despite the requests already originating from an authenticated user.