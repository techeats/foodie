#!/usr/bin/env bash

# The below tells bash to stop the script if any of the commands fail
set -ex

npm login
node ./scripts/npm-access.js
lerna publish
git checkout master
git merge develop
git push origin master
git checkout develop
git pull origin master
npm un -g packages
npm i -g packages
echo -e "\\n\\nWoo!"