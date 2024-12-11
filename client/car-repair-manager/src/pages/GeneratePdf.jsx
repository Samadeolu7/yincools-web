import React from 'react';
import { generatePdf } from '../services/api';
import RepairTable from '../components/RepairTable';

const GeneratePdf = ({ carDetails, repairDetails }) => {
    const handleGeneratePdf = async () => {
        try {
            const { data } = await generatePdf({ carDetails, repairDetails });
            alert('PDF generated! URL: ' + data.fileUrl);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div>
            <h1>Generate PDF</h1>
            <RepairTable repairs={repairDetails} />
            <button onClick={handleGeneratePdf}>Generate PDF</button>
        </div>
    );
};

export default GeneratePdf;
