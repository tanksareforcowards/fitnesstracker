$(document).ready(function () {

  // We're going to store some data here because we want to reference this
  // stuff multiple times, and this way we don't need to keep doing API calls
  let allWorkouts = [];
  let selectedWorkout = { activities: [] };


  //          FEATURES TO IMPLEMENT:
  // Create a new workout
  // Save a new workout
  // Create new exercise activity
  // Save new exercise activity

  /** ********** DOM Population ********** */

  // Populate workout data
  // (If we're adding a new blank item to the list we will want to auto-select 
  // it, so that is handled in the params argument)
  function populateWorkouts(params){
    $("#workouts-list").empty();
    const ul = $("<ul>");
    allWorkouts.forEach( (workout, idx) => {
      console.log(workout);
      const li = $("<li>");
      li.addClass("workout-item");
      li.attr("data-workout-id", workout.id);
      li.attr("data-workout-idx", idx);
      li.html("<span>" + workout.day + "</span>" + workout.name);
      ul.append(li);
    });
    $("#workouts-list").append(ul);
    if( params && params.selectLatest === true ){
      $("#workouts-list li:last-child").addClass("selected");
    }
  }

  // STUDENTS: Populate activity data for the selected workout
  function populateActivities() {
    // code here for routing
    // populate the activities by looping through each one
    // and requesting each activity id
    getExercises
  }


  /** ********* Event handlers ********* */
  
  //When someone clicks on a workout item, we'll populate the DOM with 
  // all activities for that workout. Note that because the workouts don't 
  // exist in the DOM when the page is loaded, we need to use the special
  // event selector.
  $("#workouts-list").on("click", ".workout-item", function (e) {
    e.preventDefault();
    console.log("item clicked")
    $("#workouts-list li").removeClass("selected");
    $(this).addClass("selected");
    const idx = $(this).attr("data-workout-idx");
    const id = $(this).attr("data-workout-id");
    selectedWorkout = allWorkouts[idx];
    $("div.right-column").show();
    populateActivities();
  });

  // Create a new empty workout for the user to work with
  $("button#add-workout").on("click", function (e) {
    e.preventDefault();
    const dayString = moment().format("MMM DD, YYYY");
    const name = $("#workout-name").val().trim();
    selectedWorkout = { name: name, day: moment().format("MMM DD, YYYY"), activities: [] };
    allWorkouts.push(selectedWorkout);

    // Save to db via api
    saveSelectedWorkout();

    populateWorkouts({ selectLatest: true });
    $("div.right-column").show();
  });

  // STUDENTS: Add an activity to the selected workout, then save via API
  $("button#add-activity").on("click", function (e) {
    e.preventDefault();
    let activity = {};
// code here for:
  // exercise name
  // durationn
  // weight amount
  // num of sets
  // num of reps
 

// Here's another example:
//     Workout: Day 1
//       Activity: Cardio work
//         Exercise: Stairmaster
//         Duration: 30 minutes
//       Activity: Weight work
//         Exercise: Bench press
//         Weight: 150
//         Sets: 3,
//         Reps: 10
//     Workout: Day 2
//       Activity: Cardio
//         Exercise: Jogging
//         Duration: 50 minutes
//     Workout: Day 3
//       Activity: Weight work
//         Exercise: Arm curls
//         Weight: 40
//         Sets: 3,
//         Reps: 10
  });


  /** ********** API Calls ******************* */



  // check vs. handouts
  // Retrive a JSON payload of all exercises
  function getExercises() {
    $.ajax({
      method: "GET",
      url: "/api/exercise"
    }).then(resp => {
      console.log(resp)
      // populate the select area
      resp.forEach(exercise => {
        const opt = $("<option>");
        opt.val(exercise.name);
        opt.text(exercise.name);
        $("select#exercise").append(opt);
      });

    })
  }

  // STUDENTS: Retrieve a JSON payload of all workouts done so far
  function getWorkouts() {
    // code here for ajax GET method 
    // (retrieve all workouts done so far)
  }

  // Save the currently selected workout
  // fixed underscore
  // function saveSelectedWorkout() {
  //   $.ajax({
  //     method: "POST",
  //     url: "/api/workout",
  //     data: selectedWorkout
  //   }).then(function (resp) {
  //     console.log(resp);
  //     if (resp && resp.id ){
  //       selectedWorkout.id = resp.id;
  //     }
  //   });
  // }

  // Save the currently selected workout
  function saveSelectedWorkout(){
    $.ajax({
      method: "POST",
      url: "/api/workout",
      data: selectedWorkout
    }).then(function(resp){
      console.log(resp);
      if( resp && resp.id ){
        selectedWorkout.id = resp.id;
      }
    });
  }

  // Add an activity to the current workout being viewed.
  // Save the currently selected workout
  // function saveActivity(activity) {
  //   $.ajax({
  //     method: "POST",
  //     url: "/api/activity?workoutId=" + selectedWorkout.id,
  //     data: activity
  //   }).then(function (resp) {
  //     console.log(resp);
  //   });
  // }
  // Add an activity to the current workout being viewed.
  // Save the currently selected workout
  function saveActivity(activity){
    $.ajax({
      method: "POST",
      url: "/api/activity?workoutId=" + selectedWorkout.id,
      data: activity
    }).then(function(resp){
      console.log(resp);
    });
  }

  // Page-loading operations
  getExercises();
  getWorkouts();
});



