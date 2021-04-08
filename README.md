# FitLit!

FitLit is an mobile-friendly fitness app that stores and displays a user's hydration, sleep and activity data.  Each of these fitness categories is displayed on its own page, which the user can toggle between using buttons fixed to the bottom of the screen in a convenient navigation bar.

- [Project Page](https://pcmueller.github.io/fit-lit/)
- [Project Repository](https://github.com/pcmueller/fit-lit)
- [Project Spec](http://frontend.turing.io/projects/fitlit.html)

## Functionality

![example GIF](https://media.giphy.com/media/2uajutMslP6z0ckzQW/giphy.gif)

### Home Screen
Upon first loading, the application randomly-generates a new user with data for all three fitness categories.  This data is used to display a personalized welcome message, "today's date", the user's information card, and a comparison of their daily step goal to the all-user average.

### Hydration Display
Click over to the hydration screen, and two simple displays appear: a widget displaying the user's daily water consumption, and another with their weekly stats - average daily water intake over the previous week, and a bar graph displaying their water intake each day over the past week.

### Sleep Display
On the next page, three different sleep-related widgets appear, each displaying the user's "hours slept" and "sleep quality" data over a different period of time: today (the most recent date logged), on average (including all dates logged), and previous week, displayed in the form of two adjacent line graphs.

### Activity Display
With the last button on the nav bar, the user is able to jump over to the activity display, where they're presented with four different widgets, containing: minutes active today, daily steps and miles walked, weekly minutes active (in the form of a 7-day bar graph), and a comparison of these three activity categories to those of all other users, on average.

## Installation
- Clone down the project repository by opening up your console and entering the following command: `git clone git@github.com:pcmueller/fit-lit.git`.
- Once you've cloned the repo, change into the root directory and install the project dependencies using `npm install` or `npm i`.
- Run `open src/index.html` to see the HTML page!

## Technologies & Design
- Clean, semantic HTML and CSS implemented with a "mobile-first" approach using responsive design.
- ES6 Javascript using arrow functions, classes, and array prototype methods.
- Accessibility-friendly with HTML passing the WAVE audit tool.
- Test-Driven Development using Mocha and Chai.
- Charts.js for attractive visual data display.

## Contributors
- [Peter Muellerleile](https://github.com/pcmueller)
- [Shawn McMahon](https://github.com/shawnmcmahon)

#### Project Manager
- [Travis Rollins](https://github.com/Kalikoze)
