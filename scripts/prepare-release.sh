#!/usr/bin/env bash

# The below tells bash to stop the script if any of the commands fail
set -ex

LAST_PUBLISHED_TAG=$(awk -F\" '/"version":/ {print $4}' ./packages/package.json)

git checkout develop
git pull origin develop
yarn bootstrap
prs-merged-since --repo foodie/packages --tag v$LAST_PUBLISHED_TAG --format markdown
lerna changed