// ********** Gary's Notes ********

// Here's some additional help for the homework:
// First, here is a good link for more info on setting up associations:
//      https://sequelize.org/v3/docs/associations/
// For this assignment:
// Each workout is a days' worth of activities, so:
//   -> Each workout has multiple activities
//   (try and figure out what type of relationship that is)
// Each activity has 1 exercise, (that's a different type of relationship)
// Each activity also has its own fields for details about how the exercise was done (duration, weight, intensity, etc)
// Exercises are just a table listing all the exercises available for any activity. These can be added to the database yourself and do not need to be managed by the user.
// You only need to create an association when you need sequelize to give you the related data. For example, when you are retrieving Workout data, you want to see the Activities it has. So you create an assciation on the Workout model.  BUT, when you are getting info about an activity, you don't need to know what Workout it is a part of. So you don't need an association for that there.
// Likewise, when you are getting data about an Activity, you DO need to know about the exercise. So there should be an associaton for the Exercise model. But when getting an Exercise, you don't need to know what workouts it's being used in.
// Summary:
//    Workout model
//      Needs an association with Activity model
//   Activity model
//      Needs an association with Exercise model
//   Exercise model
//      Needs no declared associations
//   Here's another example:
//     Workout: Day 1
//       Activity: Cardio work
//         Exercise: Stairmaster
//         Duration: 30 minutes
//       Activity: Weight work
//         Exercise: Bench press
//         Weight: 150
//         Sets: 3,
//         Reps: 10
//     Workout: Day 2
//       Activity: Cardio
//         Exercise: Jogging
//         Duration: 50 minutes
//     Workout: Day 3
//       Activity: Weight work
//         Exercise: Arm curls
//         Weight: 40
//         Sets: 3,
//         Reps: 10
//   Your exercises List might look something like this
//     Stairmaster
//     Jogging
//     Bench Press 
//     Arm Curls
//     etc....


