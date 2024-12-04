import { createClient } from "@supabase/supabase-js";
import { Database } from "../utils/types/database.types";

export class DbService {
    private database: any;

    constructor() {
        this.database = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }

    getDatabase() {
        return this.database;
    }

    async list<T extends keyof Database["public"]["Tables"]>(
        table: T
    ): Promise<Database["public"]["Tables"][T]["Row"][]> {
        const { data, error } = await this.database.from(table).select();

        if (error) throw error;
        return data;
    }

    async get<T extends keyof Database["public"]["Tables"]>(
        table: T,
        field: string,
        conditionValue: any
    ): Promise<Database["public"]["Tables"][T]["Row"]> {
        const { data, error } = await this.database
            .from(table)
            .select()
            .eq(field, conditionValue);

        if (error) throw error;
        return data;
    }

    async create<T extends keyof Database["public"]["Tables"]>(
        table: T,
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
        field: string,
        conditionValue: any
    ) {
        const { data, error } = await this.database
            .from(table)
            .update(updateData)
            .eq(field, conditionValue);

        if (error) throw error;
        return data;
    }

    async upsert<T extends keyof Database["public"]["Tables"]>(
        table: T,
        updateData: Database["public"]["Tables"][T]["Update"]
    ) {
        const { data, error } = await this.database
            .from(table)
            .upsert(updateData)
            .select();

        if (error) throw error;
        return data;
    }

    async delete<T extends keyof Database["public"]["Tables"]>(
        table: T,
        field: string,
        conditionValue: any
    ) {
        const { data, error } = await this.database
            .from(table)
            .delete()
            .eq(field, conditionValue);
        if (error) throw error;
        return data;
    }
}
