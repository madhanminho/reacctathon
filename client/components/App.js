//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Responsive from 'react-responsive';
import { SegmentedControl, SegmentedControlItem, View, Box, Text, Button  } from 'react-desktop/macOs';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

export default class App extends React.Component {
constructor() {
    super();
  this.state = {selected: 1,Candidate_id:1,isClicked:false,data:[{}]};
    this.getData = this.getData.bind(this);
  }


getData(){
  var self = this;
  console.log(this.state.Candidate_id);
    axios.get('/viewAppliedJobIds?Candidate_id='+this.state.Candidate_id)
      .then(function(response) {
        console.log( response.data);

      // console.log(JSON.stringify(response.data[0])!=JSON.stringify({}));
       if(JSON.stringify(response.data[0])!=JSON.stringify({})){
         console.log(response.data.length);
         var result = [];
         var obj=response.data;
         for(var i=0;i<response.data.length;i++){
           console.log(response.data[i].Job_Id_Applied);
           result.push(response.data[i].Job_Id_Applied);
         }

         axios.get('/viewAppliedJobDetails?Job_Id_Applied='+result)
           .then(function(response1) {

             console.log(response1.data);
             this.setState({data: response1.data});
           }.bind(this)).catch((error)=>{
            console.log(error);
         });


         this.setState({isClicked:true});
       }

      }.bind(this)).catch((error)=>{
       console.log(error);
    });
}
render() {
    return (
      <SegmentedControl box>
        {this.renderItems()}
      </SegmentedControl>
    );
  }

  renderItems() {
    return [
      this.renderItem(1, 'Tab 1', <div>
      <Desktop>Desktop or laptop</Desktop>
    <Tablet>Tablet</Tablet>
    <Mobile>Mobile</Mobile>
    <Default>Not mobile (desktop or laptop or tablet
    
    <Box label="Box" padding="10px 30px">
       <Text>Job Portal</Text>
     </Box>
       <Button color="blue" onClick={this.getData}>View Applied Jobs</Button>
{this.state.isClicked &&
       <table className='table'>

                 <tbody>
                   {
                     this.state.data.map((exp) => {
                       return  <tr><td className='counterCell'></td>
                      <td className='desc-col'>{exp.Job_id}
                       Designation : {exp.Designation}
                       Experience : {exp.Experience}
                       JobLocation : {exp.Job_Location}</td>

                     <td className='button-col'>{exp.Job_Role}</td>
                      <td className='button-col'>{exp.Primary_Skills}</td>
                      <td className='button-col'>{exp.Secondary_Skills}</td>
                      </tr>


                     })
                   }
                   </tbody>
       </table>
     }

     </Default>
       </div>),
      this.renderItem(2, 'Tab 2', <Text>Content 2</Text>),
      this.renderItem(3, 'Tab 3', <Text>Content 3</Text>)
    ];
  }

  renderItem(key, title, content) {
    return (
      <SegmentedControlItem
        key={key}
        title={title}
        selected={this.state.selected === key}
        onSelect={() => this.setState({ selected: key })}
      >
        {content}
      </SegmentedControlItem>
    );
  }
}
