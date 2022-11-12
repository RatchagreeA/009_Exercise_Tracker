# Exercise Tracker

## Overview
Exercise Tracker is a web app that allows users to log their activities and store them in a database. 

## Built With
- Programming languages:
    - HTML
    - CSS
    - JavaScript

- Frameworks:
    - ExpressJS
    
- Database:
    - MongoDB

## Features
1. Create new user by fill Create a New User form.
2. Add activities by fill Add exercises form.
3. Get all user information by send GET request to /api/users.
4. Get exercise log by send GET request to /api/users/:\_id/logs.  
  **GET /api/users/:_id/logs?[from][&to][&limit]**  
  **[ ]** = optional  
  **from, to** = dates (yyyy-mm-dd); **limit** = number  

[Link Demo Here!](https://009ExerciseTracker.ratchagreea.repl.co)

