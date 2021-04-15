# CURATIO

## Value Add Proposal
The application allows users to login into CURATIO and see their hobbies tiles; they can click into those tiles and see the list of videos associated with those hobbies on their screen; they can then see their note taking panel next to thier video library.
    
## Overview
CURATIO will allow users to search for Youtube videos by hobby, create lists based on their interests, and take real-time notes while watching their curated list, which they can then send to their email for later review.  The Curator user will have their profile on the app, which will allow them to store multiple video libraries and their corresponding notes.

## User Story
AS A Person interested in many hobbies.
I WANT a curated list of videos based on a specific kind of project.
SO THAT I can do the project with my notes which are then emailed to me.

## Tech Stack

### CSS
Bootstrap

### Tables
User Model (username, password, email,id(pk)),
Hobby(Tile) Model (id(pk), category, user_id(foreign-key))
Video Model (video_title, description, thumbnail, id(pk), user_id(foreign-key), hobby_tile_id(forgein-key), YouTube_id)
Notes Model (id(pk), title, video_id(fk), user_id(fk), content)

### Work Flow (User pov)
User will login, if there is no user create login
Dispaly saved hobbies or search for a new hobby videos
For each saved hobby there will be a tile for the user to click into after login
When clicked a tile will take user to hobby page
On hobby page they will be able view and save the vidoes associated with their hobby
Next to the videos there will be a note taking section where the user can save notes and email the notes they take from the video

### npm
Express.js - server, GET & POST routes,
Handlebars - renders HTML template,
MySQL - database,
sequelize - database models,
Nodemailer - email automation
bcrypt - encryption for login

### APIs
YouTube - GET route

Heroku


