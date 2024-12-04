export interface Places {
    id: string;
    name: string;
    location: string;
    friendly_level: number;
    pet_size: number;
    address: string;
    addition_info: {
        images: string[];
        description: string;
    };
}

export interface PlaceInput extends Omit<Places, "id" | "location"> {
    longitude: number;
    latitude: number;
}
