import React from 'react';
import { View } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import BusinessHoursView from './components/BusinessHoursView';
import BusinessHoursSideBar from './components/BusinessHoursSideBar';

const PLUGIN_NAME = 'BusinessHoursPlugin';

export default class BusinessHoursPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }
  init(flex, manager) {
    flex.SideNav.Content.add(
      <BusinessHoursSideBar key="BusinessHoursSideBar"/>
    )
    flex.ViewCollection.Content.add(
      <View name="BusinessHoursView" key="BusinessHoursView">
        <BusinessHoursView />
      </View>
    )    
  }
}
