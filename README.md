# Adobe GenStudio Engineering Test

# Roman Numeral Converter
This project is a full-stack application that converts integers (1–3999) to Roman numerals. It consists of a React frontend, a Node.js/Express backend, and end-to-end (E2E) tests using Cypress, all containerized with Docker.

## Technology Choices and Reasoning

### Frontend: React with React Spectrum
- **React**: Chosen for its component-based architecture, which simplifies building reusable UI elements. React’s ecosystem and community support make it ideal for rapid development and maintenance.
- **React Spectrum (@adobe/react-spectrum)**: Adobe’s React Spectrum library was used for UI components (e.g., `NumberField`, `Button`, `Flex`) because it provides accessible, responsive, and visually consistent components out of the box. Spectrum’s built-in accessibility features (e.g., ARIA support, keyboard navigation) reduced the effort needed to meet accessibility requirements.

### Backend: Node.js with Express
- **Node.js**: Selected for its asynchronous, non-blocking I/O model, which is efficient for handling HTTP requests. Its JavaScript runtime aligns with the frontend, allowing developers to work in a single language across the stack.
- **Express**: A minimal and flexible web framework for Node.js, chosen for its simplicity in setting up RESTful APIs. Express’s middleware support and robust routing made it easy to implement the `/romannumeral` endpoint.
- **Winston**: Used for logging application events and errors. Winston’s structured logging (JSON format) and support for multiple transports (file and console) make it suitable for debugging and monitoring in development and production.
- **Prometheus Client (prom-client)**: Integrated for monitoring HTTP request metrics. Prometheus’s client library allows us to collect and expose metrics (e.g., total requests) via the `/metrics` endpoint, enabling integration with monitoring systems.

### Testing: Cypress for E2E Tests
- **Cypress**: Chosen for E2E testing because it provides a powerful, all-in-one testing framework with a built-in test runner, assertions, and network stubbing capabilities. Cypress’s ability to run in a real browser (or headless in CI) ensures accurate testing of the user experience.
- **cypress-axe**: Used to automate accessibility testing, ensuring the app meets WCAG standards with minimal manual effort.

### Containerization: Docker and Docker Compose
- **Docker**: Used to containerize the frontend, backend, and Cypress tests, ensuring consistent environments across development, testing, and deployment. Docker eliminates "works on my machine" issues by encapsulating dependencies.
- **Docker Compose**: Chosen to orchestrate the multi-container setup (frontend, backend, Cypress), simplifying the process of building and running the entire application stack with a single command.

### Dependencies
- **Frontend Dependencies**:
  - `@adobe/react-spectrum`: For accessible UI components.
  - `react`, `react-dom`: Core libraries for building the React app.
  - `@types/react`, `@types/react-dom`: TypeScript type definitions for React.
- **Backend Dependencies**:
  - `express`: For creating the REST API.
  - `jest`, `supertest`: For unit testing the backend API.
- **Testing Dependencies**:
  - `cypress`: For E2E testing.
  - `cypress-axe`: For accessibility testing.
  - `@types/node`: TypeScript type definitions for Node.js, used in `cypress.config.ts`.
- **Development Tools**:
  - **TypeScript**: Used in the frontend and Cypress configuration for type safety and better maintainability.
  - **ESLint**, **Prettier**: For linting and formatting code to maintain consistency.


## How to Build and Run the Project

### Prerequisites
- **Docker**: Install Docker and Docker Compose on your machine.
- **Git**: To clone the repository.
- **Node.js** (optional): Only needed if you want to run the app outside Docker.

### Steps to Build and Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/gaurikolhe/roman-numeral-converter.git
   cd roman-numeral-converter
2. **Build the Docker Containers**:
    docker-compose up --build -d
    **This builds and starts the backend (port 8080), frontend (port 3000), and cypress services.**
    **The -d flag runs the containers in detached mode.**
3. **Access the Application**:
    Open your browser and navigate to http://localhost:3000.
    Enter a number between 1 and 3999, then click "Convert to Roman Numeral" to see the result.
4. **Run The Tests**:
    **Backend Unit Tests**:docker-compose exec backend npm test
    **Frontend Unit Tests**:docker-compose exec frontend npm test
    **E2E Tests (Cypress)**:
    1. cd frontend
    2. npm install
    3. cd ..
    4. docker-compose run cypress
5. **Stop the Container**:
    docker-compose down

<!-- Running Without Docker (Optional) 

Backend (Runs on http://localhost:8080) :
1. cd backend
2. npm install
3. npm start
4. npm test

Frontend (Runs on http://localhost:3000):
1. cd frontend
2. npm install
3. npm start
4. npm test

Cypress Tests:
1. cd frontend
2. npm install
3. npx cypress run
-->

<!-- 
Problem-Solving Approach and Solution

The goal was to build a full-stack application that converts integers (1–3999) to Roman numerals, with a user-friendly frontend, a REST API backend, and E2E tests, all running in Docker. The app needed to handle invalid inputs gracefully and be accessible.

Approach
1. Frontend:
    Used React with React Spectrum to build a simple UI with a number input and a convert button.
    Made API calls to the backend using fetch, handling both successful responses and errors.
    Added client-side validation to display an error if no number is entered.
    
2.Backend:
    Built a single /romannumeral endpoint with Express that accepts a query parameter.
    Implemented Roman numeral conversion logic using a lookup table approach for efficiency.
    Added input validation to return appropriate error messages and status codes (400 for invalid inputs, 200 for success).

3.Logging and Monitoring:
    Logs are written to backend/app.log and the console using Winston.
    Prometheus metrics are available at http://localhost:8080/metrics (e.g., http_requests_total counter).

4.Testing:
    Wrote Cypress E2E tests to cover successful conversions, error cases (invalid inputs, network errors), and accessibility.
    Stubbed API responses in Cypress to avoid network issues in the Docker environment (e.g., localhost resolution issues).
    Used cypress-axe to automate accessibility testing.

5.Docker Setup:
    Created a docker-compose.yml file to orchestrate the frontend, backend, and Cypress services.
    Used environment variables (e.g., CYPRESS_baseUrl) to ensure Cypress accesses the frontend correctly in the Docker network.

Challenges and Solutions

Docker Networking: The frontend’s API calls to http://localhost:8080 failed in the Cypress container because localhost didn’t resolve to the backend. Solution: Stubbed API responses in Cypress tests to avoid real network requests. -->
