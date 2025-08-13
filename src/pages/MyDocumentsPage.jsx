import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function MyDocumentsPage() {
    const { currentUser } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!currentUser) return; // Make sure user is logged in

            const db = getFirestore();
            // Create a query to get documents for the current user, ordered by creation date
            const q = query(
                collection(db, "documents"), 
                where("userId", "==", currentUser.uid),
                orderBy("createdAt", "desc")
            );

            try {
                const querySnapshot = await getDocs(q);
                const userDocs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDocuments(userDocs);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [currentUser]); // Re-run effect if the user changes

    if (loading) {
        return <div className="text-center p-10">Loading your documents...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">My Documents</h1>
            {documents.length > 0 ? (
                <div className="space-y-4">
                    {documents.map(doc => (
                        <div key={doc.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{doc.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Created on: {doc.createdAt.toDate().toLocaleDateString()}
                                </p>
                            </div>
                            <a 
                                href={doc.downloadURL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Download PDF
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You haven't created any documents yet.</p>
            )}
        </div>
    );
}