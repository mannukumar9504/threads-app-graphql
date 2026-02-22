import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
async function init() {
const app = express();
const PORT = Number(process.env.PORT) || 8000

//create Graphql server 
const server: any = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String,
        say(name: String): String
    }`,
    resolvers: {
        Query: {
            hello: () => `Hey I am grphql server`,
            say: (_,{name}: {name : string}) => `Hey ${name} How are you ?`
        }
    }
});
app.get('/', (req: any, res: any) => {
    res.json({ message: 'Server is up and running.'})
});

await server.start();
app.use('/graphql',express.json(), expressMiddleware(server));
app.listen(PORT, () => {
    console.log('server running on port = ' + PORT);
});
}
init();