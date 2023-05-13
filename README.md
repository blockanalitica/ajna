
# Ajna

Ajna is a protocol for non-custodial, peer-to-peer, permissionless lending, borrowing, and trading. It operates without relying on governance or external price feeds, providing a decentralized solution for users. The protocol comprises pools where lenders and borrowers can interact.

This repository provides the front-end part of the codebase. To make it work properly, you will need to additionally set up the back-end part as well.

## Table of Contents

- [Getting Started](#getting-started)
- [Figma Files](#figma-files)
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
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to view the application.

## Figma Files

You can find the Figma files related to the Ajna project:

- [Ajna UX (Dashboard) - View](https://www.figma.com/file/qOAeTiOhCeY8pakZaCnQpO/Ajna-UX-(Dashboard-Copy)?node-id=3729-12559&t=HhBWFrS7NKBZCKal-0)
- [Ajna UX (Dashboard) - Prototype](https://www.figma.com/proto/qOAeTiOhCeY8pakZaCnQpO/Ajna-UX-(Dashboard-Copy)?node-id=8707-42872&scaling=scale-down-width&page-id=215%3A3283&starting-point-node-id=3729%3A12559)

Feel free to check them out to get a better understanding of the project's design and user experience.

## Contributing

We welcome contributions to Ajna! If you'd like to contribute, please follow the guidelines specified in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

Ajna is released under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of this license.