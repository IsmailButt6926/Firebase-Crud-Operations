import React, { useEffect, useState } from 'react'
import { cars, countries, genderOptions } from '../services/options'
import Select from "react-select"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../config/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ShowToast from '../components/toaster';

type Props = {}

const EditPerson = (props: Props) => {
    const params = useParams()
    const navigate = useNavigate()
    const personId = params?.id
    const [person, setPerson] = useState<any>({
        name: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        favourtieCountries: [],
        favourtieCars: []
    })

    const getPersonById = async () => {
        if (personId) {
            const docRef = doc(db, "persons", personId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data()
                setPerson({
                    name: data?.name,
                    email: data?.email,
                    phoneNumber: data?.phoneNumber,
                    dateOfBirth: data?.dateOfBirth,
                    gender: data?.gender,
                    favourtieCountries: data?.favourtieCountries,
                    favourtieCars: data?.favourtieCars
                })
            } else {
                console.log("No such document!");
            }
        }

    }

    useEffect(() => {
        getPersonById()
    }, [personId])

    const handleSubmit = async () => {
        if (personId) {
            await setDoc(doc(db, "persons", personId), {
                ...person
            });
        }
        navigate("/")
        ShowToast("Person record updated successfully", "success")

    }
    return (
        <div>
            <div className='flex items-center'>
                <button className='bg-black ml-4 text-white px-6 py-3 rounded-md ' onClick={() => navigate("/")}>Back</button>
                <h2 className="text-2xl w-full flex justify-center items-center font-bold text-center my-4">EditPerson</h2>
            </div>

            <form className="max-w-sm ml-5 mt-5">
                <div className="flex w-[100vw] gap-4">
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <input
                            className={`bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
                            placeholder="Enter your name"
                            required
                            type="text"
                            value={person?.name}
                            onChange={(e) => setPerson({
                                ...person,
                                name: e.target.value
                            })}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            className={`bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
                            placeholder="Enter your email"
                            required
                            type="email"
                            value={person?.email}
                            onChange={(e) => setPerson({
                                ...person,
                                email: e.target.value
                            })}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Phone Number
                        </label>
                        <input
                            className={`bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
                            placeholder="Enter your phone number"
                            required
                            type="number"
                            value={person?.phoneNumber}
                            onChange={(e) => setPerson({
                                ...person,
                                phoneNumber: e.target.value
                            })}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Date of Birth
                        </label>
                        <input
                            className={`bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
                            placeholder="Enter your dob"
                            required
                            type="date"
                            value={person?.dateOfBirth}
                            onChange={(e) => setPerson({
                                ...person,
                                dateOfBirth: e.target.value
                            })}
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <span className='text-sm font-medium text-gray-900'>Gender</span>
                    <Select
                        options={genderOptions}
                        onChange={(selected: any) => setPerson({
                            ...person,
                            gender: selected.value
                        })}
                        value={{ value: person?.gender, label: person?.gender }}

                    />
                </div>

                <div className="mb-5">
                    <span className='text-sm font-medium text-gray-900'>Select your favourite countries</span>

                    <Select
                        options={countries}
                        onChange={(selected) => {
                            const newValue = selected?.map((item) => item?.value)
                            setPerson({
                                ...person,
                                favourtieCountries: [...newValue]
                            })
                        }}
                        isMulti
                        value={countries.filter((country) => person?.favourtieCountries.includes(country.value))}

                    />
                </div>

                <div className="mb-5">
                    <span className='text-sm font-medium text-gray-900'>Select your favourite cars</span>

                    <Select
                        options={cars}
                        onChange={(selected: any) => {
                            const newValue = selected?.map((item: any) => item?.value)
                            setPerson({
                                ...person,
                                favourtieCars: [...newValue]
                            })
                        }}
                        isMulti
                        value={cars?.filter((car) => person?.favourtieCars?.includes(car.value))}

                    />
                </div>

                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditPerson