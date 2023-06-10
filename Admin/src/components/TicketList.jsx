import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, useRecordContext } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
export const PostIcon = BookIcon;

export const TicketList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="idclient" />
            <TextField source="idflight" />
            <DateField  source="date_registration" />
            <TextField source="seat_number" />
            <TextField source="status" />
            <TextField source="name" />
            <TextField source="sename" />
            <TextField source="lastname" />
            <EditButton />
        </Datagrid>
    </List>
);