import React from "react";
import { Card } from 'antd';
import RemoveContact from "../buttons/RemoveContact";

const getStyles = ()=> ({
    card:{
        width:'500px'
    }
})

const Contact = (props) => {
    const { id, firstName, lastName } = props
    const styles = getStyles()
    return (
        <Card 
            style={styles.card}
            actions={[
                <RemoveContact id={id} firstName={firstName} lastName={lastName}/>
            ]}>
            {firstName} {lastName}
        </Card>
    )

}
export default Contact