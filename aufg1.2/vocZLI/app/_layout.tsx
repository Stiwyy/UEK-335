import {VociProvider} from "@/context/vociContext";
import {Stack, useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
    const router = useRouter();

    return (
        <VociProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#005380",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Meine Vokabeln",
                        headerRight: () => (
                            <Ionicons
                                name="add"
                                size={28}
                                color="#fff"
                                onPress={() => router.push("/add")}
                                style={{marginRight: 15}}
                            />
                        ),
                    }}
                />

                <Stack.Screen
                    name="learn"
                    options={{
                        title: "Vokabeln lernen",
                    }}
                />

                <Stack.Screen
                    name="add"
                    options={{
                        title: "Neue Vokabel",
                        presentation: "modal",
                    }}
                />
                <Stack.Screen
                    name="sensorDebug"
                    options={{
                        title: "Accelerometer",
                        presentation: "modal",
                    }}
                />
                <Stack.Screen
                    name="pushupCounter"
                    options={{
                        title: "Pushup Counter",
                        presentation: "modal",
                    }}
                />
            </Stack>
        </VociProvider>
    );
}