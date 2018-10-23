The admin panel was made using the  Bootstrap 3 Admin Template from github : puikinsh/gentelella

The Admin Panel consists of many pages with datatables  for various tables in the database:
	Eg. Partydatatables.ejs
These files are stored under pages  subfolder of views folder.

The part of code that was same  for  all the above pages were included separately while rendering. That code is present in the partials subfolder of Views folder.

BASIC STRUCTURE OF EACH PAGE

•	Each page consists of mainly a table.
•	The table is designed using JQuery Datatable and required validations are performed in the corresponding javascript file
•	The page is rendered using node js and ejs view engine written in app.js(Front-end)

FETCHING DATA

1.	An ajax call is made from the javascript file to an api written in the app.js(Front-end) to request data from the database.
2.	This api then calls another api written in app.js (Backend) which actually queries the database and fetches data and returns it to the front-end app.js which further returns it to  the javascript file and data is displayed to the user.

•	Each table has the following features:
o	Data is dynamically added.
o	All fields can be sorted
o	Search option is available
o	Pagination 
o	Data can be printed, copied or exported in formats like csv.

•	Each record can be edited through a button present in the last column of each row. 
On clicking the “Edit” button, a modal window appears where all data of the selected row is displayed. Data that can be edited is displayed editable mode.
User has to click on the “Save Changes” button to update the records in the database as well as the table.

UPDATING DATA

When the Save Changes button is clicked,
1.	An ajax call is made from the javascript file to an api written in the app.js(Front-end) to update the new data in the database.
2.	This api then calls another api written in app.js (Backend) which actually queries the database and updates the required data and returns the update confirmation to the front-end app.js which further returns it to the JavaScript file.
3.	The new data that was sent to the api is then updated in the datatable.
The changes will be shown in the datatable only if the update was successful.Changes are visible even without refreshing the page and the current page is also retained.

Work Flow:

1.	Create the front-end server with Express.js  : frontserver.js 
2.	Create the back-end server with Express.js  : backserver.js 
3.	Create a front-end node js file which contains the front-end api  : app.js
4.	Set up the template engine  as ejs in app.js
5.	Create a back-end node js file which contains the back-end api  : app.js
