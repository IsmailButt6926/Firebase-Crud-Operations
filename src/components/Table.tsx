import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    data: any;
    handleDelete: any
}

const Table = (props: Props) => {
    const { data, handleDelete } = props
    const navigate = useNavigate()

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 ">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Birthday
                        </th>
                        <th scope="col" className="px-6 py-3">
                            favourtie cars
                        </th>
                        <th scope="col" className="px-6 py-3">
                            favourtie countries
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item: any, index: number) => {
                            return (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" >
                                    <td className="px-6 py-4">
                                        {item?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.dateOfBirth}
                                    </td>
                                    <td className="px-6 py-4 uppercase">
                                        {item?.favourtieCars + ""}
                                    </td>
                                    <td className="px-6 py-4 uppercase">
                                        {item?.favourtieCountries + ""}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={() => navigate(`/edit-person/${item?.id}`)} >Edit</button>
                                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={() => handleDelete(item?.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>
        </div>
    )
}

export default Table