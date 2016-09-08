#!/bin/bash

# Build app
ng build --prod --base-href="/aitarget-components/"

# Temporary create gh-pages directory and checkout to gh-pages branch in it
mkdir gh-pages
cd gh-pages/
git clone git@github.com:aitarget/aitarget-components.git ./
git checkout gh-pages

# Update files from current dist directory, commit and push them to github
cp ../dist/* ./
git add --all .
git commit -am "new gh-pages version"
git push origin +gh-pages

# Remove gh-pages directory
cd ../
rm -rf gh-pages/

echo "Deployed! Visit https://aitarget.github.io/aitarget-components/"
echo "Github pages might take a few minutes to show the deployed site."
