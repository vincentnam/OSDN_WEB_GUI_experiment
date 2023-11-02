import React, {useEffect, useState} from "react";
import Sidebar from "./components/sidebar";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootPage from "./routes/root";
import ErrorPage from "./error-page";
import get_registry from "./tools/registry_read";
import "./App.css";
import CreateMatchPage from "./routes/create_match";
import RegisterPlatformPage from "./routes/register_platform";
import CreateModelPage from "./routes/create_model"
import ConfirmInformationsPage from "./routes/confirm_informations";







export default function App(props) {
    const [context, setData] = useState();
    const [PlatformURL, setPlatformURL] = useState(localStorage.getItem("PlatformURL")!==null?localStorage.getItem("PlatformURL"):"");

    console.log("COUCOU")
    console.log(PlatformURL)
    useEffect(() => {
        //
        const dataFetch = async () => {
            const data = await(get_registry(PlatformURL));
            setData(data);
        };

        if (PlatformURL !==""){
            dataFetch();
        }
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootPage context={context}/>,
            errorElement: <ErrorPage />,
        },
        {
            path: "/register_model",
            element: <CreateModelPage context={context} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/create_matches",
            element: <CreateMatchPage context={context}  />,
            errorElement: <ErrorPage />,
        },

        {
            path: "/register_platform",
            element: <RegisterPlatformPage context={context}/>,
            errorElement: <ErrorPage />,
        },
        {
            path: "/confirm_informations",
            element: <ConfirmInformationsPage context={context}/>,
            errorElement: <ErrorPage />,
        },
    ]);
    // props.context.resolve();
    // if (props.context.isPending){
    //     setIsLoaded(false)
    //     console.log(props.context)
    // }

    if (!(context === null)){
        return (
            <div id="root" className="root">


                <Sidebar setPlatformURL={setPlatformURL} URL={PlatformURL}/>

                <RouterProvider router={router} />

            </div>
        )
    }
    else {
        return (
        <div id="root">
            Loading...
        </div>
        )
    }

        // <APIContextProvider>
        //     <div className="App">
        //         <h1>Hello Stack Overflow</h1>
        //         <Users />
        //     </div>
        // </APIContextProvider>

}
