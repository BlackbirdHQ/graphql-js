/**
 * Copyright (c) 2018-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
import { GraphQLError } from '../../error';
export function schemaDefinitionNotAloneMessage() {
  return 'Must provide only one schema definition.';
}
export function canNotDefineSchemaWithinExtension() {
  return 'Cannot define a new schema within a schema extension.';
}
/**
 * Lone Schema definition
 *
 * A GraphQL document is only valid if it contains only one schema definition.
 */

export function LoneSchemaDefinition(context) {
  var oldSchema = context.getSchema();
  var alreadyDefined = oldSchema && (oldSchema.astNode || oldSchema.getQueryType() || oldSchema.getMutationType() || oldSchema.getSubscriptionType());
  var schemaNodes = [];
  return {
    SchemaDefinition: function SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(new GraphQLError(canNotDefineSchemaWithinExtension(), [node]));
        return;
      }

      schemaNodes.push(node);
    },
    Document: {
      leave: function leave() {
        if (schemaNodes.length > 1) {
          context.reportError(new GraphQLError(schemaDefinitionNotAloneMessage(), schemaNodes));
        }
      }
    }
  };
}