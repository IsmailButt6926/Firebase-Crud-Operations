import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import PersonsDetail from "../pages/PersonsDetail";
import AddPerson from "../pages/AddPerson";
import EditPerson from "../pages/EditPerson";
import { ReactNode } from "react";
import Header from "../components/Header"

interface SharedLayoutProps {
    children: ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
    return (
        <div className="">
            <Header />
            {children}
        </div>
    );
};


const routes = [
    { path: "/", element: <SharedLayout><PersonsDetail /></SharedLayout> },
    { path: "/add-person", element: <SharedLayout><AddPerson /></SharedLayout> },
    { path: "/edit-person/:id", element: <EditPerson /> },
]

const router = createBrowserRouter([{ children: routes }])

function AppRouter() {
    return <RouterProvider router={router} />
}

export default AppRouter