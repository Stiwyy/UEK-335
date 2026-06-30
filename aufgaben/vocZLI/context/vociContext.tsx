import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Voci from '../models/voci';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Animated} from "react-native";

interface VociContextType {
    vociList: Voci[];
    isLoading: boolean;
    addVoci: (voci: Voci) => void;
    updateVoci: (term: string, updatedVoci: Voci) => void;
    removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
    const [vociList, setVociList] = useState<Voci[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadVoci = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("voci");

                if (jsonValue !== null) {
                    setVociList(JSON.parse(jsonValue));
                } else {
                    setVociList([
                        { term: "apple", translation: "Apfel" },
                        { term: "banana", translation: "Banane" },
                        { term: "cherry", translation: "Kirsche" },
                        { term: "orange", translation: "Orange" },
                        { term: "grape", translation: "Traube" },
                        { term: "pear", translation: "Birne" },
                        { term: "peach", translation: "Pfirsich" }
                    ]);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        loadVoci();
    }, []);

    useEffect(() => {
        const saveVoci = async () => {
            try {
                const jsonValue = JSON.stringify(vociList);
                await AsyncStorage.setItem('voci', jsonValue);
                console.log("Voci saved");
            } catch (e) {
                console.log(e);
            }
        };

        if(!isLoading){
            saveVoci();
        }
    }, [vociList]);

    const addVoci = (voci: Voci) => {
        setVociList(prev => [...prev, voci]);
    };

    const updateVoci = (term: string, updatedVoci: Voci) => {
        setVociList(prev =>
            prev.map(v =>
                v.term === term ? updatedVoci : v
            )
        );
    };

    const removeVoci = (term: string) => {
        setVociList(prev =>
            prev.filter(v => v.term !== term)
        );
    };

    return (
        <VociContext.Provider
            value={{
                vociList,
                isLoading,
                addVoci,
                updateVoci,
                removeVoci,
            }}
        >
            {children}
        </VociContext.Provider>
    );
}

export function useVoci() {
    const context = useContext(VociContext);

    if (!context) {
        throw new Error('useVoci muss innerhalb von VociProvider verwendet werden');
    }

    return context;
}
