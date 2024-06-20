import { useState } from 'react'

export const useUploadCsv = () => {
    const [csvFile, setCsvFile] = useState<File>();

    /**Hanldes when the inputs the csv in the input element **/
    const handleCsvInputting = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const fileInputted = files[0];
        setCsvFile(fileInputted);
    };

    return { csvFile, handleCsvInputting }
}
