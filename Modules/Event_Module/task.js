// ? What does this code demonstrate?
/*
 * This code demonstrates the usage of Node.js EventEmitter to handle custom events such as login, logout,
 * user purchase, and profile updates. It also tracks the occurrences of these events.
 * STOP! And Try it Yourself First!!
 */

// ? How to create an EventEmitter?
const EventEmitter = require("events"); // @ Import the EventEmitter class from the `events` module.
const emitter = new EventEmitter(); // @ Create an instance of the EventEmitter class.

// ? User objects
/*
 * These objects represent users with properties such as id, name, age, login status, and purchased courses.
 */
const user1 = {
    id: 1,
    name: "Abubakar",
    age: 17,
    isLoggedIn: false,
    courses: []
};
const user2 = {
    id: 2,
    name: "user2",
    age: 18,
    isLoggedIn: false,
    courses: []
};

// ? Event tracker object
/*
 * This object tracks the number of times specific events (login, logout, purchase, update) are triggered.
 */
let eventTrackerObj = {
    loginEvent: 0,
    logoutEvent: 0,
    purchaseEvent: 0,
    updateProfileEvent: 0
};

// ? Login Event
/*
 * This event logs the user in and updates the user's `isLoggedIn` status.
 */
emitter.on("login-user", (user) => {
    eventTrackerObj.loginEvent++; // @ Increment login count
    if (user && typeof user === "object") {
        console.log(`User ${user.name} Logged IN`); // @ Log user login
        user.isLoggedIn = true; // @ Update user login status
    }
});

// @ Emit login events for both users
emitter.emit("login-user", user1);
emitter.emit("login-user", user2);

// ? Logout Event
/*
 * This event logs the user out by updating their `isLoggedIn` status to false.
 */
emitter.on("logout-event", (user) => {
    eventTrackerObj.logoutEvent++; // @ Increment logout count
    if (user && typeof user === "object" && user.id) {
        user.isLoggedIn = false; // @ Update user logout status
        console.log("User Logged out successfully"); // @ Log logout action
    }
});

// @ Emit logout event for user1
emitter.emit("logout-event", user1);

// ? Purchase Event
/*
 * This event handles the purchase of courses. It checks if the user is logged in before allowing a purchase.
 */
emitter.on("user-purchase", (args) => {
    eventTrackerObj.purchaseEvent++; // @ Increment purchase count
    const { user, course } = args;
    if (user && typeof user === "object" && course && typeof course === "object") {
        if (user.isLoggedIn) {
            user.courses.push(course); // @ Add course to user's purchased courses
            console.log(`${course.name} Purchased Successfully`); // @ Log purchase success
        } else {
            console.log("Login Session Expired. Unauthorized"); // @ Log unauthorized attempt
        }
    }
});

// @ Emit purchase events for both users
emitter.emit("user-purchase", {
    user: user1,
    course: { name: "HTML", price: 1000 }
});
emitter.emit("user-purchase", {
    user: user2,
    course: { name: "CSS", price: 2000 }
});

// ? Update Profile Event
/*
 * This event updates the user's profile (name and age) if the user is logged in.
 */
emitter.on("update-profile", (args) => {
    const { user, updatedName, updatedAge } = args;
    eventTrackerObj.updateProfileEvent++; // @ Increment profile update count
    if (user && typeof user === "object") {
        if (user.isLoggedIn) {
            if (!updatedName || !updatedAge) {
                console.log("Please Fill in all fields"); // @ Log missing data message
                return;
            }
            user.name = updatedName; // @ Update user's name
            user.age = updatedAge; // @ Update user's age
        } else {
            console.log("Login Session Expired. Unauthorized"); // @ Log unauthorized attempt
        }
    }
});

// @ Emit profile update events for both users
emitter.emit("update-profile", { user: user1, updatedName: "Abubakar Aijaz", updatedAge: 17 });
emitter.emit("update-profile", { user: user2, updatedName: "Updated Name", updatedAge: 20 });

// ? Logging final results
/*
 * Logs the final state of user2 and the event tracker object.
 */
console.log(user2); // @ Log updated user2 object
console.log(eventTrackerObj); // @ Log event tracker summary
