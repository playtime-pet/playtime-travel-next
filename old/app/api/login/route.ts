import axios from "axios";
import userInfoService from "@/app/services/userInfoService";

export async function wechatLogin(code: string) {
    // 1. 通过 code 换取 openid 和 session_key
    const wechatRes = await axios.get(
        "https://api.weixin.qq.com/sns/jscode2session",
        {
            params: {
                appid: process.env.WX_APP_ID, // 小程序 appId
                secret: process.env.WX_APP_SECRET, // 小程序 appSecret
                js_code: code,
                grant_type: "authorization_code",
            },
        }
    );

    const { openid, session_key } = wechatRes.data;

    // 2. 根据 openid 查找或创建用户
    let user = await userInfoService.getByOpenid(openid);
    // if (!user) {
    //     user = await userInfoService.create({
    //         openid: openid,
    //         name: "未命名",
    //         avatar: "",
    //     });
    // }

    // // 3. 生成token
    // const token = generateToken(user);

    // 4. 返回登录信息
    return {
        // token,
        userInfo: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
        },
    };
}
