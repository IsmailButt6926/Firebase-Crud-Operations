import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../config/firestore';
import DeleteConfirmation from '../components/sweetAlert';

type Props = {}

const PersonsDetail = (props: Props) => {
    const [persons, setPersons] = useState<any>([])

    const getPersons = async () => {
        const querySnapshot = await getDocs(collection(db, "persons"));
        const persons = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        setPersons(persons)

    }
    useEffect(() => {
        getPersons()
    }, [])

    const handleDelete = async (id: string) => {
        const deleteConfirmation = await DeleteConfirmation();

        if (deleteConfirmation) {
            deleteDoc(doc(db, "persons", id));
        }
        getPersons()
    }

    return (
        <div >
            <h2 className='flex justify-center my-5 text-4xl '>Persons Data List</h2>
            <Table data={persons} handleDelete={handleDelete} />
        </div>
    )
}

export default PersonsDetail