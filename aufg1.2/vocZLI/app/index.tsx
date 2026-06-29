import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useVoci } from "@/context/vociContext";
import VociItem from "@/components/VociItem";

export default function Index() {
    const router = useRouter();
    const { vociList } = useVoci();

    return (
        <View style={styles.container}>
            <Ionicons name="checkmark-circle" size={32} color="green" />

            <FlatList
                style={{ width: "90%" }}
                data={vociList}
                keyExtractor={(item) => item.term}
                renderItem={({ item }) => (
                    <VociItem
                        voci={item}
                        onEdit={() =>
                            router.push(
                                `/editVoci?term=${encodeURIComponent(item.term)}`
                            )
                        }
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.item}>
                        Sehr geehrter Benutzer.{"\n"}
                        Leider sind keine Vokabeln momentan verfügbar.{"\n"}
                        Wir bitten um Ihr Verständnis und entschuldigen uns
                        aufrichtig.{"\n"}
                        Mit freundlichen Grüssen, Ihr VocZLI Team
                    </Text>
                }
            />

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed ? "green" : "orange",
                    },
                ]}
                onPress={() => router.push("/learn")}
            >
                <Ionicons name="play" size={24} color="#fff" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        color: "#333",
        textAlign: "center",
    },
    button: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
});