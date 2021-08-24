# Django + MySQL with React.js (and Docker)

## Getting Started

### Prerequisites

- [Docker][1]
- [Yarn][2]

<!-- end of list -->

### Installation

1. Fill .env.example and change to ".env"

   1-1. If you use M1 devices, change db settings in docker-compose.yml.

2. use command <code>docker-compose up</code> to build images.

3. use command in **/frontend** <code>yarn</code> to install react-related packages.

4. use command in **/frontend** <code>yarn start</code> to start react-typescript.

5. use command <code>docker-compose down --rmi local</code> to remove images.

<!-- end of list -->

## TODO

- [ ] Use "history" in react-router-dom to prevent re-render on Django redirect.

[1]: https://www.docker.com/get-started
[2]: https://yarnpkg.com/getting-started/install
