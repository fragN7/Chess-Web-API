# Chess Web Rest-API

This is a work-in-progress chess REST API that uses the .NET framework with C#. The API includes entities that are in relation to each other and has CRUD operations, various filters and AI model. The front-end is built with React Node.js to create a user-friendly experience. W/ login/register, chat page and deployed on aws amazon and netlify.

## Getting Started

These instructions will guide you on how to get the project up and running on your local machine.

### Prerequisites

- .NET SDK (compatible with your project)
- Node.js and npm

### Installing

1. Clone the repository to your local machine:
- git clone https://github.com/fragN7/Chess-Web-API.git

2. Backend Setup:
- Open the command prompt or terminal and navigate to the root folder of the backend API.
- Run the following commands:
  ```
  dotnet restore
  dotnet build
  dotnet run
  ```
- This will automatically open a swagger web page which will show all the current endpoints created.

3. Frontend Setup:
- Open a new command prompt or terminal window and navigate to the root folder of the React frontend.
- Run the following commands:
  ```
  npm install
  npm start
  ```

4. Accessing the Application:
- Open your preferred browser and enter the URL: `http://localhost:3000`.
- You should now see the React application running and interacting with the backend API.

## Tech Stack

- Backend: .NET (ASP.NET Core)
- Frontend: React

## Tradeoffs

- Using .NET as the backend technology may have a steeper learning curve but offers robustness and scalability and it's fun.
- React as the frontend framework may have a larger bundle size but provides flexibility and efficient rendering.

## Additional Information

- Update configuration files based on your local development environment.
- Set up and configure the required database.
- Document any additional steps specific to your project.

## API Endpoint Documentation
- Please use this link in order to see all endpoints and how they function
- `https://app.swaggerhub.com/apis-docs/IAGUTAALEN/ChessApi/1.0.0`

## License

This project is licensed under the [Unilicense](LICENSE).
