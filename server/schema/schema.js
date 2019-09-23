const graphql = require('graphql');
const _ = require('lodash');

const recipes = [
  {
    id: '1',
    name: 'Test name 1',
    ingredients: 'Test ingredients 1',
    steps: 'Test step 1'
  },
  {
    id: '2',
    name: 'Test name 2',
    ingredients: 'Test ingredients 2',
    steps: 'Test step 2'
  }
];

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
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    recipe: {
      type: RecipeType,
      args: { id: {type:GraphQLID} },
      resolve(parent,args) {
        console.log(_.find(recipes, {id:args.id}));
        return _.find(recipes, {id:args.id});
      }
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args) {
        return recipes;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});