//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class App extends React.Component {
constructor() {
    super();
  this.state = {jobid:123,isClicked:false,data:[{}]};
    this.getData = this.getData.bind(this);
  }


getData(){
  var self = this;
  console.log(this.state.jobid);
    axios.get('/viewAppliedJobs?jobid='+this.state.jobid)
      .then(function(response) {
        console.log( response.data[0]);
       this.setState({data: response.data});
      // console.log(JSON.stringify(response.data[0])!=JSON.stringify({}));
       if(JSON.stringify(response.data[0])!=JSON.stringify({}))
       this.setState({isClicked:true});
      }.bind(this)).catch((error)=>{
       console.log(error);
    });
}
render() {
    return (
      <div>
       <Button bsStyle="success" bsSize="small" onClick={this.getData}>View Applied Jobs</Button>
{this.state.isClicked &&
       <table className='table'>
                 <thead>
                   <tr><th>SNo</th>
                   <th className='desc-col'>jobid</th>
                   <th className='button-col'>title</th>
                   <th className='button-col'>Exp</th>
                   <th className='button-col'>desc</th>
                   <th className='button-col'>techstack</th>
                   </tr>
                 </thead>
                 <tbody>
                   {
                     this.state.data.map((exp) => {
                       return  <tr><td className='counterCell'></td>
                       <td className='desc-col'>{exp.jobid}</td>
                       <td className='button-col'>{exp.title}</td>
                       <td className='button-col'>{exp.min_exp}-{exp.max_exp}</td>
                       <td className='button-col'>{exp.desc}</td>
                        <td className='button-col'>{exp.techstack}</td>
                       </tr>
                     })
                   }
                   </tbody>
       </table>
     }
       </div>
    );
  }
}
