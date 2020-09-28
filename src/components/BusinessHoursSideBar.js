import React from 'react';
import {SideLink, Actions} from '@twilio/flex-ui';

const BusinessHoursSideBar = ({ activeView}) => {
    function navigate () {
        Actions.invokeAction('NavigateToView', {viewName: 'BusinessHoursView'});
    }
    return (
    <SideLink
        showLabel={true}
        icon='Data'
        iconActive='DataBold'
        isActive={activeView === 'BusinessHoursView'}
        onClick={navigate}
        >
            Business Hours    
        </SideLink> 
    )

}

export default BusinessHoursSideBar;