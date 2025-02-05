import React, { useState } from "react";
import { Slider } from 'antd';
import { Select } from 'antd';
import { Button } from 'antd';

const { Option } = Select;

function DoraForm({
    onSearch = () => { }
}) {
    const [values, setValues] = useState({
        battery: 3,
        performance: 3,
        display: 3,
        camera: 3,
        maxBudget: "300"
    })
    return (
        <div>
            <div >
                <p style={{ marginBottom: "0px" }}>Battery</p>
                <Slider 
                    min={0} max={5} step={0.5}
                    onChange={(v) => { setValues({ ...values, battery: v }) }} value={values.battery} />
            </div>
            <div >
                <p style={{ marginBottom: "0px" }}>Camera</p>
                <Slider
                    min={0} max={5} step={0.5}
                    onChange={(v) => { setValues({ ...values, camera: v }) }} value={values.camera} />
            </div>
            <div>
                <p style={{ marginBottom: "0px" }}>Display</p>
                <Slider
                    min={0} max={5} step={0.5}
                    onChange={(v) => { setValues({ ...values, display: v }) }} value={values.display} />
            </div>
            <div >
                <p style={{ marginBottom: "0px" }}>Performance</p>
                <Slider
                    min={0} max={5} step={0.5}
                    onChange={(v) => { setValues({ ...values, performance: v }) }} value={values.performance} />
            </div>

            <div style={{ marginTop: "20px" }}>
                <p style={{ marginBottom: "0px" }}>Max price</p>
                <Select style={{ width: 120 }}
                    onChange={(v) => { setValues({ ...values, maxBudget: v }) }} value={values.maxBudget}
                >
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="300">300</Option>
                    <Option value="400">400</Option>
                    <Option value="500">500</Option>
                    <Option value="600">600</Option>
                    <Option value="700">700</Option>
                    <Option value="800">800</Option>
                    <Option value="900">900</Option>
                    <Option value="300000">+1000</Option>

                </Select>
            </div>
            <Button type="primary" block onClick={() => { onSearch(values) }}
            style={{marginTop:"30px"}}>
                Search!
            </Button>
        </div>
    )
}

export default DoraForm