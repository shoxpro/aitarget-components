#!/usr/bin/env bash

# Get semver string from passed args
# ex: npm run deploy -- (patch | minor | major | prepatch | preminor | premajor | prerelease) or from-git
# See: https://docs.npmjs.com/cli/version
semver=$1

# Command to increase npm version
cmd="npm version ${semver}"

#Build library
npm run build

# Increase version for main root package.json and save current VERSION
VERSION=$(eval "${cmd}")

# Bump lib version
cd lib
eval "${cmd}"
cd ../

# Add git tag and update commit
git add --all .
git commit --amend -m "chore: bump version ${semver} to ${VERSION}"

# Generate changelog
node ./scripts/npm/chagelog.js

# Copy updated changelog to lib directory
cp CHANGELOG.md lib/
git add --all .
git commit --amend --no-edit

# Publish lib directory
cd lib
npm publish
