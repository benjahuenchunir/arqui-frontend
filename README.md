# Frontend

This is the frontend project for Arqui, built with React, Vite, and TypeScript. It includes ESLint for linting and Lighthouse for performance reviews.

## Accessing the Frontend

You can access the deployed frontend using the following links:

- **Domain Link** (can take a while to refresh after deploying): [https://web.numby.me/](https://web.numby.me/)
- **HTTPS Link**: [https://d1ze0sqxy99jih.cloudfront.net](https://d1ze0sqxy99jih.cloudfront.net)
- **HTTP Link**: [http://frontend-cloud-storage.s3-website-us-east-1.amazonaws.com/](http://frontend-cloud-storage.s3-website-us-east-1.amazonaws.com/)


## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [CI Pipeline](#ci-pipeline)

## Installation

To get started, clone the repository and install the dependencies:

```sh
git clone https://github.com/benjahuenchunir/arqui-frontend.git
cd arqui-frontend
yarn install
```

## Scripts

- `yarn install`: Install the project dependencies.
- `yarn dev`: Start the development server.
- `yarn build`: Build the project for production in `dist` directory.
- `yarn lint`: Run ESLint to lint the project.
- `yarn preview`: Preview the production build.

## Dependencies

### Production Dependencies

`react`: ^18.3.1
`react-dom`: ^18.3.1
`react-router-dom`: ^6.26.2
`sass`: ^1.78.0

### Development Dependencies

`@eslint/js`: ^9.9.0
`@types/react`: ^18.3.3
`@types/react-dom`: ^18.3.0
`@vitejs/plugin-react`: ^4.3.1
`eslint`: ^9.11.1
`eslint-plugin-react`: ^7.37.0
`eslint-plugin-react-hooks`: ^5.1.0-rc.0
`eslint-plugin-react-refresh`: ^0.4.9
`globals`: ^15.9.0
`typescript`: ^5.5.3
`typescript-eslint`: ^8.0.1
`vite`: ^5.4.1

## CI Pipeline
The CI pipeline is set up using GitHub Actions. It includes steps for linting and performance reviews using Lighthouse.

### GitHub Actions Workflow
Here is the GitHub Actions workflow (.github/workflows/deploy.yaml):

### Setting Up Secrets
To set up the necessary secrets for AWS credentials and CloudFront distribution ID:

1. Go to your GitHub repository.
2. Click on Settings.
3. Click on Secrets in the left sidebar.
4. Click on New repository secret.
5. Add the following secrets: 
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `CLOUDFRONT_DISTRIBUTION_ID`

This setup ensures that your CI pipeline includes linting and performance reviews using Lighthouse, and deploys the project to S3 with cache invalidation.

- [Frontend](http://frontend-cloud-storage.s3-website-us-east-1.amazonaws.com/)
