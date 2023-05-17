import {useState} from "react";
import {TabMenu} from "primereact/tabmenu";
import './Profile.css'


const Profile = ()=>{
    // useEffect(()=>{
    //     document.getElementById('root').style.background="#202020"
    // },[])
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];


    return(
        <div className="panel-profile">
            <TabMenu model={items} activeIndex={activeIndex}
                     onTabChange={(e) => setActiveIndex(e.index)}
                     className='profile-tabmenu' />
            <div className="profile-main-panel">
                <div className="profile-main-subpanel-left">
                    <TabMenu model={items} activeIndex={activeIndex}
                             onTabChange={(e) => setActiveIndex(e.index)}
                             className='profile-tabmenu-left' />
                </div>
                <div className="profile-main-subpanel-rigcht">
                    <TabMenu model={items} activeIndex={activeIndex}
                             onTabChange={(e) => setActiveIndex(e.index)}
                             className='profile-tabmenu-left' />
                </div>
            </div>
        </div>
    )
}
export default Profile;