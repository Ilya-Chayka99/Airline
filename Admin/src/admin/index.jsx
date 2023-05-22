import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import {TicketList} from "../Components/TicketList.jsx";
import ky from "ky";

const dataProvider = simpleRestProvider("https://localhost:8080");
const customDataProvider = {
    ...dataProvider,
    getList: (resource) =>
        ky('Flights', {prefixUrl: 'http://localhost:8080'}).then(({ json }) => {
            return ({ data: json, total: json.length })
        }),
};
const App = () => (
    <Admin dataProvider={customDataProvider}>
        <Resource name="ticket" list={TicketList} />
    </Admin>
);

export default App;