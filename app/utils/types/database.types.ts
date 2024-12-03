import { MergeDeep } from "type-fest";
// import { Database as DatabaseGenerated } from "./database-generated.types";
import { Database as DatabaseGenerated } from "./database-generated.types";
export type { Json } from "./database-generated.types";

// Override the type for a specific column in a view:
export type Database = MergeDeep<
    DatabaseGenerated,
    {
        public: {
            Views: {
                pet_info: {
                    Row: {
                        age: number | null;
                        created_at: string;
                        description: string | null;
                        gender: string | null;
                        id: string;
                        name: string | null;
                        size: number | null;
                        type: string | null;
                        user_id: string | null;
                    };
                    Insert: {
                        age?: number | null;
                        created_at?: string;
                        description?: string | null;
                        gender?: string | null;
                        id: string;
                        name?: string | null;
                        size?: number | null;
                        type?: string | null;
                        user_id?: string | null;
                    };
                    Update: {
                        age?: number | null;
                        created_at?: string;
                        description?: string | null;
                        gender?: string | null;
                        id?: string;
                        name?: string | null;
                        size?: number | null;
                        type?: string | null;
                        user_id?: string | null;
                    };
                    Relationships: [];
                };
                user_info: {
                    Row: {
                        avatar: string | null;
                        created_at: string;
                        id: string;
                        name: string | null;
                    };
                    Insert: {
                        avatar?: string | null;
                        created_at?: string;
                        id?: string;
                        name?: string | null;
                    };
                    Update: {
                        avatar?: string | null;
                        created_at?: string;
                        id?: string;
                        name?: string | null;
                    };
                    Relationships: [];
                };
            };
        };
    }
>;
