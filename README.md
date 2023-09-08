# Forum Events

## [See the App!](https://forumevents.netlify.app/)

![App Logo](your-image-logo-path-or-name)

## Description

App designed to manage a space for events, fairs, congresses, etc.

**NOTE -** 
#### [Client Repo here](https://github.com/Mercedes-amor/forumEvents-Client)
#### [Server Repo here](https://github.com/Mercedes-amor/forumEvents)

## Backlog Functionalities

- Contact Form.
- 404 not found.
- Search events by month.
- Event history.
- Rate events.
- Comments section.
- Implement admin can see useres in events

## Technologies used

- JavaScript
- HTML
- CSS
- MongoDB
- Mongoose
- Cloudinary
- Bcryptjs
- Express
- Postman
- Cors
- Node
- Stripe
- React
- Axios
- Boostrap


## User Stories



- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available
- **event details** - As a user I want to see all the details of an event including the sessions i can join an event and join a session or book one
- **Book a session** - As a user I want to book free sessions
-**User profile** - As a user I want to see in my profile all the events I'm signed up for

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | public                   | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                   |                          | Login form, link to signup, navigate to homepage after login  |
| `/userProfile`            | Profile         | UserProfile       | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/events/:query`          | Events List     |       EventsList  |   public                 | Shows all events filtered                                  |
| `/events/create-event`    | Create event    |     CreateEven    | admin only `<IsPrivate>`  | create a new event                                   |
| `/events/:eventId/details`| Event details    | EventDetails     | user only `<IsPrivate>`  | shows all details of an event                                   |
| `/events/:eventId/edit`| Edit event    | EditEvent              | admin only `<IsPrivate>`  | Edit an event                                 |
| `/events/:eventId/:sessionId/:activeUserId`| Book a session   | BookSession             | user only `<IsPrivate>`  | Book a session                                |
| `/payment-success`| payment success   | PaymentSuccess             | user only `<IsPrivate>`  | Payd succed                                |

## Other Components

- Navbar
- Footer
- CheckoutForm
- CrateSession
- EditEvent
- EditSession
- EventsShowedInHome
- FilteredEventsFooterSearch
- IsPrivate
- PaymentIntent
- PaymentSuccess



## Services

- payment.services
- service.config
- upload.services

  
## Context

- auth.context

  
## Links

### Collaborators

[Developer 1 name](https://github.com/Mercedes-amor)

[Developer 2 name](https://github.com/LucasNavarroR/)

### Project

[Repository Link Client](https://github.com/Mercedes-amor/forumEvents-Client)

[Repository Link Server](https://github.com/Mercedes-amor/forumEvents)

[Deploy Link](https://forumevents.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/b/wAWJPZuG/forumevents)

### Slides

[Slides Link](www.your-slides-url-here.com)