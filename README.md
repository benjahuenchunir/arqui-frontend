# Frontend

This is the frontend project for Arqui, built with React, Vite, and TypeScript. It includes ESLint for linting and Lighthouse for performance reviews.

## Accessing the Frontend

- **Domain Link**: [https://web.numby.me/](https://web.numby.me/)

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [CI Pipeline](#ci-pipeline)
- [Local Development](#local-development)

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

`@auth0/auth0-react`: ^2.2.4
`@emotion/react`: ^11.13.3
`@emotion/styled`: ^11.13.0
`@mui/material`: ^6.1.1
`@popperjs/core`: ^2.11.8
`axios`: ^1.7.7
`bootstrap`: ^5.3.3
`esbuild`: ^0.24.0
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

Its separated in two jobs, both use the enviroment production and secrets

On pull requests to `main` run Build and Lint Job
1. Checkout Code: Uses the actions/checkout@v3 action to check out the repository code.
2. Set Up Node.js: Uses the actions/setup-node@v3 action to set up Node.js version 18.18.0.
3. Install Dependencies: Runs yarn install to install project dependencies.
4. Run ESLint: Runs yarn lint to lint the project using ESLint.
5. Build Project: Runs yarn build to build the project for production.

On push to `main` run Deploy Job
1. Run Build and Lint Job and if success continues
2. Checkout Code: Uses the actions/checkout@v3 action to check out the repository code.
3. Set Up Node.js: Uses the actions/setup-node@v3 action to set up Node.js version 18.18.0.
4. Install Dependencies: Runs yarn install to install project dependencies.
5. Build Project: Runs yarn build to build the project for production.
6. Serve the Build: Installs the serve package globally and serves the build on port 3000 for Lighthouse auditing.
7. Audit URLs using Lighthouse: Uses the treosh/lighthouse-ci-action@v12 action to audit the URLs using Lighthouse. The results are uploaded and stored as a artifact.
8. Configure AWS Credentials: Uses the aws-actions/configure-aws-credentials@v2 action to configure AWS credentials using GitHub secrets.
9. Sync S3 Bucket: Runs aws s3 sync dist/ s3://frontend-cloud-storage --delete to sync the build output to the S3 bucket, deleting any files that no longer exist in the build output.
10. Invalidate CloudFront Cache: Runs aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*" to invalidate the CloudFront cache, ensuring that the latest build is served.

### Setting Up Secrets and Enviroment
To set up the necessary secrets for AWS credentials and CloudFront distribution ID:

#### Secrets
1. Go to your GitHub repository.
2. Click on Settings.
3. Click on Secrets in the left sidebar.
4. Click on New repository secret.
5. Add the following secrets: 
  - `AWS_ACCESS_KEY_ID` The access key id of a IAM AWS account
  - `AWS_SECRET_ACCESS_KEY` The secret access key of a IAM AWS account
  - `CLOUDFRONT_DISTRIBUTION_ID` The id of the cloudfront distribution you want to deploy in
  - `VITE_AUTH0_CLIENT_ID` The client id of your auth0 application
  - `VITE_AUTH0_DOMAIN` The domain of your auth0 application

#### Env
1. Go to your GitHub repository.
2. Click on Settings.
3. Click on Enviroments in the left sidebar.
4. Create a new enviroment called production
5. Add the following variables: 
  - `VITE_AUTH0_CALLBACK_URL` Frontend URL used for callbacks of auth0
  - `VITE_BACKEND_HOST` The host and port of your backend
  - `VITE_BACKEND_PROTOCOL` Protocol of backend (http or https)

## Local development

To run locally simply add every secret and enviroment variable to a `.env`
A template `.env.example` is provided