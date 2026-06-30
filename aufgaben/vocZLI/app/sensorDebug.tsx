import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
    const [running, setRunning] = useState(true);
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });
    const [history, setHistory] = useState([]);

    const subscription = useRef(null);
    const buffer = useRef({ x: [], y: [], z: [] });

    const smoothN = 5;

    const average = (arr) =>
        arr.reduce((sum, value) => sum + value, 0) / arr.length;

    const smooth = (axis, value) => {
        buffer.current[axis].push(value);

        if (buffer.current[axis].length > smoothN) {
            buffer.current[axis].shift();
        }

        return average(buffer.current[axis]);
    };

    const subscribe = () => {
        if (subscription.current) return;

        Accelerometer.setUpdateInterval(100);

        subscription.current = Accelerometer.addListener(({ x, y, z }) => {
            const values = {
                x: smooth('x', x),
                y: smooth('y', y),
                z: smooth('z', z),
            };

            setData(values);

            setHistory((prev) => [values, ...prev].slice(0, 20));
        });
    };

    const unsubscribe = () => {
        subscription.current?.remove();
        subscription.current = null;
    };

    useEffect(() => {
        if (running) {
            subscribe();
        } else {
            unsubscribe();
        }

        return unsubscribe;
    }, [running]);

    const Bar = ({ value }) => {
        const width = Math.min(Math.abs(value) * 50, 50);

        return (
            <View style={styles.barContainer}>
                <View style={styles.center} />
                <View
                    style={[
                        styles.bar,
                        {
                            width: `${width}%`,
                            backgroundColor: value >= 0 ? '#4caf50' : '#f44336',
                            left: value >= 0 ? '50%' : `${50 - width}%`,
                        },
                    ]}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accelerometer</Text>

            <Text style={styles.value}>X: {data.x.toFixed(2)}</Text>
            <Bar value={data.x} />

            <Text style={styles.value}>Y: {data.y.toFixed(2)}</Text>
            <Bar value={data.y} />

            <Text style={styles.value}>Z: {data.z.toFixed(2)}</Text>
            <Bar value={data.z} />

            <TouchableOpacity
                style={styles.button}
                onPress={() => setRunning(!running)}
            >
                <Text style={styles.buttonText}>
                    {running ? 'Pause' : 'Resume'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.historyTitle}>History</Text>

            {history.map((item, index) => (
                <Text key={index} style={styles.history}>
                    {item.x.toFixed(2)} | {item.y.toFixed(2)} | {item.z.toFixed(2)}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    value: {
        textAlign: 'center',
        marginTop: 10,
    },
    barContainer: {
        height: 20,
        backgroundColor: '#eee',
        marginVertical: 5,
        position: 'relative',
    },
    center: {
        position: 'absolute',
        left: '50%',
        width: 2,
        height: '100%',
        backgroundColor: '#000',
    },
    bar: {
        position: 'absolute',
        top: 4,
        height: 12,
    },
    button: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#333',
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    historyTitle: {
        marginTop: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    history: {
        textAlign: 'center',
        fontSize: 12,
    },
});