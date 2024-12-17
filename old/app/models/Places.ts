import { Database } from "../utils/types/database.types";

export type Places = Database["public"]["Tables"]["places"]["Row"];
export type PlaceInput = {
    type: string;
    name: string;
    description?: string;
    longitude: number;
    latitude: number;
    address: string;
    adname: string;
    biz_ext: {
        cost: string;
        rating: string;
        meal_ordering: string;
    },
    biz_type: string;
    business_area: string;
    city_name: string;
    friendly_level: number;
    tel: string;
    additional_info: {
        images: string[];
        description: string;
    }
    // Add any other required fields
};


export function initFromAMap(amap: any, type: string): PlaceInput {
    // Split location string into longitude and latitude
    const [longitude, latitude] = amap.location.split(',').map(Number);

    return {
        type: type,
        name: amap.name,
        address: amap.address,
        adname: amap.adname,
        biz_ext: amap.biz_ext,
        biz_type: amap.biz_type,
        business_area: amap.business_area,
        city_name: amap.city_name,
        longitude: longitude,
        latitude: latitude,
        tel: amap.tel,
        additional_info: {
            images: amap.photos,
            description: amap.tag,
        },
        friendly_level: 3
    };
}
