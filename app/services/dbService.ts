import { createClient } from "@supabase/supabase-js";
import { Database } from "../utils/types/database.types";
// import { Tables } from "../utils/types/database-generated.types";

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

    // async list<T extends TableName>(table: T): Promise<Row<T>[]> {
    //     const queryData = this.database.from(table).select();
    //     type QueryRes = QueryData<typeof queryData>;
    //     const { data, error } = await queryData;
    //     // const { data } = await this.database
    //     //     .from(table)
    //     //     .select()
    //     //     .returns<Row<T>[]>();

    //     if (error) throw error;

    //     return data;
    // }

    // async get<T extends keyof Database["public"]["Tables"]>(
    //     table: T,
    //     // field: string,
    //     // conditionValue: any
    //     field: keyof Database["public"]["Tables"][T]["Row"],
    //     conditionValue: Database["public"]["Tables"][T]["Row"][keyof Database["public"]["Tables"][T]["Row"]]
    // ): Promise<Database["public"]["Tables"][T]["Row"]> {
    //     const { data, error } = await this.database
    //         .from(table)
    //         .select()
    //         .eq(field.toString(), conditionValue)
    //         .single();

    //     if (error) throw error;
    //     return data;
    // }

    // async create<T extends keyof Database["public"]["Tables"]>(
    //     table: T,
    //     insertData: Database["public"]["Tables"][T]["Insert"]
    // ) {
    //     const { data, error } = await this.database
    //         .from(table)
    //         .insert(insertData as any)
    //         .select();

    //     if (error) throw error;
    //     return data[0];
    // }

    // async update<T extends keyof Database["public"]["Tables"]>(
    //     table: T,
    //     updateData: Database["public"]["Tables"][T]["Update"],
    //     // field: string,
    //     // conditionValue: any
    //     field: keyof Database["public"]["Tables"][T]["Row"],
    //     conditionValue: Database["public"]["Tables"][T]["Row"][keyof Database["public"]["Tables"][T]["Row"]]
    // ) {
    //     const { data, error } = await this.database
    //         .from(table)
    //         .update(updateData as any)
    //         .eq(field as string, conditionValue);

    //     if (error) throw error;
    //     return data;
    // }

    // async upsert<T extends keyof Database["public"]["Tables"]>(
    //     table: T,
    //     updateData: Database["public"]["Tables"][T]["Update"]
    // ) {
    //     const { data, error } = await this.database
    //         .from(table)
    //         .upsert(updateData as any)
    //         .select();

    //     if (error) throw error;
    //     return data;
    // }

    // async delete<T extends keyof Database["public"]["Tables"]>(
    //     table: T,
    //     field: keyof Database["public"]["Tables"][T]["Row"],
    //     conditionValue: Database["public"]["Tables"][T]["Row"][keyof Database["public"]["Tables"][T]["Row"]]
    // ) {
    //     const { data, error } = await this.database
    //         .from(table)
    //         .delete()
    //         .eq(field.toString(), conditionValue);
    //     if (error) throw error;
    //     return data;
    // }

    async nearbyPlacesWithinRadius(
        lat: number,
        long: number,
        type: string,
        radius_km: number
    ) {
        const { data, error } = await this.database.rpc(
            "places_within_radius",
            {
                lat: lat,
                long: long,
                radius_km: radius_km,
                place_type: type,
            }
        );

        if (error) {
            console.error("Error fetching nearby places within radius:", error);
            return null;
        }

        return data;
    }
}
