//client/components/SearchJobs.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class ViewAppliedJobs extends React.Component {
constructor() {
      super();
this.state = {
  userid:'madhan',
  jobid: '',
  title:'',
  min_exp:'',
  max_exp:'',
  techstack:[],
  description: ''
}
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewExpense = this.insertNewExpense.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }



onClick(e) {
      this.viewAppliedJobs(this);
    }
viewAppliedJobs(e) {
      axios.get('/viewAppliedJobs',
        querystring.stringify({
          year: e.state.userid
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
      });
    }
}
render() {
   //if(this.state.messageFromServer == ''){
      return (
        <div>
<div className='button-center'>
        <br/>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Search Jobs</Button>
       </div>
</div>
      )
   }

   }
//}
export default SearchJobs;
