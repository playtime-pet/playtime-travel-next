import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "gips0.baidu.com",
            "baidu.com",
            // 添加其他你需要的图片域名
        ],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**.baidu.com",
            },
            {
                protocol: "https",
                hostname: "**.baidu.com",
            },
        ],
    },
};

export default nextConfig;
