"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthMethod = "email" | "phone";

export default function AuthForm() {
    const [method, setMethod] = useState<AuthMethod>("email");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            console.log(data);
            router.push(`/users/${data.user.id}`);
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                phone,
                password,
            });

            if (error) throw error;
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-t-lg ${
                        method === "email"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setMethod("email")}
                >
                    邮箱登录
                </button>
                <button
                    className={`px-4 py-2 rounded-t-lg ${
                        method === "phone"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setMethod("phone")}
                >
                    手机号登录
                </button>
            </div>

            <form
                onSubmit={
                    method === "email" ? handleEmailSignIn : handlePhoneSignIn
                }
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {method === "email" ? (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
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
                ) : (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            手机号
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        密码
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {message && (
                    <div className="mb-4 text-red-500 text-sm">{message}</div>
                )}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? "登录中..." : "登录"}
                    </button>
                    <Link href="/signup">注册账户</Link>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            // 实现忘记密码功能
                        }}
                    >
                        忘记密码？
                    </a>
                </div>
            </form>
        </div>
    );
}
