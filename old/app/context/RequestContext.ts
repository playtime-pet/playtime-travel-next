import { AsyncLocalStorage } from "async_hooks";

interface RequestStore {
    userId: string | null;
    petId: string | null;
}

class RequestContextManager {
    private static instance: RequestContextManager;
    private storage: AsyncLocalStorage<RequestStore>;

    private constructor() {
        this.storage = new AsyncLocalStorage<RequestStore>();
    }

    public static getInstance(): RequestContextManager {
        if (!RequestContextManager.instance) {
            RequestContextManager.instance = new RequestContextManager();
        }
        return RequestContextManager.instance;
    }

    public async runWithContext<T>(
        userId: string | null,
        petId: string | null,
        callback: () => Promise<T>
    ): Promise<T> {
        const store: RequestStore = {
            userId,
            petId,
        };
        return this.storage.run(store, callback);
    }

    public getCurrentUserId(): string | null {
        const store = this.storage.getStore();
        if (!store) {
            return null;
        }
        return store.userId;
    }

    public getCurrentPetId(): string | null {
        const store = this.storage.getStore();
        if (!store) {
            return null;
        }
        return store.petId;
    }
}

export const requestContext = RequestContextManager.getInstance();
