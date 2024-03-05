import React from 'react'
import { NavLink } from 'react-router-dom'
type Props = {}

const Header = (props: Props) => {
    return (
        <div>
            <nav className=" border-gray-200 bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Crud FireBase</span>
                    </a>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active text-blue-400 py-2 px-3" : "text-white py-2 px-3"
                            }

                        >
                            Persons
                        </NavLink>
                        <NavLink
                            to="/add-person"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active text-blue-400 py-2 px-3" : "text-white py-2 px-3"
                            }

                        >
                            Add Person
                        </NavLink>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header