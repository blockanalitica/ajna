# Ajna

Ajna is a protocol for non-custodial, peer-to-peer, permissionless lending, borrowing, and trading. It operates without relying on governance or external price feeds, providing a decentralized solution for users. The protocol comprises pools where lenders and borrowers can interact.

This repository provides the front-end part of the codebase. To make it work properly, you will need to additionally set up the back-end part as well.

## Table of Contents

- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with Ajna, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/blockanalitica/ajna.git
   cd ajna
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the back-end:
   - Clone the [ajna-api](https://github.com/blockanalitica/ajna-api) repository.
   - Follow the instructions provided in the ajna-api README to set up and run the back-end server.

4. Add an `.env` file:
   - Copy the `.env.example` file and rename it to `.env`.
   - Update the values in the `.env` file according to your back-end configuration.

5. Start the development server:
   ```bash
   npm run start
   ```

6. Open your browser and visit `http://localhost:3000` to view the application.


## Contributing

We welcome contributions to Ajna! If you'd like to contribute, please follow the guidelines specified in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

Ajna is released under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of this license.