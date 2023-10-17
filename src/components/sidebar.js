import "./sidebar.css"






export default function Sidebar(props) {
    console.log(props)
    return(

        <div className="sidebar_root">
            <div className="sidebar_header">
                <p>Features </p>
                {/*<div className="button" onClick={props.close_sidebar(true)}>*/}
                {/*    <p >✕</p>*/}
                {/*</div>*/}

            </div>
            <div className="sidebar_body">
                <nav>
                     <ul>
                         <li>
                             <a  href={`/research`}>Research datasets in OSDN</a>
                         </li>
                         <li>
                             <a  href={`/register`}>Register a platform</a>
                         </li>
                         <li>
                             <a  href={`/browse_platforms`}>Browse platforms</a>
                         </li>
                         <li>
                             <a  href={`/browse_models`}>Browse models and matches</a>
                         </li>
                     </ul>
                </nav>
            </div>

            <div className="sidebar_footer">
                Open Science Data Network - OSDN
            </div>
        </div>



)


}

