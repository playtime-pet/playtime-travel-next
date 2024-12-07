import "@amap/amap-jsapi-types";

const amapKey = process.env.AMAP_KEY;
const axios = require('axios');

export class AMapService {

    private amapUrl;

    constructor() {
        this.amapUrl = 'AMAP_URL=https://restapi.amap.com/v3'
    }

    async getPlaceInfoByName(name: string, city: string) {
        const url = `${this.amapUrl}/place/text?keywords=${encodeURIComponent(
            name
        )}&city=${city}&offset=20&page=1&key=${amapKey}&extensions=all`;

        const response = await fetch(url);
        if (response.status === 0)
            throw new Error(
                `AMap API request failed: ${response.statusText}`
            );
        const data = await response.json();
        console.log(data);
        return data;
    }
}

export default new AMapService();
