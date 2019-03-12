# Twiddler

This repo contains a clone of everyone's favorite microblogging platform. So far, it is only a clone of the front end. This was produced to satisfy the requirements of the Hack Reactor pre-course. See requirements below

## Tech Used
- jQuery

## Demo
[Click here to see a demo](https://befitting-search.glitch.me/)

## Design Notes
- The index.js file is contains a setInterval function at the bottom of the function that controls the all of calls the calls particular functions based on the application's state.
- The application's state is set by two global variables, 'update' and 'activeUser'. Update determines if new tweets will be rendered to the DOM. ActiveUser determines if only a specific user's stream is going to be rendered.


Requirements

### Bare Minimum Requirements

- Show the user new tweets somehow. (You can show them automatically as they're created, or create a button that displays new tweets.)
- Display the timestamps of when the tweets were created. This timestamp should reflect the actual time the tweets were created, and should not just be hardcoded.
- Design your interface so that you want to look at and use the product you're making.
- Allow the user to click on a username to see that user's timeline.

### Advanced

- Show when the tweets were created in a human-friendly way (eg "10 minutes ago"). You'll want to find and use a library for this.
- Allow the user to tweet. (This is going to require you to understand a little more about data_generator.js, but you shouldn't need to modify anything.)