import { PetInfo } from "@/app/models/PetInfo";

export default function PetCard({ pet }: { pet: PetInfo }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold">{pet.name}</h3>
            <div className="mt-2 space-y-1">
                <p className="text-gray-600">体型: {pet.size}</p>
                {pet.breed && (
                    <p className="text-gray-600">品种: {pet.breed}</p>
                )}
                {pet.age && <p className="text-gray-600">年龄: {pet.age}岁</p>}
            </div>
        </div>
    );
}