// Problem:  When you make changes to your models, you need to reload the server.js file with the {force:true} setting on sequelize in order for the model changes to take place. But doing that also wipes away any seeding you've done. So you have to run the server file with force:true, quit and run the seed file, then run the server.js file AGAIN *without* force:true applied. Major pain.
// You can avoid all this by doing the following. It's easier than it seems:
// 1. Create a file in the root of your project called sync.js, and inside it put this code:
//       const db = require("./models");
//       db.sequelize.sync().then(function() {
//         console.log("models synced")
//         process.exit()
//       });
// 2. Make sure you have sequelize-cli as a dependency. You'll need it.
// 3. Make sure your config/config.json file has all the correct database credentials etc. The sequelize-cli package will look for this.
// 4. In your server.js file, make sure that the {force:true} config option is REMOVED from the sync call at the bottom of the file.
// 5. In your package.json file, your scripts object should have the following:
//       "start": "node server.js",
//       "deploy": "npx sequelize db:drop && npx sequelize db:create && node sync.js && npm run seed && node server.js",
//       "seed": "npx sequelize db:seed:all"
// 6. You can have other scripts if you want, but you MUST have these.
// 7. You must have the database you are using created already in Workbench, but only for the very first time you do the next step. Thereafter sequelize-cli will delete it and create a new one each time.
// 8. Anytime you make a change to your models, Control-C to quit the server and then run:
//       npm run deploy
// Here's what happens:
//   - It deletes the existing database completely
//   - It creates a new one, getting the name from your config file 
//   - It loads up your models and creates the table structure (that's what sync.js does)
//   - It seeds your database 
//   - It then starts up the server so you're ready to go.
// IMPORTANT: Once you have real user data in the database, don't run    npm run deploy     unless you are ok with losing that user-generated data.
// You can go ahead and start using this process right away no matter how you have things set up -- none of your existing code gets deleted/changed in any way.
// You'll no longer need to do any un-seeding. This happens by default when you delete the database and rebuild it.
// Once you're completely happy with your models, you can just run   npm run start   instead of   npm run deploy 
// Make sure you indicate in your readme.md file that the deploy script should be run when first launching the project.
// Thanks to Kouros for helping w/ the testing!

// # Unit 17 Sequelize Homework: Workout Tracker

// For this assignment, you'll create a workout tracker that tracks daily workout activities. You have already been provided with `MOST` of the client-side functionality, with the front end code in the `/Develop/public` folder. This assignment will require you to create MySQL database with a Sequelize schema and handle routes with Express.

// #### The app will consist of these three core elements:

// - Workouts, each of which has a name and date associated with it; as well as an unlimited amount of Activities.

// - Activities: these are the parts of each workout. Each activity consists of an Exercise (Barbell Curl, Lateral Curl, Bench Press, Treadmill, Stairmaster, etc.) and then info about Duration, Weight, Sets, Reps, and Distance.

// ```
// Example: Bob's workout for Feb 20 consisted of these Activities:

// Barbell Curl, Weight: 50 Sets: 5 Reps: 5
// Stairmaster: Duration: 30 minutes Distance: 50 flights
// ```

// The list of Exercises can be entered directly into your database using Sequelize.

// `MOST` of the client side functionality will be provided. Focus on the back-end.

// `You will NOT` be reloading the index.html page in order to update state. You'll be dynamically updating the DOM, but most of this will be done for you.

// `You'll be using Express Router` this time, and you'll map your routes to controllers, which will then reference Sequelize models. You'll be provided with one example of this.


// #### Requirements:
// - Node
// - MySQL - Database
// - Sequelize - ORM
// - Express & Express Router
// - jQuery and Bootstrap


// ## User Story

// - As a user, I want to be able to view create and track daily workouts. I want to be able to log multiple exercises in a workout on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled.

// ## Business Context

// A consumer will reach their fitness goals quicker when they track their workout progress.


// ## Acceptance Criteria

// When the user loads the page, they should be given the option to create a new workout, or continue with their last workout.

// The user should be able to:

// - Add exercises to a previous workout plan.

// - Add new exercises to a new workout plan.

// - View multiple the combined weight of multiple exercises on the `stats` page.

// ## Commit Early and Often

// One of the most important skills to master as a web developer is version control. Building the habit of committing via Git is important for two reasons:

// 1. Your commit history is a signal to employers that you are actively working on projects and learning new skills

// 2. Your commit history allows you to revert your code base in the event that you need to return to a previous state

// Follow these guidelines for committing:

// - Make single purpose commits for related changes to ensure a clean, manageable history. If you are fixing two issues, make two commits

// - Write descriptive, meaningful commit messages so that you and anyone else looking at your repository can easily understand its history

// - Don't commit half done work, for the sake of your collaborators (and your future self!)

// - Test your application before you commit to ensure functionality at every step in the development process

// We would like you to have well over 200 commits by graduation, so commit early and often!

// ## Submission on BCS

// You are required to submit the following:

// - The URL to the deployed application

// - The URL to the Github repository


// ## Bonus (*Optional Section)

// #### Bonus Points:
// Develop a seeder file that seeds the exercises instead of you putting them in manually.

// #### More Bonus Points:
// Your seeder file can also seed a few initial workouts.
