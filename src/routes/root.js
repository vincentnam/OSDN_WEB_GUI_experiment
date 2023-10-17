// export default function Root() {
//     return (
//         <>
//             <div id="sidebar">
//                 <h1>Open Science Data Network - OSDN</h1>
//                 <div id="sidebar_title">
//                     <text>Features</text>
//                     {/*<form id="search-form" role="search">*/}
//                     {/*    <input*/}
//                     {/*        id="q"*/}
//                     {/*        aria-label="Search data in OSDN"*/}
//                     {/*        placeholder="Search"*/}
//                     {/*        type="search"*/}
//                     {/*        name="q"*/}
//                     {/*    />*/}
//                     {/*    <div*/}
//                     {/*        id="search-spinner"*/}
//                     {/*        aria-hidden*/}
//                     {/*        hidden={true}*/}
//                     {/*    />*/}
//                     {/*    <div*/}
//                     {/*        className="sr-only"*/}
//                     {/*        aria-live="polite"*/}
//                     {/*    ></div>*/}
//                     {/*</form>*/}
//                     <form method="post">
//                         <button type="submit">  </button>
//                     </form>
//                 </div>
//                 <nav>
//                     <ul>
//                         <li>
//                             <a id="nav_item" href={`/research`}>Research datasets in OSDN</a>
//                         </li>
//                         <li>
//                             <a id="nav_item" href={`/register`}>Register a platform</a>
//                         </li>
//                         <li>
//                             <a id="nav_item" href={`/browse_platforms`}>Browse platforms</a>
//                         </li>
//                         <li>
//                             <a id="nav_item" href={`/browse_models`}>Browse models and matches</a>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//             <div id="detail">
//                 Ici on a le contenu de la page root
//
//             </div>
//         </>
//     );
// }


import './root.css';
import Sidebar from "../components/sidebar";
import {useState} from "react";

export default function Root_page() {
    return (
            <div className="root_page">
                <Sidebar/>

                <div className="page_body">
                    Ta mère est moche
                </div>
            </div>
    );
}