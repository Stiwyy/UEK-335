import { Text, View, StyleSheet, FlatList } from 'react-native';
import Voci from '../models/voci';
import VociItem from '../components/VociItem';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>VocZLI</Text>
            <Text style={styles.subtitle}>Meine Vokabel-Lern-App</Text>
            <Ionicons name="checkmark-circle" size={32} color="green" />
            <FlatList
                data={vociList}
                keyExtractor={(item) => item.term}
                renderItem={({ item }) => (
                    <VociItem voci={item} />
                )}
                ListEmptyComponent={() => <Text style={styles.item}>{"Sehr geehrter Benuntzende. \n Leider sind keine Vokabeln momentan verfügbar. \n Wir bitten um ihr Verständnis und entschuldigen uns aufrechtlich bei Ihnen. \n Mit freundlichen Grüssen, Ihr VocZLI Team"}</Text>}
            />
        </View>
    );
}

const vociList: Voci[] = [
    { term: 'apple', translation: 'apfel' },
    { term: 'banana', translation: 'banane' },
    { term: 'tree', translation: 'baum' },
];

const vociList2: Voci[] = [];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
    },
    item: {
        color: '#fff',
    }
});