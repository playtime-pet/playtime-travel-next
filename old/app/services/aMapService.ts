import "@amap/amap-jsapi-types";
import axios from 'axios';

const amapKey = process.env.AMAP_KEY;

export class AMapService {

    private amapUrl;

    constructor() {
        this.amapUrl = 'AMAP_URL=https://restapi.amap.com/v3'
    }

    /* sample data
    {
    "suggestion": {
        "keywords": [],
        "cities": []
    },
    "count": "1",
    "infocode": "10000",
    "pois": [
        {
            "parent": "B00155R0BW",
            "distance": [],
            "pcode": "310000",
            "importance": [],
            "biz_ext": {
                "cost": "407.00",
                "rating": "4.6",
                "meal_ordering": "0"
            },
            "recommend": "0",
            "type": "餐饮服务;外国餐厅;西餐厅(综合风味)",
            "photos": [
                {
                    "title": [],
                    "url": "http://store.is.autonavi.com/showpic/8832a2bad4425cc75ed1dc2f6567b60b"
                },
                {
                    "title": [],
                    "url": "https://aos-comment.amap.com/B0FFJ2G0D0/comment/5E868238_AFC6_4C2A_861F_3A271788286F_L0_001_1512_2016_1728046779781_99381356.jpg"
                },
                {
                    "title": [],
                    "url": "http://store.is.autonavi.com/showpic/a192a3b341488343593b87964d43b9dd"
                }
            ],
            "discount_num": "0",
            "gridcode": "4621636400",
            "typecode": "050201",
            "shopinfo": "0",
            "poiweight": [],
            "citycode": "021",
            "adname": "长宁区",
            "children": [],
            "alias": [],
            "tel": "021-52760599;13122011196",
            "id": "B0FFJ2G0D0",
            "tag": "蒸青口,吞拿鱼塔塔,牛肉塔塔配牛骨髓,清酒煮蛤蜊,羽衣甘蓝凯撒色拉,烟熏牛髓骨,土豆泥,甜甜圈,牛排,柠檬扇贝烩饭,现烤三文鱼",
            "event": [],
            "entr_location": "121.428403,31.218732",
            "indoor_map": "0",
            "email": [],
            "timestamp": "2024-12-04 02:22:36",
            "website": [],
            "address": "愚园路1107号(江苏路地铁站7号口步行320米)",
            "adcode": "310105",
            "pname": "上海市",
            "biz_type": "diner",
            "cityname": "上海市",
            "postcode": [],
            "match": "0",
            "business_area": "中山公园",
            "indoor_data": {
                "cmsid": [],
                "truefloor": [],
                "cpid": [],
                "floor": []
            },
            "childtype": "202",
            "exit_location": [],
            "name": "THE CANNERY",
            "location": "121.428426,31.218351",
            "shopid": [],
            "navi_poiid": [],
            "groupbuy_num": "0"
        }
    ],
    "status": "1",
    "info": "OK"
}
    */
    async getPlaceInfoByName(name: string, city: string) {
        const url = `${this.amapUrl}/place/text?keywords=${encodeURIComponent(
            name
        )}&city=${city}&offset=20&page=1&key=${amapKey}&extensions=all`;

        axios.get(url).then((response) => {
            if (response.data.status === '0') {
                throw new Error('AMap API request failed');
            }
            console.log(response.data);
            return response.data.pois[0];
        }).catch((error) => {
            throw new Error(`AMap API request failed: ${error.message}`);
        });
    }
}

export default new AMapService();
