import { useRouter } from "expo-router";
import { useVoci } from "@/context/vociContext";
import VociDetail from "@/components/VociDetailsProps";
import Voci from "@/models/voci";

export default function AddVociScreen() {
    const router = useRouter();
    const { addVoci } = useVoci();

    const handleSave = (newVoci: Voci) => {
        addVoci(newVoci);
        router.back();
    };

    return <VociDetail onSave={handleSave} />;
}