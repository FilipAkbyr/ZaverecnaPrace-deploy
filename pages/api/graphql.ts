import { createYoga, createSchema } from 'graphql-yoga'
import { gql } from 'graphql-tag';
import { DecodedIdToken } from 'firebase-admin/auth';
import { verifyToken } from '../../server/verifyToken';
import { House, Roles, User } from '../../generated/graphql';
import { firestore } from '../../server/firebase-admin-config';


type Context = {
  user?: DecodedIdToken | undefined;
};

const typeDefs = gql`
  type Query {
    user(userEmail: String!): User!
    property(propertyId: ID!): House!
    properties: [House!]!
  }
  
  type User {
    id: ID
    username: String!
    email: String!
    role: Roles!
  }

  type House {
    id: ID
    description: String!
    price: Int!
    city: String!
  }

  type Mutation {
      addHouse(id: ID, description: String!, price: Int!, city: String!): House
      deleteHouse(propertyId: ID!): House
  }

  enum Roles {
    User
    Admin
  }
  
`;

const db = firestore();

const resolvers = {
      Query: {
        properties: async (_root: any, _args: any) => {
          const houseRef = db.collection('properties') as FirebaseFirestore.CollectionReference<House>;
          const docsRefs = await houseRef.listDocuments();
          const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
          const docsSnapshots = await Promise.all(docsSnapshotPromises);
          const docs = docsSnapshots.map((doc) => ({...doc.data(), id: doc.id}));
          return docs;
        },
        property: async (_root: any, args: any) => {
          const houseRef = db.doc(`/properties/${args.propertyId}`) as FirebaseFirestore.DocumentReference<House>;
          const docSnapshot = await houseRef.get();
          const doc = docSnapshot.data();
          return {...doc, id: docSnapshot.id};
        },
        user: async (_root: any, _args: any, context: Context) => {
          const userRef = db.collection('users') as FirebaseFirestore.CollectionReference<User>;
          const docsRefs = await userRef.listDocuments();
          const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
          const docsSnapshots = await Promise.all(docsSnapshotPromises);
          const docs = docsSnapshots.map((doc) => ({...doc.data(), id: doc.id}));
          const user = docs.find((doc) => doc.email === _args.userEmail);
          return user;
        },
      },
      Mutation: {
        addHouse: async (_: any, { description, price, city}: { description: string, price: number, city: string}, __: any) => {
          const projectRef = db.collection('properties').doc();
          const project = {description, price, city }; 
          await projectRef.set(project);
          return project;
        },
        deleteHouse: async (_root: any, args: any) => {
          const docRef = db.doc(`/properties/${args.propertyId}`);
          await docRef.delete();
          return;
        }
      },
  };

  const schema = createSchema({
    typeDefs,
    resolvers,
  });

  export default createYoga({
    schema,
    graphqlEndpoint: '/api/graphql',
    context: async (context) => {
      const auth = context.request.headers.get('authorization');
      console.log(auth);
      return {
        user: auth ? await verifyToken(auth) : undefined,
      } as Context;
    },
  });