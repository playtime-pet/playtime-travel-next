import { createClient, QueryData } from "@supabase/supabase-js";
import { Database } from "../utils/types/database.types";
// import { Tables } from "../utils/types/database-generated.types";

type Tables = Database["public"]["Tables"];
type TableName = keyof Tables;
type Row<T extends TableName> = Tables[T]["Row"];
type Insert<T extends TableName> = Tables[T]["Insert"];
type Update<T extends TableName> = Tables[T]["Update"];

type AllRows =
    | Database["public"]["Tables"]["pet_info"]["Row"]
    | Database["public"]["Tables"]["places"]["Row"]
    | Database["public"]["Tables"]["user_info"]["Row"];
export class DbService {
    private database;

    constructor() {
        this.database = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }

    getDatabase() {
        return this.database;
    }

    async list<T extends TableName>(table: T): Promise<Row<T>[]> {
        const queryData = this.database.from(table).select();
        type QueryRes = QueryData<typeof queryData>;
        const { data, error } = await queryData;
        // const { data } = await this.database
        //     .from(table)
        //     .select()
        //     .returns<Row<T>[]>();

        if (error) throw error;

        const res: QueryRes = data;
        return res;
    }

    async get<T extends keyof Database["public"]["Tables"]>(
        table: T,
        // field: string,
        // conditionValue: any
        field: keyof Database["public"]["Tables"][T]["Row"],
        conditionValue: Database["public"]["Tables"][T]["Row"][keyof Database["public"]["Tables"][T]["Row"]]
    ): Promise<Database["public"]["Tables"][T]["Row"]> {
        const { data, error } = await this.database
            .from(table.toString())
            .select()
            .eq(field.toString(), conditionValue);

        if (error) throw error;
        return data;
    }

    async create<T extends keyof Database["public"]["Tables"]>(
        table: Tables<T>,
        insertData: Database["public"]["Tables"][T]["Insert"]
    ) {
        const { data, error } = await this.database
            .from(table)
            .insert(insertData)
            .select();
        // .single();

        if (error) throw error;
        return data[0];
    }

    async update<T extends keyof Database["public"]["Tables"]>(
        table: T,
        updateData: Database["public"]["Tables"][T]["Update"],
        // field: string,
        // conditionValue: any
        field: keyof Database["public"]["Tables"][T]["Row"],
        conditionValue: Database["public"]["Tables"][T]["Row"][keyof Database["public"]["Tables"][T]["Row"]]
    ) {
        const { data, error } = await this.database
            .from(table.toString())
            .update(updateData)
            .eq(field.toString(), conditionValue);

        if (error) throw error;
        return data;
    }

    async upsert<T extends keyof Database["public"]["Tables"]>(
        table: T,
        updateData: Database["public"]["Tables"][T]["Update"]
    ) {
        const { data, error } = await this.database
            .from(table.toString())
            .upsert(updateData)
            .select();

        if (error) throw error;
        return data;
    }

    async delete<T extends keyof Database["public"]["Tables"]>(
        table: T,
        field: keyof Database["public"]["Tables"][T]["Row"],
        conditionValue: Database["public"]["Tables"][T]["Row"][keyof Database["public"]["Tables"][T]["Row"]]
    ) {
        const { data, error } = await this.database
            .from(table.toString())
            .delete()
            .eq(field.toString(), conditionValue);
        if (error) throw error;
        return data;
    }

    async fetchCoordinates(geographyValue: string) {
        const { data, error } = await this.database.rpc("get_coordinates", {
            geography_point: geographyValue,
        });

        if (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }

        return data; // data will contain an array of { longitude, latitude }
    }
}
