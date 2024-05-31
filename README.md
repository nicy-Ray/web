

### Report of my website and interactive chat application
**Overview**
This web project contains a simple website along with a chat application. The website includes some information about the developer(me) and a quiz which users can interact with.

**Overall design of the website and the chat application**
In order to complete the project, the following technologies were mainly applied, HTML, CSS, JavaScript and Node.js.

The project is roughly divided into two parts. The first part is the introduction part, where information of the developer lies. There are two static pages in the first part, the introduction page contains a brief introduction of the developer’s interests and the detail page gives more information about those interests mentioned in the introduction page. The introduction page is also the root page which means it is the first page users see when accessing the website. The second part is an interactive quiz application, where users can answer some questions and get feedback.

To help users switch easily between different pages, a fixed navigation bar is implemented at the top of each page. Users can move to another page smoothly whenever they want. Color matching is considered to ensure a unified style of the entire project.

The introduction page is structured into four parts, the navigation bar, the overview, the interests table and the footer. The interest table is designed as a table with one row and three columns to place three topics of interests. The detail page comprises three main elements, the navigation bar, the detail information of interests and the footer. Inside the second there are three sections corresponding to three interest topics shown in the introduction page. The first section contains some explanation of three aspects of artificial intelligence and a flip book to give visual impression. The next section contains covers about three albums and the users can get more information by hovering on the cover. The final section highlights captivating animations, allowing users to explore images via a user-friendly scroll bar.

In the interactive chat application, a user would be asked to give a name to start a quiz. Then a quiz of ten questions started each with a thirty second timer. If no option is selected within the specific time, in this case, thirty seconds, the question is automatically considered receiving a wrong answer by the application. In this case, the application can deal with the situation where the user spend too much time on one question. After ten questions all finished, the user will get to see the score of this time and a leaderboard arranged in descending order will be shown on the screen to informed the user of the ranking. User names, scores and rankings are stored in the server for data safety and better maintenance.

**Challenges faced**
**1.Layout style**
The first challenge is this project is about how to change the position of original elements in html.

This challenge was met when styling the navigation bar and some <div> elements supposed to be laid out horizontally. The elements in the navigation bar is made horizontal by floating list items (<li>elements) in CSS. Other elements that needs to appear horizontally is set by using flex container or table(put element in the same row so that they seem horizontally).

**2.Picture size problem**
When implementing the scroll bar of animation images, the picture size and position were adjusted for many times. However, due to the original picture size, either one image was unable to display or the other two images were unable to display. At last, electing smaller pictures solved the issue.

**3.Design the interactive chat application**
At the beginning of the design phase, the interactive process was unclear in the developer’s mind and led to no logic programming. The developer drew a picture to clarify the interactive process and rewrite the code.

**4.Timer clear**
Initially, each question triggered a new timer without terminating the previous one and it leaded to issues that sometimes the timer can not work as expected. To tackle this problem clear timer every time a question is shown and start a new one.

**Interaction(communication) between client side and the server**
Insufficient understanding of HTTP requsts and fetch API. Utilize online resources for self-learning.

The effective interaction between client side and the server ensure the application performance as expected. 

At first, the start screen with a box to enter name and a ‘start’ button is shown. When the ‘start’ button is clicked, ‘startQuiz’ fuction is called. Firstly, it checks for a valid name input, only if a name is entered the quiz will start, otherwise a notification will be shown to prompt the client to enter a name.

When the quiz starts, prompts in the start screen are hidden and ‘showQuestion’ function is called. This function would display the questions one by one and use index to check if the quiz is done or not. A thirty seconds timer is also set here.When time runs out or an answer is selected, ‘checkAnswer ‘ function is called to compare the option value and the correct answer value and return a feedback to inform the client whether the chosen answer is right. At the same time, ‘next question’ button is shown and when it is clicked the question index increase by one. When the index is equal to the length of the question array, ‘endQuiz’ function is called to hide questions and show result screen.

When the quiz is finished the user name and score are send to the server via ‘/submit-quiz’ route using post request and the server receives the data and maintain a sorted leaderboard in itself. Function ‘getLeaderboard’ get the sorted leaderboard data via ‘/leaderboard’ route using get request and put them in a list to display. The server get and post data in JSON format.

**References**
[HTTP Request Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)
[Fetch API](https://www.w3schools.com/jsref/api_fetch.asp)

