import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import {TicketList} from "../Components/TicketList.jsx";

const dataProvider = simpleRestProvider("https://localhost:8080");

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="ticket" list={TicketList} />
    </Admin>
);

export default App;