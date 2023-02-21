<h1>MyMovieApp</h1>
<p>In this repository I built the client-side for my app based on its <a href="https://github.com/SpenUtt/movie_api">existing server-side code</a>.</p>
<p>The API and the database that I built earlier meet the information needs of the Movie App users. In this repository I created the interface they’ll use when making requests to—and receiving responses from—the server-side. The client-side of my app includes several interface views (built using the React library) that
handle data through the (previously defined) REST API endpoints.</p>
<p>The front-end and the back-end together form a complete web app built using full-stack JavaScript technologies known as MERN (MongoDB, Express, React, and Node.js).</p>
<p>The Movie App was deployed on Netlify</p>
<a href="https://3-7--api-mymovieapp.netlify.app/">OPEN THE APP ON NETLIFY</a>

<h2>Blueprint and Techstack</h2>
<ul>
  <li>Single-page application (SPA)</li>
  <li>State routing to navigate between views and share URLs</li>
  <li>Parcel as its build tool</li>
  <li>React library and in ES2015+</li>
  <li>Bootstrap as a UI library for styling and responsiveness</li>
  <li>React Redux for state management</li>
</ul>
  
<h2>The 5 Ws</h2>
<ol>
  <li> Who: The users of MyMovieApp: movie enthusiasts who enjoy reading information about
different movies.</li>
  <li> What: A single-page, responsive app with routing, rich interactions, several interface views,
and a polished user experience.</li>
  <li> When: the users will be able to use it whenever they want to read and save information
about different movies.</li>
  <li> Where: The app will be hosted online. The app itself is responsive and can therefore be
used anywhere and on any device, giving all users the same experience.</li>
  <li> Why: Movie enthusiasts like to be able to access information about different movies,
whenever they want to. Having the ability to save a list of their favorite movies will ensure
users always have access to the films they want to watch or recommend to their peers.</li>
</ol>
<h2>Essential Views & Features:</h2>
<h3>Main view</h3>
  <ul>
    <li>Returns ALL movies to the user (each movie item with an image, title, and description)</li>
    <li>Filtering the list of movies with a “search” feature</li>
    <li>Ability to select a movie for more details</li>
    <li>Ability to log out</li>
    <li>Ability to navigate to Profile view</li>
  </ul>
  <h3>Single Movie view</h3>
  <ul>
    <li>Returns data (description, genre, director, image) about a single movie to the user</li>
    <li>Allows users to add or remove a movie to their list of favorites</li>
    <li>Returns data about similar movies
  </ul>
<h3>Login view</h3>
  <ul>
    <li>Allows users to log in with a username and password</li>
  </ul>
  <h3>Signup view</h3>
  <ul>
    <li>Allows new users to register (username, password, email, date of birth)</li>
  </ul>
<h3>Profile view</h3>
  <ul>
    <li>Displays user registration details</li>
    <li>Allows users to update their info (username, password, email, date of birth)</li>
    <li>Displays favorite movies</li>
    <li>Allows users to remove a movie from their list of favorites</li>
    <li>Allows existing users to deregister</li>
</ul>
<h2>Dependencies</h2>
<p>See <a href="https://github.com/SpenUtt/MyMovieApp-client/blob/main/package.json">package.json</a></p>