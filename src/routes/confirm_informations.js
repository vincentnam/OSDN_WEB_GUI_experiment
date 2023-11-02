import './confirm_informations.css';
import {connect} from "react-redux";
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import {DataTable} from "mantine-datatable";
import {useState} from "react";
import Button from '@mui/material/Button';
import {generateUuid} from "uuid-by-string";
import register_platform from "../tools/register_platform_request";
function ConfirmInformationsPage(props) {
    console.log(props.root_reducer.platform)
    const platform_name_display = {platform_name:"Platform name :", platform_URL:"Platform URL :",
        mandatory_platform_to_connect_to:"Mandatory platform selected :", platform_to_connect_to:"Chosen platform selected :",
    model_cascader:"Model used :"}

    var platform_data_components = [];

    if ((props.root_reducer?.platform)&&(props.context)){
        platform_data_components = Object.keys(props.root_reducer.platform).map((el)=>{
            if((el==="platform_to_connect_to")||(el==="mandatory_platform_to_connect_to")){
                const aux = props.root_reducer?.platform[el].map((el_key)=>props.context?.platforms[el_key].name).join(", ");
                return <div style={{flex: 1, flexDirection: "row", display: "flex"}}>
                    <Paper className="content_info" variant="outlined" style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "initial"
                    }}> {platform_name_display[el]}</Paper>
                    <Paper className="content_info" variant="outlined"
                           style={{flex: 1}}> {aux}</Paper>
                </div>
            }
            else if ((el==="model_cascader")) {
                const aux = props.root_reducer?.platform[el].map((el_key)=> {
                        if (el_key[0] === "Custom model") {
                            return "Custom model"
                        } else {
                            return props.context?.models[el_key[0]].name
                        }
                    }
                ).join(", ");
                return <div style={{flex: 1, flexDirection: "row", display: "flex"}}>
                    <Paper className="content_info" variant="outlined" style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "initial"
                    }}> {platform_name_display[el]}</Paper>
                    <Paper className="content_info" variant="outlined"
                           style={{flex: 1}}> {aux}</Paper>
                </div>
            }
            else {
                return            <div style={{flex:1, flexDirection:"row", display:"flex"}}>
                    <Paper className="content_info" variant="outlined" style={{flex:1, textAlign:"left", fontWeight:"initial"}}> {platform_name_display[el]}</Paper>
                    <Paper className="content_info" variant="outlined" style={{flex:1}}> {props.root_reducer.platform[el]}</Paper>
                </div>
            }

        })
    }

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'name', direction: 'asc' });
    const [dataFile, setDataFile] = useState(props.root_reducer.model? props.root_reducer.model : []);
    const [listColumns,setListColumns] = useState([
        {
            accessor: 'id',
            title: '#',
            textAlignment: 'right',
            sortable:true,
        },
        { accessor: 'concept',
            title :"Concept",
            sortable:true,
        },
        {
            accessor: 'type',
            title: "Type",
            sortable:true,
        },

    ]);
    console.log("COUCOU")
    console.log(props)
    const [matchesList, setMatchesList] = useState(props.root_reducer.matches? props.root_reducer.matches : []);
    const [sortStatusMatches, setSortStatusMatches] = useState({ columnAccessor: 'name', direction: 'asc' });

    const [listColumnsMatches,setListColumnsMatches] = useState([
        {
            accessor: 'id',
            title: '#',
            textAlignment: 'right',
            sortable:true,
            width:"auto",
        },
        { accessor: 'ConceptA',
            title :"Concept A",
            sortable:true,
        },
        {
            accessor: 'ModelA',
            title: "Model A",
            sortable:true,
        },
        { accessor: 'ConceptB',
            title :"Concept B",
            sortable:true,
        },
        {
            accessor: 'ModelB',
            title: "Model B",
            sortable:true,
        },

    ]);


    return (
        <div className="confirm_informations_page">
            <div className="header">
                <Paper className="paper_header" >
                    <Button variant="outlined" color="success" onClick={() => {
                        const uuid = require("uuid-by-string");
                        const test = props.root_reducer.platform.platform_name + Date.now();
                        // console.log(test)
                        const headers = {"platform-id":uuid(test )};
                        const model_link = [];
                        var is_custom_model_added = false;
                        // console.log(headers)
                        if (props.root_reducer){
                            props.root_reducer.platform.model_cascader.forEach(function (model){
                                if (model[0]!=="Custom model"){
                                    model_link.push(model[0]);
                                }
                                else{
                                    is_custom_model_added = true;
                                }

                            })
                            if (model_link) {
                                headers["existing-model-id"]=model_link;
                            }
                            // console.log(props.root_reducer.platform)
                            // if (props.root_reducer.platform.model_cascader.includes(["Custom model"])) {
                            //     headers["existing-model-id"] = ;
                            // }
                        }
                        console.log(headers)
                        const body = {};
                        if (is_custom_model_added) {
                            // console.log(body["models"])

                            body["models"] = {};
                            body["models"][uuid(props.root_reducer.modelName+Date.now()).toString()]=props.root_reducer.model;
                        }
                        console.log(body)
                        // console.log(register_platform(localStorage.getItem("PlatformURL"), headers, body ))


                    }}
                    >Register all</Button>
                    <Button variant="outlined" color="success" onClick={() => {

                        console.log("Button cliqué")


                    }}
                    >Add model only</Button>
                    <Button variant="outlined" color="success" onClick={() => {

                        console.log("Button cliqué")


                    }}
                    >Add matches only</Button>
                </Paper>

            </div>

            <div className="platform_viz">
                <Card variant="outlined" className="card">
                    <Paper elevation={1}>Platform informations</Paper>
                    {platform_data_components}
                </Card>
            </div>
            <div className="model_viz">
                <Card className="card">
                    <Paper elevation={1}>Model informations</Paper>
                    <div style={{  height:"92%", maxHeight:"100%", overflow:"auto"}}>
                        <DataTable
                            className="dataTablemodel"
                            withBorder
                            borderRadius="sm"
                            withColumnBorders
                            striped
                            highlightOnHover
                            noRecordsText="No concept to show"
                            textSelectionDisabled
                            columns={listColumns}
                            records={dataFile}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                        />
                    </div>
                </Card>
            </div>
            <div className="matches_viz">
                <Card className="card">
                    <Paper elevation={1}>Matches informations</Paper>
                    <div style={{height:"92%", maxHeight:"100%", overflow:"auto"}}>
                        <DataTable
                            key="match_datatable"
                            className="dataTablemodel"
                            withBorder
                            borderRadius="sm"
                            withColumnBorders
                            striped
                            highlightOnHover
                            noRecordsText="No match to show"
                            textSelectionDisabled
                            columns={listColumnsMatches}
                            records={matchesList}
                            sortStatus={sortStatusMatches}
                            onSortStatusChange={setSortStatusMatches}

                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    // const { todos } = state
    return state
}

export default connect(mapStateToProps)(ConfirmInformationsPage)