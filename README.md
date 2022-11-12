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
1. Fill out the Create a New User form to create a new user.
2. Fill out the exercise form to add activities.
3. Get all user information by sending a GET request to /api/users.
4. Get an exercise log by sending a GET request to /api/users/:\_id/logs.
  **GET /api/users/:_id/logs?[from][&to][&limit]**  
  **[ ]** = optional  
  **from, to** = dates (yyyy-mm-dd); **limit** = number  

[Link Demo Here!](https://009ExerciseTracker.ratchagreea.repl.co)

