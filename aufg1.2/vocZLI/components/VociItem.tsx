import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Voci from "../models/voci";

interface Props {
    voci: Voci;
    onEdit?: () => void;
}

export default function VociItem({ voci, onEdit }: Props) {
    return (
        <View style={styles.voci}>
            <Text>
                {voci.term} - {voci.translation}
            </Text>

            <Pressable onPress={onEdit} style={styles.icon}>
                <Ionicons name="create-outline" size={20} color="#005380" />
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    voci: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    icon: {
        marginLeft: 10,
    },
});