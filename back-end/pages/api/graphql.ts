import { ApolloServer } from '@apollo/server';
import { apiRequest } from "../../utils/apiRequest"
import { startServerAndCreateNextHandler } from '@as-integrations/next';


const typeDefs = `#graphql

 type Post {
    createdAt: String
    userId: String
    image: String
    userProfilePicture: String
    username: String  
    tag: [String]
    title: String
 }

 input PostInput {
  userId: String
  image: String
  userProfilePicture: String
  username: String  
  tag: [String]
  title: String
 }  

 type Notif {
  profilePicture: String
  from: String 
  createdAt: String
 }

 input NotifInput {
  profilePicture: String
  from: String 
 }
 
 type Query {
  getNotifs: [Notif]
  getPosts: [Post]
  getPostDetail(id: ID!): Post
 }

type Mutation {
  createNotif(notifCreateInput: NotifInput!): String
  createPost(postCreateInput: PostInput!): String,        
  updatePost(id: ID!, postUpdateInput: PostInput!): Boolean
  deletePost(id: ID!):Boolean
}
`;


const resolvers = {
    Query: {
      getNotifs: async () => {
        const result:any = await apiRequest("find", "notifs", {});
        console.log(result);  
        return result.documents 
        
      },
      getPosts: async () => {
        const result:any = await apiRequest("find", "posts", {});
        console.log(result);  
        return result.documents
        
      },
      getPostDetail:async (_: any, args: any) =>  {  
            const result: any = await apiRequest("findOne", "posts", {
              filter: {
                _id: { $oid: args.id },
              },
            });
            return result.document;
          },
    },      
    Mutation: {
      createNotif: async (_: any, args:any) => {

        const result:any = await apiRequest("insertOne", "notifs", {
          document:{
            profilePicture:args.notifCreateInput.profilePicture,
            from: args.notifCreateInput.from,
            createdAt: Date.now()
          }
        });
        console.log(result);
        
        return result.insertedId
      },
      createPost: async (_: any, args:any) => {

          const result:any = await apiRequest("insertOne", "posts", {
            document:{
              image: args.postCreateInput.image,
              userId:args.postCreateInput.userId,
              userProfilePicture:args.postCreateInput.userProfilePicture,
              username: args.postCreateInput.username,
              tag:args.postCreateInput.tag,
              title:args.postCreateInput.title,
              createdAt: Date.now()
            }
          });
          console.log(result);
          
          return result.insertedId
        },
      // updatePost: async (_: any, args: any) => {
      //   const result: any = await apiRequest("updateOne", {
      //       "filter": {
      //           "_id": { "$oid": args.id}
      //         },
      //         "update": {
      //           "$set": {
      //             "text": args.postUpdateInput.text,
      //             "image": args.postUpdateInput.image 
      //           }
      //         }
      // })
      // console.log(result);
      
      //  return true
      // },
      deletePost: async (_: any, args: any) => {
        const result: any = await apiRequest("deleteOne", "posts",  {
            filter: {
              _id: { $oid: args.id },
            },    
          });
          console.log(result);
          
          return true
      },
    }
  };


  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  export default startServerAndCreateNextHandler(server);