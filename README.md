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
[[ 25, 0, 0, 7.65 ],[ 24, 1, 0, 16.1 ]]

### both end point, if there are no body will use the csv file use for this case.
### NOTE: using custom example (using the body) will not work.