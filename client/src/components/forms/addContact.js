import React, { useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import { useMutation } from "@apollo/client";

import { v4 as uuidv4 } from 'uuid'
import {ADD_CONTACT, GET_CONTACTS } from '../../queries'
 
const AddContact = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm()
    const [ , forceUpdate] = useState()
    const [ addContact ] = useMutation(ADD_CONTACT)

    useEffect(()=>{
        forceUpdate({})
    },[])

    const onFinish = values => {
        console.log("values-->", values)
        const { firstName, lastName } = values;
        addContact({
            variables:{
                id,
                firstName,
                lastName
            },
            optimisticResponse: {
                __typename: 'Mutation',
                addContact:{
                    __typename:'Contact',
                        id,
                        firstName,
                        lastName
                    
                }
            },
            update:(proxy, { data: { addContact } } ) =>{
                const data = proxy.readQuery( { query: GET_CONTACTS } )
                proxy.writeQuery({
                    query: GET_CONTACTS,
                    data:{
                        ...data,
                        contacts: [...data.contacts, addContact]
                    }
                })
            }
            
        })
    }
    return (
        <Form
            form={form}
            name='add-contact-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{marginBottom:'40px'}}>
                <Form.Item
                    name='firstName'
                    rules={[{required: true, message: 'Please input your first name! '}]}>
                    <Input placeholder='i.e. John'/>
                </Form.Item>
                <Form.Item
                    name='lastName'
                    rules={[{required: true, message: 'Please input your last name! '}]}>
                    <Input placeholder='i.e. Smith'/>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                disabled={ 
                                    !form.isFieldsTouched(true) || 
                                    form.getFieldsError().filter(({errors})=> errors.length).length
                                }>
                                Add Contact
                            </Button>
                    )}
                </Form.Item>
               
        </Form>
    )
}
export default AddContact
