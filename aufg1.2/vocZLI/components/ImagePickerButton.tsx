import * as ImagePicker from "expo-image-picker";
import React from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity} from "react-native";

interface ImagePickerButtonProps {
    imageUrl?: string;
    onImageSelected: (uri: string) => void;
}

export default function ImagePickerButton({imageUrl, onImageSelected,}: ImagePickerButtonProps) {
    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== "granted") {
            Alert.alert(
                "Keine Berechtigung",
                "Bitte erlaube den Zugriff auf die Kamera."
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const openGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.status !== "granted") {
            Alert.alert(
                "Keine Berechtigung",
                "Bitte erlaube den Zugriff auf die Galerie."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const handlePress = () => {
        Alert.alert(
            "Bild auswählen",
            "Woher möchtest du das Bild nehmen?",
            [
                {
                    text: "Foto aufnehmen",
                    onPress: openCamera,
                },
                {
                    text: "Aus Galerie wählen",
                    onPress: openGallery,
                },
                {
                    text: "Abbrechen",
                    style: "cancel",
                },
            ]
        );
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
                <Text style={styles.placeholder}>Bild hinzufügen</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        backgroundColor: "#ddd",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholder: {
        color: "#666",
        textAlign: "center",
    },
});