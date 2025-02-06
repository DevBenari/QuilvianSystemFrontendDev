'use client';
import React, { useState, memo, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/utils/slug';

const CustomTableComponent = memo(({ 
    data, 
    columns, 
    itemsPerPage = 10,
    slugConfig = { // Configuration for generating slugs
        textField: 'name', // Field to use for generating slug text
        idField: 'id'     // Field containing the actual ID
    },
    basePath = '/', // Default path (can be overridden)
}) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Handle double click with slug generation
    const handleDoubleClick = useCallback((item) => {
        const textField = item[slugConfig.textField];
        const idField = item[slugConfig.idField];

        if (!textField || !idField) {
            console.error('Missing required fields for slug generation:', { textField, idField });
            return;
        }

        const slug = generateSlug(textField, idField);
        const fullPath = `${basePath}/${slug}`; // Dynamic base path
        router.push(fullPath);
    }, [router, slugConfig, basePath]);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="table-responsive-md" style={{ maxHeight: '400px', overflowX: 'auto' }}>
                <Table bordered striped hover responsive  className="text-center" >
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr 
                                key={item[slugConfig.idField]}
                                onDoubleClick={() => handleDoubleClick(item)}
                                style={{ cursor: 'pointer' }}
                            >
                                {columns.map((col, i) => (
                                    <td key={i}>{item[col.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <Button variant="dark" disabled={currentPage === 1} onClick={handlePrevPage}>
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
                </span>
                <Button
                    variant="dark"
                    disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
});

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
