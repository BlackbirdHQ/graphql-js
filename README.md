# GraphQL.js

This is a fork of [graphql/graphql-js](https://github.com/graphql/graphql-js) that adds support for our own custom directives to be passed through introspection.

We have currently added this on the master branch, and on the branch for version 0.13.2 (iam-b0.13.2). To get the relevant diff, depending on which version you are interested in:

For v0.13.2,

```bash
$ git diff b0.13.2 iam-b0.13.2 dist/* > add-iam-directive-0.13.2.patch &&
  sed -i -e 's/a\/dist\///g' add-iam-directive-0.13.2.patch &&
  sed -i -e 's/b\/dist\///g' add-iam-directive-0.13.2.patch &&
  rm add-iam-directive-0.13.2.patch-e
```

For v14.0.0-rc.2 (not fully cleaned up),

```bash
$ git diff b14.0.0-rc.2 master dist/* > add-iam-directive-14.0.0-rc.2.patch &&
  sed -i -e 's/a\/dist\///g' add-iam-directive-14.0.0-rc.2.patch &&
  sed -i -e 's/b\/dist\///g' add-iam-directive-14.0.0-rc.2.patch &&
  rm add-iam-directive-14.0.0-rc.2.patch-e
```

The replacements (via `sed`) are necessary because the NPM packaged GraphQL will have the dist files in the root folder and not inside a dist folder.

---

The JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook.

[![npm version](https://badge.fury.io/js/graphql.svg)](http://badge.fury.io/js/graphql)
[![Build Status](https://travis-ci.org/graphql/graphql-js.svg?branch=master)](https://travis-ci.org/graphql/graphql-js?branch=master)
[![Coverage Status](https://coveralls.io/repos/graphql/graphql-js/badge.svg?branch=master)](https://coveralls.io/r/graphql/graphql-js?branch=master)

See more complete documentation at http://graphql.org/ and
http://graphql.org/graphql-js/.

Looking for help? Find resources [from the community](http://graphql.org/community/).


## Getting Started

An overview of GraphQL in general is available in the
[README](https://github.com/facebook/graphql/blob/master/README.md) for the
[Specification for GraphQL](https://github.com/facebook/graphql). That overview
describes a simple set of GraphQL examples that exist as [tests](src/__tests__)
in this repository. A good way to get started with this repository is to walk
through that README and the corresponding tests in parallel.

### Using GraphQL.js

Install GraphQL.js from npm

With yarn:

```sh
yarn add graphql
```

or alternatively using npm:

```sh
npm install --save graphql
```

GraphQL.js provides two important capabilities: building a type schema, and
serving queries against that type schema.

First, build a GraphQL type schema which maps to your code base.

```js
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});
```

This defines a simple schema with one type and one field, that resolves
to a fixed value. The `resolve` function can return a value, a promise,
or an array of promises. A more complex example is included in the top
level [tests](src/__tests__) directory.

Then, serve the result of a query against that type schema.

```js
var query = '{ hello }';

graphql(schema, query).then(result => {

  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(result);

});
```

This runs a query fetching the one field defined. The `graphql` function will
first ensure the query is syntactically and semantically valid before executing
it, reporting errors otherwise.

```js
var query = '{ boyhowdy }';

graphql(schema, query).then(result => {

  // Prints
  // {
  //   errors: [
  //     { message: 'Cannot query field boyhowdy on RootQueryType',
  //       locations: [ { line: 1, column: 3 } ] }
  //   ]
  // }
  console.log(result);

});
```

### Want to ride the bleeding edge?

The `npm` branch in this repository is automatically maintained to be the last
commit to `master` to pass all tests, in the same form found on npm. It is
recommended to use builds deployed to npm for many reasons, but if you want to use
the latest not-yet-released version of graphql-js, you can do so by depending
directly on this branch:

```
npm install graphql@git://github.com/graphql/graphql-js.git#npm
```

### Using in a Browser

GraphQL.js is a general purpose library and can be used both in a Node server
and in the browser. As an example, the [GraphiQL](https://github.com/graphql/graphiql/)
tool is built with GraphQL.js!

Building a project using GraphQL.js with [webpack](https://webpack.js.org) or
[rollup](https://github.com/rollup/rollup) should just work and only include
the portions of the library you use. This works because GraphQL.js is distributed
with both CommonJS (`require()`) and ESModule (`import`) files. Ensure that any
custom build configurations look for `.mjs` files!

### Contributing

We actively welcome pull requests, learn how to
[contribute](https://github.com/graphql/graphql-js/blob/master/.github/CONTRIBUTING.md).

### Changelog

Changes are tracked as [GitHub releases](https://github.com/graphql/graphql-js/releases).

### License

GraphQL.js is [MIT-licensed](https://github.com/graphql/graphql-js/blob/master/LICENSE).
