import {Admin, Resource, ListGuesser, EditGuesser} from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import {TicketList} from "../Components/TicketList.jsx";
import ky from "ky";

const dataProvider = simpleRestProvider("https://localhost:8080");
const customDataProvider = {
    ...dataProvider,
    getList: (resource) =>{
        return  ky('ticket', {prefixUrl: 'http://localhost:8080'}).json().then(json  => {
            return ({ data: json, total: json.length})
        })
    }

};
const App = () => (
    <Admin dataProvider={customDataProvider}>
        <Resource name="ticket" list={TicketList} edit={EditGuesser} />
    </Admin>
);

export default App;