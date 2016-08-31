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

# Bump version and publish lib directory
cd lib
eval "${cmd}"
npm publish

# Generate changelog if github_changelog_generator installed
# See https://github.com/skywinder/github-changelog-generator
if which github_changelog_generator > /dev/null; then eval "$(github_changelog_generator)"; fi

# Add git tag and update commit
git add --all .
git commit --amend -m "chore: bump version ${semver} to ${VERSION}"
