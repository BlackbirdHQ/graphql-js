function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
import { GraphQLNonNull } from './definition';
import { GraphQLString, GraphQLBoolean } from './scalars';
import defineToStringTag from '../jsutils/defineToStringTag';
import defineToJSON from '../jsutils/defineToJSON';
import instanceOf from '../jsutils/instanceOf';
import invariant from '../jsutils/invariant';
import { DirectiveLocation } from '../language/directiveLocation';
/**
 * Test if the given value is a GraphQL directive.
 */

// eslint-disable-next-line no-redeclare
export function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
/**
 * Directives are used by the GraphQL runtime as a way of modifying execution
 * behavior. Type system creators will usually not create these directly.
 */

export var GraphQLDirective =
/*#__PURE__*/
function () {
  function GraphQLDirective(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "locations", void 0);

    _defineProperty(this, "args", void 0);

    _defineProperty(this, "astNode", void 0);

    this.name = config.name;
    this.description = config.description;
    this.locations = config.locations;
    this.astNode = config.astNode;
    !config.name ? invariant(0, 'Directive must be named.') : void 0;
    !Array.isArray(config.locations) ? invariant(0, 'Must provide locations for directive.') : void 0;
    var args = config.args;

    if (!args) {
      this.args = [];
    } else {
      !!Array.isArray(args) ? invariant(0, "@".concat(config.name, " args must be an object with argument names as keys.")) : void 0;
      this.args = Object.keys(args).map(function (argName) {
        var arg = args[argName];
        return {
          name: argName,
          description: arg.description === undefined ? null : arg.description,
          type: arg.type,
          defaultValue: arg.defaultValue,
          astNode: arg.astNode
        };
      });
    }
  }

  var _proto = GraphQLDirective.prototype;

  _proto.toString = function toString() {
    return '@' + this.name;
  };

  return GraphQLDirective;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

defineToStringTag(GraphQLDirective);
defineToJSON(GraphQLDirective);

/**
 * Used to conditionally include fields or fragments.
 */
export var GraphQLIncludeDirective = new GraphQLDirective({
  name: 'include',
  description: 'Directs the executor to include this field or fragment only when ' + 'the `if` argument is true.',
  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'Included when true.'
    }
  }
});
/**
 * Used to conditionally skip (exclude) fields or fragments.
 */

export var GraphQLSkipDirective = new GraphQLDirective({
  name: 'skip',
  description: 'Directs the executor to skip this field or fragment when the `if` ' + 'argument is true.',
  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'Skipped when true.'
    }
  }
});
/**
 * Constant string used for default reason for a deprecation.
 */

export var DEFAULT_DEPRECATION_REASON = 'No longer supported';
/**
 * Used to declare element of a GraphQL schema as deprecated.
 */

export var GraphQLDeprecatedDirective = new GraphQLDirective({
  name: 'deprecated',
  description: 'Marks an element of a GraphQL schema as no longer supported.',
  locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.ENUM_VALUE],
  args: {
    reason: {
      type: GraphQLString,
      description: 'Explains why this element was deprecated, usually also including a ' + 'suggestion for how to access supported similar data. Formatted ' + 'in [Markdown](https://daringfireball.net/projects/markdown/).',
      defaultValue: DEFAULT_DEPRECATION_REASON
    }
  }
});
/**
 * Used to declare element of a GraphQL schema as restricted to certain permissions.
 */

export var GraphQLIAMDirective = new GraphQLDirective({
  name: 'iam',
  description: 'Annotates the neccessary access permissions for the element.',
  locations: [DirectiveLocation.FIELD_DEFINITION],
  args: {
    name: {
      type: GraphQLString,
      description: 'Defines the access key'
    }
  }
});
/**
 * The full list of specified directives.
 */

export var specifiedDirectives = [GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective, GraphQLIAMDirective];
export function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(function (specifiedDirective) {
    return specifiedDirective.name === directive.name;
  });
}