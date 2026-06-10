# CryptoTracker

## Introduction

"Cryptotracker" is the app you’ve been missing to keep full control of your crypto trades. It lets you record and organize all your operations in one single place, giving you a clear and complete view of your activity.

![CryptoTracker](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZwdDl4dnllM3FmZGZodGtnYW9mMnIyb3lrNjBkaGh5OWVuOXI2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/trN9ht5RlE3Dcwavg2/giphy.gif)


## Functional description

### Use Cases

- The app allows you to create an account and, once logged in, your homepage displays all your crypto assets in one place. From there, you can easily start a new operation whenever you need.

### UI/UX design

[Figma](![CryptoTracker](https://www.figma.com/proto/E0mtJ4XoQmTujHxTiZ6TRQ/Untitled?node-id=0-1&t=tC5gORDZcqaZy1XS-1))

## Technical Description

### Blocks
- App (React)
- Api ( Express)
- BD (MongoDB)

### Packages
- Api (Handlers, Business Logic, Data)
- App (Components, Business Logic, Data)
- Com ( Error, Validate, Regex)
- Doc (readme, image)

### Arquitectura
- In my API, I have implemented a layered architecture to separate responsibilities and achieve a more organized, maintainable, and testable codebase.

- The Mongoose layer defines the database schemas and models. Its responsibility is limited to representing how data is stored in MongoDB.

- The Data layer handles access to that data. It centralizes all queries and operations performed through Mongoose, preventing the rest of the application from depending directly on the database.

-Finally, the Logic layer contains the business rules. This layer validates incoming information, coordinates the required operations, and uses the Data layer to read or modify data.

- Thanks to this separation, each layer has a clear and well‑defined purpose. This makes it easier to introduce changes, reuse code, detect errors, and test the business logic without relying directly on MongoDB.

### Data Model
UserData
- id (unique, string)
- name (required, string)
- email (required, unique, string)
- username (required, unique, string)
- password (required, hashed, string)
- image (string)
- rol (required, string , regular | pro)

PortfolioData
- id (unique, string)
- userId (unique, required, string)
- symbol (unique, required, string)
- quantity (required, number)

TransactionData
- id(unique, string)
- symbol(required, string)
- type(required, string , BUY | SELL)
- quantity(required, number)
- prince(required, number)
- value(required, number)

MarketPriceData
- id(unique, string)
- provider(required, string)
- lastUpdate(required, date)
- data (array)

### Techs
- HTML | JS | CSS | Tailwind | React | React Router | React icons | Recharts
- Node | Express | MongoDB | Mongoose | BCrypt | JWT | Curl | Mocha | Chai | Morgan
- Git | Markdown | VSCode | Sublime Merge | DevTools

### Future releases
- Add more functionalities for the user.
- For an upcoming release, I will initially use node-cron to perform the price‑fetching process, and later migrate this functionality to worker threads.
- For Pro users, I will implement a WebSocket connection and expose the data through Server‑Sent Events (SSE).
- Additionally, I will display the price history, as it is stored daily in the database.

