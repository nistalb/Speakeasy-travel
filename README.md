# Speakeasy Travel Blog

# Concept
A simple travel blog where friends, family, and others can share experiences in a user friendly interface that isn't lost in the corporate world.

# User story:

A user navigates to the blog HOME page.  If the user has a login they input their unique username and password, after which they are taken to their SHOW page.  If the user is new they are prompted to enter a username, email, and password.  Usernames and emails must be unique.  After creating their username and password the user is taken to the NEW user page.  On the NEW user page the user enters their: name, a short bio blurb, address, and photo.  After creating their user information the user is taken to their user SHOW page where they can can delete user, navigate to the EDIT user form, or navigate to the trips INDEX page. 

On the trips INDEX page the user will see their trips.  They will also see navigation buttons that will allow them to view, or add trips.  There will be navigation buttons to go to the user SHOW page.

If there are no trips on the INDEX page then the user will see text that says no trips are available to view, please create a trip.  If the user clicks on the new trip button then they will be taken to the NEW trip page.

The NEW trip page is a form that will collect the following information: trip start date, trip end date, any media files the use wants to upload, notes on the media being uploaded, activities engaged in on the trip, notes, location, and budget.  A submit button on the NEW page will enter the data into the database and take the user back to the INDEX page.

When a user selects a trip from the INDEX page they will be taken to the trip SHOW page.  On the SHOW page the user will see the details of the trip.  The user will also see buttons that will allow them to edit or delete the trip.

If the user clicks the edit button, they will be taken to the EDIT page.  The edit page is a prepopulated form of the trip data that the user can modify.  When the user is done and clicks the submit button the data is updated in the database and the user is taken back to the trip SHOW page.  

If the user clicks the delete button, the trip will be deleted from the database and the user will be taken back to the INDEX page.

If the user is on the user SHOW page and clicks on the delete button, the user and all trip data is deleted from the database. 

# Milestones
- By EOB Friday Dec 18: Server, model, and controllers for Traveler, User, and Trips created and tested
- By EOB Monday Dec 21: Model and controllers for pictures created and tested
- By EOB Tuesdsay Dec 22: Relationships between models created and tested
- By Noon Wednesday Dec 23: Templates formatted to match wireframes and look pretty

# MVP Pitch
This will be a travel blog that allows users to log in using unique credentials.  Once in the website the users can create, read, updated, and delete trips they have taken.  The mongo database will use four models, Traveler, Trip, User, and Picture.  The Traveler and Trip will be referenced in each other.  User will be referenced in Traveler.  Picture will be embedded in Trip.     

# Entity Relationship Diagram
![ERD](erd.svg)

# Icebox
- Share blogs with other couples and merge trips or be able to link to another persons blog and or send a link request.
- family friendly
- rate by walking, bus, bike, car
- implementation of mapbox API
- background image changes with each page load
- map with pin showing location



