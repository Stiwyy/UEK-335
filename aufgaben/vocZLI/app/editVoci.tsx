import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, View } from "react-native";
import { useVoci } from "@/context/vociContext";
import VociDetail from "@/components/VociDetailsProps";
import Voci from "@/models/voci";

export default function EditVociScreen() {
    const { term } = useLocalSearchParams<{ term: string }>();
    const router = useRouter();
    const { vociList, updateVoci, removeVoci } = useVoci();

    const voci = vociList.find(v => v.term === term);

    const handleSave = (updated: Voci) => {
        updateVoci(term, updated);
        router.back();
    };

    const handleDelete = () => {
        Alert.alert("Löschen", "Vokabel wirklich löschen?", [
            { text: "Abbrechen", style: "cancel" },
            {
                text: "Löschen",
                style: "destructive",
                onPress: () => {
                    removeVoci(term);
                    router.back();
                }
            }
        ]);
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <VociDetail
            initialVoci={voci}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={handleCancel}
        />
    );
}