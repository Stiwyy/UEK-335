import { View, Text, StyleSheet} from 'react-native';
import Voci from '../models/voci';


export default function VociItem({ voci }: { voci: Voci }) {
    return (
        <View>
            <Text style={styles.voci}>{voci.term} - {voci.translation}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    voci: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    }
})
