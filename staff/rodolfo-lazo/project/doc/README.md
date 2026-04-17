# CryptoTracker

## Introduction

"Cryptotracker" is the app you’ve been missing to keep full control of your crypto trades. It lets you record and organize all your operations in one single place, giving you a clear and complete view of your activity.

![CryptoTracker](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZwdDl4dnllM3FmZGZodGtnYW9mMnIyb3lrNjBkaGh5OWVuOXI2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/trN9ht5RlE3Dcwavg2/giphy.gif)


## Functional description

### Use Cases

- The app allows you to create an account and, once logged in, your homepage displays all your crypto assets in one place. From there, you can easily start a new operation whenever you need.
- Pro users also gain access to real‑time price updates for all their assets, allowing them to track market movements instantly.

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

### Techs
- HTML | JS | CSS | Tailwind | React | React Router
- Node | Express | MongoDB | Mongoose | BCrypt | JWT | Curl | Mocha | Chai | Morgan
- Git | Markdown | VSCode | Sublime Merge | DevTools



