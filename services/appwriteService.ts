import { AppwriteError } from "@/app/utils/appwrite";
import { Client, Databases, Models } from "appwrite";

export class AppwriteService {
    private databases: Databases;

    constructor() {
        const client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(process.env.APPWRITE_PROJECT_ID || "");

        this.databases = new Databases(client);
    }

    async getDocument<T extends Models.Document>(
        databaseId: string,
        collectionId: string,
        documentId: string
    ): Promise<T> {
        const result = await this.databases.getDocument<T>(
            databaseId,
            collectionId,
            documentId
        );

        if (!result) {
            throw new AppwriteError(`Document not found: ${documentId}`);
        }

        return result;
    }

    async listDocuments<T extends Models.Document>(
        databaseId: string,
        collectionId: string,
        queries?: string[]
    ): Promise<Models.DocumentList<T>> {
        const result = await this.databases.listDocuments<T>(
            databaseId,
            collectionId,
            queries
        );
        if (!result) {
            throw new AppwriteError(`Document not found: ${collectionId}`);
        }
        return result;
    }

    async createDocument<T extends Models.Document>(
        databaseId: string,
        collectionId: string,
        documentId: string,
        data: Omit<T, keyof Models.Document>
    ): Promise<T> {
        const result = await this.databases.createDocument<T>(
            databaseId,
            collectionId,
            documentId,
            data
        );
        if (!result) {
            throw new AppwriteError(`Document not created: ${documentId}`);
        }
        return result;
    }
    // 其他数据库操作方法...
}

export const appwrite = new AppwriteService();
