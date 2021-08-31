# Django + MySQL with React.js (and Docker)

## About this project

Using React.js to create client-side (front-end) views and Django & MySQL to managing Products and User model. For styling my homepage, I use [Bootstrap 5][3]. I created server-side components on Docker container. However, you can also run server in local in this project by [this method](#runlocal).

## Getting Started

### Prerequisites

- [Docker][1]
- [Yarn][2]

<!-- end of list -->

### Installation

1. Fill .env.example and change to ".env"

   1-1. If you use M1 devices, change db settings in docker-compose.yml.

2. use command <code>docker-compose up</code> to build images.

   2-1. If you have problem running docker container in Windows, make sure <code>docker-entrypoint.sh</code> has LF EOL, not CRLF EOL.

   2-2.<span id="runlocal"> If you want run in local Django-MySQL server, create file</span> <code>.env.local</code> in project and add <code>DEBUG__ON_LOCAL=True</code>.

3. use command in **/frontend** <code>yarn</code> to install react-related packages.

4. use command in **/frontend** <code>yarn start</code> to start react-typescript.

5. use command <code>docker-compose down --rmi local</code> to remove images.

<!-- end of list -->

## Features

This website supports user related things via Django + MySQL. Users can save their images in Django server to change their profile images. Only logined user can submit, modify their own products. User can also upvote r

## License

Distributed under the MIT License.

## Contributing

1. Fork this project.
2. Create your own branch and make your features.
3. Push to that branch and open a pull request.

## Contact

E-mail : jinsub1999@khu.ac.kr

## TODO

- [x] Add filter on ProductList.
- [ ] Add some feature in productDetail (ex. Review)

[1]: https://www.docker.com/get-started
[2]: https://yarnpkg.com/getting-started/install
[3]: https://getbootstrap.com/docs/5.1/getting-started/introduction/

