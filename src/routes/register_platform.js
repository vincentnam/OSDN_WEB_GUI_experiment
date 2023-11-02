import './register_platform.css';
import {Checkbox, Form, Input, Button, Cascader} from 'antd';
import {connect} from "react-redux";
import {React, useEffect, useState} from 'react';
import get_mandatory_platform_to_connect_to from "../tools/get_mandatory_platform";


function RegisterPlatformPage(props) {
    const [modelComponentDisabled, setModelComponentDisabled] = useState(true);
    const [mandatory_platform, setMandatoryPlatform]= useState([]);
    const [platformData, setPlatformData] = useState({platform_name:"",platform_URL:"",mandatory_platform_to_connect_to:[],platform_to_connect_to:[], model_cascader:[]});


    var options = [];
    var model_options = [];
    useEffect(() => {
        const dataFetch = async () => {
            const data = await (get_mandatory_platform_to_connect_to("http://193.168.2.11:5000"));
            setMandatoryPlatform(data);
                    };
        dataFetch();
    }, []);

    if (props.context?.platforms){
        options = Object.keys(props.context.platforms).filter((el)=> !(mandatory_platform.includes(el)) ).map((key) => {
            return {label: props.context?.platforms[key]?.name, value: key}
        });
    }
    if (props.context?.models){
        model_options = Object.keys(props.context.models).map((key) => {
            return {label: props.context?.models[key]?.name, value:key}
        });
        model_options.unshift({label:"Custom model", value:"Custom model"})
    }
    console.log(model_options)
    console.log(props.context)
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const mandatory_options = mandatory_platform?.map((key, index)=>{
        return {label: props.context?.platforms[key]?.name, value: key}
    });

    const onValueChangeForm = (value, allvalues)=>{

        setPlatformData(allvalues);
        // console.log(allvalues)
        // Object.keys(value).map((el)=>(setPlatformData({...platformData, el:value[el]})))
        // console.log(platformData)
    }

    return (

        <div className="register_platform">
            <div className="form_platform_header">
                <p>
                    Fill platform information for registration in OSDN
                </p>

            </div>
            <div className="form_platform">
                <div>


                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    onValuesChange={onValueChangeForm}
                >
                    <Form.Item
                        label="Platform name"
                        name="platform_name"
                        rules={[{ required: true, message: 'Platform name needed.' }]}
                    >
                        <Input placeholder="Example : RCSB PDB,  data.gouv.fr, ..."/>
                    </Form.Item>

                    <Form.Item
                        label="Platform URL "
                        name="platform_URL"
                        rules={[{ required: true, message: 'URL to message the platform needed.' }]}
                    >
                        <Input placeholder='Examples : www.platform.com/osdn_api, 192.168.0.1:5000..'/>
                    </Form.Item>
                    <Form.Item
                        label="Mandatory platform"
                        name="mandatory_platform_to_connect_to"

                        rules={[{ required: true, message: 'Select a platform to connect to.' }]}
                    >
                        <Cascader
                            options={mandatory_options}
                            multiple
                            maxTagCount="responsive"

                            // expandTrigger="hover"
                            // displayRender={displayRender}
                            // onChange={onChange}
                        />

                    </Form.Item>
                    <Form.Item
                        label="Platform to connect to"
                        name="platform_to_connect_to"

                        rules={[{  message: 'Select a platform to connect to.' }]}
                    >
                        <Cascader
                            options={options}
                            multiple
                            maxTagCount="responsive"

                            // expandTrigger="hover"
                            // displayRender={displayRender}
                            // onChange={onChange}
                        />

                    </Form.Item>
                    {/*<div style={{width:"100%", display: "flex", justifyContent:"center" }}>*/}
                    {/*    <p style={{marginRight:"1rem"}}>Use model in the list</p>*/}
                    {/*    <Checkbox*/}
                    {/*        checked={modelComponentDisabled}*/}
                    {/*        onChange={(e) => setModelComponentDisabled(e.target.checked)}*/}
                    {/*    />*/}

                    {/*</div>*/}
                    <Form.Item
                        label="Use model already in registry"
                        name="model_cascader"
                        className="model_checkbox_div"
                        rules={[{ required: true, message: 'URL to message the platform needed.' }]}
                    >


                            <Cascader
                                className="model_used"
                                name="coucou"
                                label="coucou"
                                title="See model register page to define the custom model"
                                placeholder="See model register page for model not in the registry"
                                options={model_options}
                                multiple
                                maxTagCount="responsive"
                                disabled={!modelComponentDisabled}
                            />



                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" onClick={(el)=> props.dispatch({type:"ADD_PLATFORM",platform:platformData})}>
                            Confirm informations
                        </Button>
                        {/*<Button type="primary" onClick={()=> console.log(platformData)}>*/}
                        {/*    Log props*/}
                        {/*</Button>*/}
                    </Form.Item>
                </Form>
            </div>


        </div>
    );
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(RegisterPlatformPage)