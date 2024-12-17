"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        if (password !== confirmPassword) {
            setMessage("密码不一致");
            return;
        }
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data: {
                        name,
                    },
                },
            });

            if (error) throw error;

            // const { data: userInfo, error: userInfoError } = await supabase
            //     .from("user_info")
            //     .insert({
            //         id: data.user?.id,
            //         name: name,
            //         avatar: "",
            //         openid: "",
            //         verified: false,
            //     });

            // if (userInfoError) throw userInfoError;

            setMessage("请检查您的邮箱以完成注册");
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    名字
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    邮箱
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700  mb-2">
                    密码
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700  mb-2">
                    确认密码
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            {message && (
                <div className="text-sm text-center">
                    <p
                        className={
                            message.includes("检查")
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    >
                        {message}
                    </p>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? "注册中..." : "注册"}
            </button>
        </form>
    );
}
