# MovieFix App

## How to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/deepak539/MovieFix.git

2. Install the neccessary packages using npm install
3. Start the Serve using npm start


## What is MovieFix?

MovieFix is a web application developed as an assessment project for a Frontend Developer interview process.

MovieFix lists movies by their release years and dynamically loads more movies on scroll without causing jitter. It provides options to filter movies by genres and includes a search functionality for finding desired movies directly.

## Stack Used

- **React.js**: Component-based approach and virtual DOM for improved performance.
- **TypeScript**: To catch errors during coding.
- **Context API and useContext**: For state management.
- **Tailwind CSS**: For styling components.
- **React Query**: For fetching data from an API.

## Basic Requirements Implemented

- Lists movies for the default year.
- Loads more movies on scroll without jitter.
- Filters movies by genre.
- Search functionality.

## Known Bugs

- Slight jittering when scrolling to the top sometimes.
- Connection between genres and fetching more movies on scroll may disrupt the flow.

## Areas for Improvement

1. Address known bugs.
2. Utilize component libraries like Theme UI or Shadcn for faster development and improved UI.
3. Enhance the display of movie credits and short descriptions.
4. Display movie ratings on cards using stars.
5. Consider using Redux for state management, although Context API suffices for managing few states with less boilerplate.

