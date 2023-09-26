This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code To train and predict a Lineal Regression Model.

the code use 'ml-logistic-regression' as a library to train and predict.
the 'ml-logistic-regression' is not the best library but for simplicity was used. (no precise at all)
the 'ml-logistic-regression' have a limitation that only work with numerical values so if there is a string value, then you need to convert and normalize.

have 2 API endpoint train and predict.

### api/train (POST)

optional body structure: [removeAttributefromDataSet].
example:
["Pclass","Sex","Embarked","Cabin","PassengerId","Name","Ticket"]

### api/predict (POST)

optional body structure: [[dataUsedToPredict],[dataUsedToPredict]].
example:
[[25, 0, 0, 7.65 ],[ 24, 1, 0, 16.1]]

### can use dockercompose up.

### both end point, if there are no body will use the csv file use for this case.

### NOTE: using custom example (using the body) will not work.

## stuff need to add
- Include and API key to secure the endpoint
- Allow the user to display the data used to train the model. (didn't know if I need to display all training set)
  and if need to display Classification Report , Confusion Matrix the Library I used was poor in extra results.
## Features

- ⚡️ Next.js 13
- ⚛️ React 18
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🚓 Commitlint — To make sure your commit messages follow the convention
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- ‽ Either Error Handler - For error handling. (Either is designed to hold either a left or a right value but never both).
