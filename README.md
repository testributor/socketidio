# Testributor - Socketidio

Socketidio is part of the [Testributor](http://about.testributor.com) open source
Continuous Integration platform. It is a Node.js application that serves as a very
lightweight push notification mechanism for the
[Katana](https://github.com/testributor/katana) server component. It uses the
[socket.io](http://socket.io/) library as the *event publishing* engine and
[Redis](http://redis.io/) as an *information bridge* for communicating server and
user generated events to the socket.io channels. This system provides the necessary
infrastructure for updating the Katana GUI asynchronously and in an *event-driven*
fashion.

## Running the application

- Install node via nvm:
  
  ```shell
  curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
  nvm install node
  source ~/.profile
  nvm install node
  which node
  ```
- Run `npm install`.
- Run `node index.js`.

## Contributing

You are more than welcome to contribute to the development of Socketidio with
bug fixes or new features. We suggest that you first open an
[Issue](https://github.com/testributor/socketidio/issues) in order to discuss the
bug/feature before jumping to implementation. This will make planning of features
more efficient and will save us from duplicate efforts in case someone has already
started working on something.

In any case, if you decide to work on something:
  - Fork the project
  - Do your magic
  - Open a Pull Request
  - Wait patiently for someone to review your code

Make sure you test your code. Ask for help if you need it. Here are some general
[guidelines](https://guides.github.com/activities/contributing-to-open-source/)
on the subject of contributing.

## License

Socketidio is released under the [MIT License](https://github.com/testributor/socketidio/blob/master/LICENSE).
