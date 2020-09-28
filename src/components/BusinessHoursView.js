import React from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import request from 'request';
import { SyncClient } from "twilio-sync";

const rootStyle = {
    justifyContent: 'center',
  };
  const containerStyle = {
    minWidth: '80%',
    maxWidth: '80%',
    position: 'absolute',
    left: '10%'
  };
  const syncDoc = 'ETb177c3d220cf4a58b6722325c06bcd66'


export default class BusinessHoursView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            columns: [
                { title: 'Queue', field: 'Queue' },
                { title: 'Day', field: 'Day' },
                { title: 'Open', field: 'Open' },
                { title: 'Close', field: 'Close' },
              ],
              data: [
                { Queue: 'Loading...', Day: 'Loading...', Open: 'Loading...', Close: 'Loading...' },
                // { Queue: 'Sales', Day: 'Monday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Sales', Day: 'Tuesday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Sales', Day: 'Wednesday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Sales', Day: 'Thursday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Sales', Day: 'Friday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Sales', Day: 'Saturday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Sales', Day: 'Sunday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Monday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Tuesday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Wednesday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Thursday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Friday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Saturday', Open: '09:00', Close: '21:00' },
                // { Queue: 'Support', Day: 'Sunday', Open: '09:00', Close: '21:00' },

              ],
              checkedA: true,
              checkedB: true,
              document: null,
          };

    }

    componentDidMount() {
        request ("https://brass-chicken-6161.twil.io/SyncToken", (error, response, body) => {
            var parsedResponse = JSON.parse(body)
            var token = parsedResponse.token
            console.log('token retreived - ' + token)
            const syncClient = new SyncClient(token)
            syncClient.document(syncDoc)
              .then((document) => {
                // console.log('Successfully opened a Document. SID: ' + document.sid);
                // console.log(this.state.data)
                // console.log('document follows')
                // console.log(Object.values(document.value))
                this.setState({document})
                this.setState({data : Object.values(document.value)})
                document.on('updated', (event) => {
                    this.setState({document})
                    this.setState({data : Object.values(document.value)}) 
                });
          
              })
            })

      };



    render () {

        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
          };
          const handleChange = (event) => {
            this.setState({ ...this.state, [event.target.name]: event.target.checked }, () => {
                // console.log(this.state.document)
                this.state.document.update(this.state.data)
            });
          };

        return (
            <div style={rootStyle}>
                <div style={containerStyle}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        Global Settings
                        </Typography>
                        <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={this.state.checkedA} onChange={handleChange} name="checkedA" />}
                            label="Emergency Closure"
                        />
                        <FormControlLabel
                            control={
                            <Switch
                                checked={this.state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label=" Play Emergency Queue Message"
                        />
                        </FormGroup>
                    </CardContent>
                 </Card>
                <br />
                <br />
                <br />
                <MaterialTable
                    icons={tableIcons}
                    title="Business Hours"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            if (oldData) {
                                this.setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                                });
                            }
                            }, 600);
                        }),
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                    }}
                />
                </div>
            </div>

        );

    }
}