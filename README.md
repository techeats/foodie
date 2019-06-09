[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# foodie

Project Setup:
You can install all packages (including respective dependencies) and link them using the following command:

$ cd <foodie>

## only needed to run occasionally...
$ yarn install

## run to link project packages listed above...
$ yarn run bootstrap
example
To add new node module say moment

$ lerna add moment@version --scope=foodie-web

NOTE: Changes made to any individual package must follow the normal process of creating a PR, adding, committing, and pushing to its own repo.