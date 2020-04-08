# api-denzel
api for app-denzel

In this #api-restful and #serverless, I created a model for imdb films.
I deployed this API with netlify on the folowing link : 
https://nifty-noyce-ad1b9f.netlify.com/.netlify/functions/app



we use #cheerio to grab information from all Denzel Washington movies. 
We use as #mongoDb database with #Atlas and #mangoose driver.
To reset our database, we can call the endpoint / movies / refreshDB which will grab the information from the imdb site and reset our movies collection.

the endpoints API :

//get back all the movies
get('movies/')

// fetch a film by id
get('movies/fetch/:id)

// method to reset the collection movies and load a new one from imbd
get('movies/refreshDB')

//get a must-watch movie
get('movies/must-watch)

// search a movie with filters {date, meta, rate}
router.post('/search')

// post a review for a film with id in body
post('/review')

to run the API 

You have to install all dependencies with
npm i 
and after run with 
npm start

