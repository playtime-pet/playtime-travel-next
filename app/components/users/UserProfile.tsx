import Image from "next/image";
import { UserInfo } from "@/app/models/UserInfo";

export default function UserProfile({ user }: { user: UserInfo }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow 
            p-4 md:p-6 w-full max-w-2xl mx-auto"
        >
            <div className="flex flex-col sm:flex-row items-center">
                <div className="relative group">
                    {user.avatar ? (
                        <div
                            className="w-24 h-24 md:w-32 md:h-32 relative mb-4 sm:mb-0
                            rounded-full overflow-hidden ring-2 ring-gray-100 hover:ring-blue-400 
                            transition-all duration-300"
                        >
                            <Image
                                src={user.avatar}
                                alt={user.name}
                                fill
                                className="rounded-full object-cover"
                                sizes="(max-width: 768px) 96px, 128px"
                                priority
                            />
                        </div>
                    ) : (
                        <div
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 
                            flex items-center justify-center mb-4 sm:mb-0"
                        >
                            <span className="text-gray-400 text-2xl">
                                {user.name?.[0]?.toUpperCase() || "?"}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex-1 ml-0 sm:ml-6 text-center sm:text-left">
                    <h1
                        className="text-xl md:text-2xl font-bold mb-2 
                        text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        {user.name}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base break-all mb-4">
                        {user.openid}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                        <div
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 
                            transition-colors duration-200"
                        >
                            <p className="text-gray-500 text-xs md:text-sm">
                                宠物数量
                            </p>
                            <p className="font-semibold text-sm md:text-base">
                                3
                            </p>
                        </div>
                        <div
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 
                            transition-colors duration-200"
                        >
                            <p className="text-gray-500 text-xs md:text-sm">
                                注册时间
                            </p>
                            <p className="font-semibold text-sm md:text-base">
                                2024-01
                            </p>
                        </div>
                        <div
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 
                            transition-colors duration-200 col-span-2 sm:col-span-1"
                        >
                            <p className="text-gray-500 text-xs md:text-sm">
                                状态
                            </p>
                            <p className="font-semibold text-sm md:text-base">
                                活跃
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
