#!/bin/bash

ng build
mkdir gh-pages
cd gh-pages/
git clone git@github.com:aitarget/aitarget-components.git ./
git checkout gh-pages
cp ../dist/* ./
git add --all .
git commit -am "new gh-pages version"
git push origin +gh-pages
cd ../
rm -rf gh-pages/
echo "Deployed! Visit https://aitarget.github.io/aitarget-components/"
echo "Github pages might take a few minutes to show the deployed site."
