import React, { useEffect, useState } from 'react'
import Select from "react-select"
import { cars, countries, genderOptions } from '../services/options'
import { collection, addDoc } from "firebase/firestore";
import ShowToast from '../components/toaster';
import { db } from '../config/firestore';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../services/common';

type Props = {}

const AddPerson = (props: Props) => {
    const naviate = useNavigate()

    const [person, setPerson] = useState<any>({
        name: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        favourtieCountries: [],
        favourtieCars: []
    })

    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        console.log(">>", person)
    }, [person])

    // const validateForm = () => {
    //     if (!person?.name.trim()) {
    //         ShowToast("Name is required", "error")
    //         return
    //     } else if (!person?.email) {
    //         ShowToast("Email is required", "error")
    //         return
    //     }
    //     else if (!person?.phoneNumber) {
    //         ShowToast("phoneNumber is required", "error")
    //         return
    //     }
    //     else if (!person?.dateOfBirth) {
    //         ShowToast("Please select the date of birth", "error")
    //         return
    //     }
    //     else if (!person?.gender) {
    //         ShowToast("Please select the gender", "error")
    //         return
    //     }
    //     else if (!person?.favourtieCountries.length) {
    //         ShowToast("Please select your favourite countries", "error")
    //         return
    //     }
    //     else if (!person?.favourtieCars.length) {
    //         ShowToast("Please select your favourite cars", "error")
    //         return
    //     }

    //     return true
    // }

    const validateForm = () => {
        if (!person?.name.trim()) {
            ShowToast("Name is required", "error")
            return
        } else if (!person?.email) {
            ShowToast("Email is required", "error")
            return
        } else if (!validateEmail(person?.email)) {
            ShowToast("Email is not valid", "error")
            return
        }
        else if (!person?.phoneNumber) {
            ShowToast("phoneNumber is required", "error")
            return
        }
        else if (!person?.dateOfBirth) {
            ShowToast("Please select the date of birth", "error")
            return
        }
        else if (!person?.gender) {
            ShowToast("Please select the gender", "error")
            return
        }
        else if (!person?.favourtieCountries.length) {
            ShowToast("Please select your favourite countries", "error")
            return
        }
        else if (!person?.favourtieCars.length) {
            ShowToast("Please select your favourite cars", "error")
            return
        }

        return true
    }

    const handleSubmit = async () => {
        setIsSubmitted(true)
        const valid = validateForm()
        if (valid) {
            try {
                await addDoc(collection(db, "persons"), person)
            } catch (error) {
                console.log(error)
            }
            ShowToast("Person details added successfully", "success")
            naviate("/")
        }
    }


    return (
        <form className="max-w-sm ml-5 mt-5">
            <div className="flex w-[100vw] gap-4">
                <div className="mb-5">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        className={`bg-gray-50 border ${isSubmitted && !person?.name.trim() && "border-red-800"} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
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
                        className={`bg-gray-50 border ${isSubmitted && !person?.email && "border-red-800"} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
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
                        className={`bg-gray-50 border ${isSubmitted && !person?.phoneNumber && "border-red-800"} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
                        placeholder="Enter your phone number"
                        required
                        type="number"
                        value={person?.phoneNumber}
                        onChange={(e) => {
                            console.log("e", e.target.value.length)
                            if (e.target.value.length > 11) {
                                return
                            }
                            setPerson({
                                ...person,
                                phoneNumber: e.target.value
                            })
                        }
                        }
                    />

                </div>

                <div className="mb-5">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date of Birth
                    </label>
                    <input
                        className={`bg-gray-50 border ${isSubmitted && !person?.dateOfBirth && "border-red-800"} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5`}
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
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            borderColor: isSubmitted && !person?.gender ? "red" : "grey"
                        }),
                    }}

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
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            borderColor: isSubmitted && !person?.favourtieCountries.length ? "red" : "grey"
                        }),
                    }}
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
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            borderColor: isSubmitted && !person?.favourtieCars.length ? "red" : "grey"
                        }),
                    }}
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
    )
}

export default AddPerson