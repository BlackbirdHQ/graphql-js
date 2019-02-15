#!/usr/bin/env bash

if [ -z "$1" ]; then
    git fetch
    git tag -l
    echo "» Now specify tag as the argument to this script to apply the patch"
    exit 1
fi

git checkout $1

yarn
yarn build

sed -i -e 's/dist//' .gitignore
git add dist .gitignore

git commit -m "$1 dist"

git checkout master -- src-changes.patch

git apply -3 < src-changes.patch

if [ "$?" -ne "0" ]; then
    echo "» Patch failed - Fix conflicts 8) and update the patch with"
    echo "git diff --staged > src-changes.patch && git am --abort || git reset --hard"
    exit 1
fi

yarn build

git add dist
git commit -m "$1 patched"

git diff HEAD^ HEAD dist/* > add-iam-directive-$1.patch && \
    sed -i -e 's/a\/dist\///g' add-iam-directive-$1.patch && \
    sed -i -e 's/b\/dist\///g' add-iam-directive-$1.patch && \
    rm add-iam-directive-$1.patch-e
