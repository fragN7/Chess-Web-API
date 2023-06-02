# Chess Web Rest-API

Chess Web Rest-API is a work-in-progress RESTful API built with .NET and C#. It provides a backend solution for a chess application with various features, including CRUD operations, filters, and an AI model. The API is designed to be used in conjunction with a React frontend to create a user-friendly chess experience. The application is deployed on AWS Amazon and Netlify.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Tradeoffs](#tradeoffs)
- [Additional Information](#additional-information)
- [API Endpoint Documentation](#api-endpoint-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started <a name="getting-started"></a>

These instructions will guide you on how to get the project up and running on your local machine.

### Prerequisites <a name="prerequisites"></a>

Before running the Chess Web Rest-API, ensure that you have the following prerequisites installed:

- .NET SDK (compatible with your project)
- Node.js and npm

### Installation <a name="installation"></a>

1. Clone the repository to your local machine:

git clone `https://github.com/fragN7/Chess-Web-API.git`

2. Backend Setup:

- Open the command prompt or terminal and navigate to the root folder of the backend API.
- Run the following commands:

  ```
  dotnet restore
  dotnet build
  dotnet run
  ```

- This will automatically open a Swagger web page that shows all the current endpoints created.

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

## Tech Stack <a name="tech-stack"></a>

The Chess Web Rest-API is built using the following technologies:

- Backend: .NET (ASP.NET Core)
- Frontend: React

## Tradeoffs <a name="tradeoffs"></a>

In the development of this Chess Web Rest-API, the following tradeoffs were considered:

- Using .NET as the backend technology may have a steeper learning curve but offers robustness and scalability.
- React as the frontend framework may result in a larger bundle size but provides flexibility and efficient rendering.

## Additional Information <a name="additional-information"></a>

Please keep in mind the following additional information:

- Update configuration files based on your local development environment.
- Set up and configure the required database.
- Document any additional steps specific to your project.

## API Endpoint Documentation <a name="api-endpoint-documentation"></a>

Please refer to the [API Endpoint Documentation](https://app.swaggerhub.com/apis-docs/IAGUTAALEN/ChessApi/1.0.0) for detailed information about all the endpoints and their functionality.

## Deployment <a name="deployment"></a>

The Chess Web Rest-API is currently deployed on AWS Amazon and Netlify. To deploy the application to your preferred hosting platform, follow these steps:

1. Backend Deployment:

- Build the backend project using the following command:

  ```
  dotnet publish -c Release
  ```

- Deploy the generated build artifacts to your hosting platform of choice.

2. Frontend Deployment:

- Build the React frontend using the following command:

  ```
  npm run build
  ```

- Deploy the generated build artifacts to your hosting platform of choice.

## Contributing <a name="contributing"></a>

Contributions are welcome! If you find any issues or want to enhance the Chess Web Rest-API, feel free to open a pull request. Please make sure to follow the [contributing guidelines](CONTRIBUTING.md).

## License <a name="license"></a>

This project is licensed under the [Unilicense](LICENSE).
