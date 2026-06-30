import { useState } from "react";
import {View, TextInput, Button, Alert, StyleSheet} from "react-native";
import Voci from "@/models/voci";
import ImagePickerButton from "@/components/ImagePickerButton";

interface VociDetailProps {
    initialVoci?: Voci;
    onSave: (voci: Voci) => void;
    onDelete?: () => void;
    onCancel?: () => void;
}

export default function VociDetail({initialVoci, onSave, onDelete, onCancel }: VociDetailProps) {
    const [term, setTerm] = useState(initialVoci?.term ?? "");
    const [translation, setTranslation] = useState(initialVoci?.translation ?? "");
    const [imageUri, setImageUri] = useState(initialVoci?.imageUri);

    const handleSave = () => {
        if (!term.trim() || !translation.trim()) {
            Alert.alert(
                "Fehler",
                "Bitte füllen Sie Term und Translation aus."
            );
            return;
        }

        const newVoci: Voci = {
            term: term.trim(),
            translation: translation.trim(),
            imageUri: imageUri || undefined,
        };

        onSave(newVoci);

        setTerm("");
        setTranslation("");
        setImageUri("");
    };

    return (
        <View style={styles.container}>
            <ImagePickerButton imageUrl={imageUri} onImageSelected={setImageUri} />
            <TextInput
                style={styles.input}
                placeholder="Term"
                value={term}
                onChangeText={setTerm}
            />

            <TextInput
                style={styles.input}
                placeholder="Translation"
                value={translation}
                onChangeText={setTranslation}
            />

            <Button title="Speichern" onPress={handleSave} />

            {onDelete && (
                <Button title="Löschen" color="red" onPress={onDelete} />
            )}

            {onCancel && (
                <Button title="Abbrechen" onPress={onCancel} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
    },
});