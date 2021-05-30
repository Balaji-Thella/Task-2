# Task-2

### How do I get set up?

- Summary of set up

  Clone the project.

  Run "npm install".

  Install pm2 in your machine by use command "sudo npm install pm2@latest -g".

  Use command "pm2 start" to start the server.

### API Endpoints

- Create a post-service that takes the message, day, and time in body parameters and it inserts that message into DB at that particular day and time -

  Method: POST

  URL: localhost:8000/message

  Payload: {
  "message":<Enter Message>,
  "date":<Enter date as "DD-MM-YYYY">,
  "time":<Enter time as "hh:mm:ss">
  }

- CRON job scheduled for every 5 minutes to transfer message from collection 1 to collection 2 based on given date and time.
