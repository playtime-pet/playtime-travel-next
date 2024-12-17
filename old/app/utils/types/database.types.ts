import { MergeDeep } from "type-fest";
// import { Database as DatabaseGenerated } from "./database-generated.types";
import {
    Database as DatabaseGenerated,
    Json,
} from "./database-generated.types";
export type { Json } from "./database-generated.types";

// Override the type for a specific column in a view:
export type Database = MergeDeep<
    DatabaseGenerated,
    {
        public: {
            Views: {
                pet_info_view: {
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
                user_info_view: {
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
                places_view: {
                    Row: {
                        addition_info: Json | null;
                        address: string | null;
                        friendly_level: number | null;
                        id: string;
                        location: unknown | null;
                        name: string | null;
                        pet_size: number | null;
                    };
                    Insert: {
                        addition_info?: Json | null;
                        address?: string | null;
                        friendly_level?: number | null;
                        id?: string;
                        location?: unknown | null;
                        name?: string | null;
                        pet_size?: number | null;
                    };
                    Update: {
                        addition_info?: Json | null;
                        address?: string | null;
                        friendly_level?: number | null;
                        id?: string;
                        location?: unknown | null;
                        name?: string | null;
                        pet_size?: number | null;
                    };
                    Relationships: [];
                };
            };
        };
    }
>;
