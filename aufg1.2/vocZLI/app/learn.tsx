import { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInRight,
    SlideOutLeft,
    Layout,
} from "react-native-reanimated";
import { router } from "expo-router";
import Voci from "@/models/voci";
import {useVoci} from "@/context/vociContext";



export default function Learn() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] =useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { vociList } = useVoci();

    const currentVoci = vociList[currentIndex];

    const handleNext = () => {
        if (isAnimating) return;

        if (currentIndex >= vociList.length - 1) {
            router.back();
            return;
        }

        setIsAnimating(true);

        // Warten bis Exit-Animation fertig ist
        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setShowTranslation(false);
            setIsAnimating(false);
        }, 300);
    };

    const handleAnswer = (knew: boolean) => {
        if (knew) {
            setCorrect((prev) => prev + 1);
        } else {
            setWrong((prev) => prev + 1);
        }

        handleNext();
    };

    if (!currentVoci) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.counter}>
                {currentIndex + 1} / {vociList.length}
            </Text>

            <Text style={styles.stats}>
                Richtig: {correct} | Falsch: {wrong}
            </Text>

            <Animated.View
                key={currentIndex}
                layout={Layout.springify()}
                entering={SlideInRight.duration(300)}
                exiting={SlideOutLeft.duration(300)}
                style={styles.card}
            >
                <Text style={styles.term}>{currentVoci.term}</Text>

                {showTranslation && (
                    <Animated.Text
                        entering={FadeIn.duration(250)}
                        exiting={FadeOut.duration(200)}
                        style={styles.translation}
                    >
                        {currentVoci.translation}
                    </Animated.Text>
                )}
            </Animated.View>

            {!showTranslation ? (
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    layout={Layout.springify()}
                >
                    <TouchableOpacity
                        style={styles.showButton}
                        onPress={() => setShowTranslation(true)}
                    >
                        <Text style={styles.buttonText}>Übersetzung zeigen</Text>
                    </TouchableOpacity>
                </Animated.View>
            ) : (
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    layout={Layout.springify()}
                    style={styles.buttonRow}
                >
                    <TouchableOpacity
                        style={[styles.answerButton, styles.wrongButton]}
                        onPress={() => handleAnswer(false)}
                    >
                        <Text style={styles.buttonText}>Nicht gewusst</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.answerButton, styles.correctButton]}
                        onPress={() => handleAnswer(true)}
                    >
                        <Text style={styles.buttonText}>Gewusst</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f4f8",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    counter: {
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        fontWeight: "600",
        elevation: 3,
    },

    stats: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
        color: "#333",
    },

    card: {
        width: "90%",
        maxWidth: 340,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 45,
        paddingHorizontal: 25,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 6,
    },

    term: {
        fontSize: 34,
        fontWeight: "700",
        color: "#111",
        textTransform: "capitalize",
    },

    translation: {
        marginTop: 18,
        fontSize: 24,
        color: "#666",
        textTransform: "capitalize",
    },

    showButton: {
        marginTop: 35,
        backgroundColor: "#4F46E5",
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 12,
    },

    buttonRow: {
        flexDirection: "row",
        marginTop: 35,
        width: "90%",
        justifyContent: "space-between",
    },

    answerButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    wrongButton: {
        backgroundColor: "#E74C3C",
        marginRight: 10,
    },

    correctButton: {
        backgroundColor: "#2ECC71",
        marginLeft: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
});