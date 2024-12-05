import { DbService } from "./dbService";
import { createClient } from "@supabase/supabase-js";

// Mock the Supabase client
jest.mock("@supabase/supabase-js", () => ({
    createClient: jest.fn(),
}));

describe("DbService", () => {
    let dbService: DbService;
    let mockRpc: jest.Mock;

    beforeEach(() => {
        // Setup mock for RPC call
        mockRpc = jest.fn();
        (createClient as jest.Mock).mockReturnValue({
            rpc: mockRpc,
        });

        // Initialize DbService
        dbService = new DbService();
    });

    describe("fetchCoordinates", () => {
        const testGeographyPoint =
            "0101000020E610000000000000008066C000000000008056C0";

        it("should successfully fetch coordinates", async () => {
            // Mock successful response
            const expectedCoordinates = {
                longitude: -140.0,
                latitude: -90.0,
            };

            mockRpc.mockResolvedValue({
                data: expectedCoordinates,
                error: null,
            });

            const result = await dbService.fetchCoordinates(testGeographyPoint);

            // Verify the RPC was called with correct parameters
            expect(mockRpc).toHaveBeenCalledWith("get_coordinates", {
                geography_point: testGeographyPoint,
            });

            // Verify the result
            expect(result).toEqual(expectedCoordinates);
        });

        it("should return null when error occurs", async () => {
            // Mock error response
            mockRpc.mockResolvedValue({
                data: null,
                error: new Error("Database error"),
            });

            const result = await dbService.fetchCoordinates(testGeographyPoint);

            // Verify the RPC was called
            expect(mockRpc).toHaveBeenCalled();

            // Verify null is returned on error
            expect(result).toBeNull();
        });
    });
});
