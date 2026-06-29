import { createContext, useContext, useState, ReactNode } from 'react';
import Voci from '../models/voci';

interface VociContextType {
    vociList: Voci[];
    addVoci: (voci: Voci) => void;
    updateVoci: (term: string, updatedVoci: Voci) => void;
    removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
    const [vociList, setVociList] = useState<Voci[]>([
        { term: 'apple', translation: 'Apfel' },
        { term: 'banana', translation: 'Banane' },
        { term: 'cherry', translation: 'Kirsche' },
        { term: 'orange', translation: 'Orange' },
        { term: 'grape', translation: 'Traube' },
        { term: 'pear', translation: 'Birne' },
        { term: 'peach', translation: 'Pfirsich' }
    ]);

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
