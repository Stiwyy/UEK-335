import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";
import Svg, { Polyline, Line } from "react-native-svg";

export default function App() {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);
    const [z, setZ] = useState(0);
    const [graphData, setGraphData] = useState([]);

    const subscription = useRef(null);
    const wasDown = useRef(false);
    const lastCount = useRef(0);

    useEffect(() => {
        Accelerometer.setUpdateInterval(50);

        return () => {
            if (subscription.current) {
                subscription.current.remove();
            }
        };
    }, []);

    const start = async () => {
        const available = await Accelerometer.isAvailableAsync();

        if (!available) {
            alert("Beschleunigungssensor nicht verfügbar.");
            return;
        }

        setRunning(true);

        subscription.current = Accelerometer.addListener((data) => {
            setZ(data.z);

            setGraphData((old) => {
                const next = [...old, data.z];
                if (next.length > 100) next.shift();
                return next;
            });

            const now = Date.now();

            if (now - lastCount.current < 500) return;

            if (data.z < 0.75) {
                wasDown.current = true;
            }

            if (wasDown.current && data.z > 1.25) {
                wasDown.current = false;
                lastCount.current = now;
                setCount((c) => c + 1);
            }
        });
    };

    const stop = () => {
        if (subscription.current) {
            subscription.current.remove();
            subscription.current = null;
        }

        setRunning(false);
    };

    const reset = () => {
        setCount(0);
        setGraphData([]);
        wasDown.current = false;
    };

    const width = 320;
    const height = 200;

    const points = graphData
        .map((value, index) => {
            const x = (index / Math.max(graphData.length - 1, 1)) * width;
            const y = height - ((value - 0.5) / 1.0) * height;
            return `${x},${y}`;
        })
        .join(" ");

    const upperY = height - ((1.25 - 0.5) / 1.0) * height;
    const lowerY = height - ((0.75 - 0.5) / 1.0) * height;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liegestütz-Zähler</Text>

            <Text style={styles.counter}>{count}</Text>

            <Text style={styles.debug}>z = {z.toFixed(2)}</Text>

            <View style={styles.chartContainer}>
                <Svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`}>
                    <Line
                        x1="0"
                        y1={upperY}
                        x2={width}
                        y2={upperY}
                        stroke="green"
                        strokeWidth="2"
                    />

                    <Line
                        x1="0"
                        y1={lowerY}
                        x2={width}
                        y2={lowerY}
                        stroke="red"
                        strokeWidth="2"
                    />

                    <Polyline
                        points={points}
                        fill="none"
                        stroke="#2196F3"
                        strokeWidth="3"
                    />
                </Svg>
            </View>

            <View style={styles.button}>
                {running ? (
                    <Button title="Stop" color="#d32f2f" onPress={stop} />
                ) : (
                    <Button title="Start" color="#388e3c" onPress={start} />
                )}
            </View>

            <View style={styles.button}>
                <Button title="Reset" onPress={reset} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    counter: {
        fontSize: 70,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1976d2",
    },
    debug: {
        textAlign: "center",
        fontSize: 22,
        marginBottom: 20,
    },
    chartContainer: {
        height: 200,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        marginTop: 10,
    },
});