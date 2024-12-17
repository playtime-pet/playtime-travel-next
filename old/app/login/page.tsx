import AuthForm from "@/app/components/auth/AuthForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        登录您的账户
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        使用邮箱或手机号登录
                    </p>
                </div>
                <AuthForm />
            </div>
        </div>
    );
}
