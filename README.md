# Embeddable Material-UI Repo
Hello and welcome to the MUI repository for Embeddable.com ❤️ We wish to thank you for being one of our customers and welcome any feedback you might have.

### Installation

`npm i` # requires node 20 or later

### Build & Deploy
This is how you push code changes to your Embeddable workspace

 1. Head to https://app.embeddable.com and grab your **API Key**.

 2. **Build** the code bundle: `npm run embeddable:build`

 3. **Push** the above code bundle to your workspace:
 
   `npm run embeddable:push -- --api-key <API Key> --email <Email> --message <Message>`

 4. Head back to https://app.embeddable.com and "Create new Embeddable" using the **components** and **models** from your code bundle

### Local Development
This is a "Preview workspace" (local to you) that allows you make changes locally and see them instantly without needing to "Build and Deploy".

`npm run embeddable:dev` 

It opens a "Preview" workspace, that uses your local components and models.

### Embedding

To embed your dashboard in a simple HTML file:

  1. click "Publish" on your dashboard and take a copy of your "API Key" and your "Embeddable Id"
  2. Add your "API Key" and "Embeddable Id" to the `src/embeddable.com/scripts/embedding-preview.cjs` file
  3. Run `node src/embeddable.com/scripts/embedding-preview.cjs`
  4. Open [http://localhost:8080/](http://localhost:8080/)
 

