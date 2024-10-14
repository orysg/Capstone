"use client";
import React, {useEffect, useState} from "react";
import {List, ListItem, Card, Collapse, Button, CardBody, Typography, Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { fetchFallData } from "../utils/fetchFallData";

export function FallList(){

    const [fallHistory, setFallHistory] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchFallData(); 
            setFallHistory(data); 
        };
        loadData();
    }, []);


    
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);
    const [selected, setSelected] = React.useState(1);
    const setSelectedItem = (value) => setSelected(value)

    return(

        <Card>
            <List>
            {fallHistory.length > 0 ? (
                    fallHistory.map((fall) => (
                        <div key={fall.FallID}>
                            <ListItem selected={selected=== fall.FallID} onClick={() => setSelected(fall.FallID)}>
                                Fall ID: {fall.FallID}
                            </ListItem>
                            <Collapse open={selected === fall.FallID}>
                                <List>
                                    <ListItem>Radar ID: {fall.RadarID}</ListItem>
                                    <ListItem>Type: {fall.FallType}</ListItem>
                                    <ListItem>Time: {fall.TimeStamp}</ListItem>
                                    <ListItem>Response Status: {fall.ResponseStatus}</ListItem>
                                </List>
                            </Collapse>
                        </div>
                    ))
                ) : (
                    <ListItem>No fall records found.</ListItem>
                )}
            </List>
        </Card>
    );
}
export default FallList; 