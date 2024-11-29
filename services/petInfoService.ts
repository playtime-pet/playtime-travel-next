import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("673f34f400257fe3d362"); // Your project ID


export default async function list() {
    const databases = new Databases(client);

    const result = await databases.listDocuments(
        "673f35170011d485f6e1", // databaseId
        "673f3b8e002408e60bf1", // collectionId
        [Query.limit(25)] // queries (optional)
    );

    console.log(result);
}
