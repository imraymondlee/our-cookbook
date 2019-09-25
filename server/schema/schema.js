const graphql = require('graphql');
const _ = require('lodash');
const Recipe = require('../models/recipe');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList } = graphql;

const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    steps: { type: GraphQLString },
    link: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    recipe: {
      type: RecipeType,
      args: { id: {type:GraphQLID} },
      resolve(parent,args) {
        return Recipe.findById(args.id);
      }
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args) {
        return Recipe.find({});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRecipe: {
      type: RecipeType,
      args: {
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        steps: { type: GraphQLString },
        link: { type: GraphQLString }
      },
      resolve(parent, args) {
        let recipe = new Recipe({
          name: args.name,
          ingredients: args.ingredients,
          steps: args.steps,
          link: args.link,
        });
        return recipe.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});