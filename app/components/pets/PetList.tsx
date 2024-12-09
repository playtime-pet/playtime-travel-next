import { PetInfo } from "@/app/models/PetInfo";
import PetCard from "./PetCard";
export default function PetList({ pets }: { pets: PetInfo[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </div>
    );
}
