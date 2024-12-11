import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RepairTable = ({ repairs }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Component</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Notes</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {repairs.map((repair, index) => (
                    <TableRow key={index}>
                        <TableCell>{repair.component}</TableCell>
                        <TableCell>{repair.cost}</TableCell>
                        <TableCell>{repair.notes || 'N/A'}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default RepairTable;
