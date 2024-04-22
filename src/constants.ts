export const APP_TITLE = 'MOVIEFIX';
export const MOVIES_API = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784
d157207b4d&sort_by=popularity.desc&primary_release_year`;
export const ALL_GENRE_ID = 0;
export const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJjZmJjZDQ3ZTVkYTYwM2RjNGFhMDdmYjVlYmMzZiIsInN1YiI6IjY2MjI5YTcxZTRjOWViMDE2M2Y2MGQxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q5RPr5J4EUo9rsi6idqQMsfb6QKmDEoE4Fo6fs--tsE";
export const GENRES_API = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const MovieFixConstants = {
    APP_TITLE,
    MOVIES_API,
    ALL_GENRE_ID,
    API_KEY,
    GENRES_API
}

export default MovieFixConstants;
