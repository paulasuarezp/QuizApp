import React from 'react';

interface SelectQuizProps {
    onSelectQuiz: (quizKey: string) => void;
}

const SelectQuiz: React.FC<SelectQuizProps> = ({ onSelectQuiz }) => {
    const quizOptions = {
        "Seguridad en Sistemas, Aplicaciones y el Big Data": "SSABD",
        "Seguridad en Redes y Análisis Inteligente de Amenazas": "SRAIA",
        "Informática Forense y Respuesta ante Incidentes": "IFRI",
        "Gobierno de la Ciberseguridad y Análisis de Riesgos": "GCAR",
        "Ciberdelitos y Regulación de la Ciberseguridad": "CRC"
    };

    return (
        <select onChange={(e) => onSelectQuiz(e.target.value)}>
            <option value="">Selecciona un quiz</option>
            {Object.entries(quizOptions).map(([label, value]) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
};

export default SelectQuiz;