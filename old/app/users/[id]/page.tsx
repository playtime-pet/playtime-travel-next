import UserProfile from "@/app/components/users/UserProfile";
import PetList from "@/app/components/pets/PetList";
import { UserInfo } from "@/app/models/UserInfo";
import { PetInfo } from "@/app/models/PetInfo";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

async function getUserData(userId: string): Promise<UserInfo> {
    const res = await fetch(`${API_BASE_URL}/api/user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

async function getUserPets(userId: string): Promise<PetInfo[]> {
    const res = await fetch(`${API_BASE_URL}/api/user/${userId}/pets`);
    if (!res.ok) throw new Error("Failed to fetch pets");
    return res.json();
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: PageProps) {
    // 等待 params 解析完成
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    const [user, pets] = await Promise.all([
        getUserData(userId),
        getUserPets(userId),
    ]);

    return (
        <div className="container mx-auto px-4 py-8">
            <UserProfile user={user} />
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">宠物列表</h2>
                <PetList pets={pets} />
            </div>
        </div>
    );
}
