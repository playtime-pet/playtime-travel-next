export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    public: {
        Tables: {
            pet_info: {
                Row: {
                    age: number | null;
                    created_at: string | null;
                    description: string | null;
                    gender: number | null;
                    id: string;
                    name: string;
                    size: number | null;
                    breed: string | null;
                    updated_at: string | null;
                    user_id: string;
                };
                Insert: {
                    age?: number | null;
                    created_at?: string | null;
                    description?: string | null;
                    gender?: number | null;
                    id?: string;
                    name: string;
                    size?: number | null;
                    breed?: string | null;
                    updated_at?: string | null;
                    user_id: string;
                };
                Update: {
                    age?: number | null;
                    created_at?: string | null;
                    description?: string | null;
                    gender?: number | null;
                    id?: string;
                    name?: string;
                    size?: number | null;
                    breed?: string | null;
                    updated_at?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "fk_pet_info_user_id";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "user_info";
                        referencedColumns: ["id"];
                    }
                ];
            };
            places: {
                Row: {
                    additional_info: Json | null;
                    address: string | null;
                    adname: string | null;
                    biz_ext: Json | null;
                    biz_type: string | null;
                    business_area: string | null;
                    city_name: string | null;
                    created_at: string | null;
                    entr_location: string | null;
                    friendly_level: number | null;
                    id: number;
                    location: unknown;
                    name: string;
                    pet_size: number | null;
                    tel: string | null;
                    type: string;
                    updated_at: string | null;
                };
                Insert: {
                    additional_info?: Json | null;
                    address?: string | null;
                    adname?: string | null;
                    biz_ext?: Json | null;
                    biz_type?: string | null;
                    business_area?: string | null;
                    city_name?: string | null;
                    created_at?: string | null;
                    entr_location?: string | null;
                    friendly_level?: number | null;
                    id?: number;
                    location: unknown;
                    name: string;
                    pet_size?: number | null;
                    tel?: string | null;
                    type: string;
                    updated_at?: string | null;
                };
                Update: {
                    additional_info?: Json | null;
                    address?: string | null;
                    adname?: string | null;
                    biz_ext?: Json | null;
                    biz_type?: string | null;
                    business_area?: string | null;
                    city_name?: string | null;
                    created_at?: string | null;
                    entr_location?: string | null;
                    friendly_level?: number | null;
                    id?: number;
                    location?: unknown;
                    name?: string;
                    pet_size?: number | null;
                    tel?: string | null;
                    type?: string;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
            user_info: {
                Row: {
                    avatar: string | null;
                    created_at: string | null;
                    id: string;
                    name: string;
                    verified: boolean;
                    openid: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    avatar?: string | null;
                    created_at?: string | null;
                    id?: string;
                    name: string;
                    verified?: boolean;
                    openid?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    avatar?: string | null;
                    created_at?: string | null;
                    id?: string;
                    name?: string;
                    verified?: boolean;
                    openid?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            nearby_places: {
                Args: {
                    lat: number;
                    long: number;
                    type: string;
                };
                Returns: {
                    id: number;
                    name: string;
                    location: unknown;
                    type: string;
                    address: string;
                    pet_size: number;
                    friendly_level: number;
                    additional_info: Json;
                    created_at: string;
                    updated_at: string;
                    lat: number;
                    long: number;
                    dist_meters: number;
                }[];
            };
            places_within_radius: {
                Args: {
                    lat: number;
                    long: number;
                    radius_km: number;
                    place_type?: string;
                };
                Returns: {
                    id: number;
                    name: string;
                    location: unknown;
                    type: string;
                    address: string;
                    pet_size: number;
                    friendly_level: number;
                    additional_info: Json;
                    created_at: string;
                    updated_at: string;
                    distance_meters: number;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
          PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
          PublicSchema["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
