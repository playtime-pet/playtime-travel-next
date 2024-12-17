"use client";

import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function AppleLogin() {
    const router = useRouter();

    const handleAppleLogin = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "apple",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    // 可以添加额外的 scope
                    scopes: "name email",
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error("Apple login error:", error);
            alert("登录失败，请重试");
        }
    };

    return (
        <button
            onClick={handleAppleLogin}
            className="flex items-center justify-center w-full px-4 py-2 
                     space-x-2 text-gray-600 transition-colors duration-300 
                     border border-gray-800 rounded-md hover:bg-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-gray-500 
                     focus:ring-offset-2"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>使用 Apple ID 登录</span>
        </button>
    );
}
