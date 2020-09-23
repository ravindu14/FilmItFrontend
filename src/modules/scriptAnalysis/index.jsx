// @flow
import React from "react";
import axios from "axios";
import firebase from '../../config/firebase.config'
import Layout from "components/layout";
import constants from "../../util/constants";

import "./styles.scss";

const Script = props =>(
    <tr>
        <td>{props.scripts.id}</td>
        <td>{props.scripts.name}</td>
        <td>{props.scripts.status}</td>
        <td>  <button type = "button" onClick={props.viewReport} className='btn btn-primary'>View Report</button></td>

    </tr>
)


class ScriptAnalysis extends React.Component{

  constructor(props){
    super(props);

    this.ref = firebase.database().ref()

    this.state = {
        id : '',
        file : '',
        name : '',
        option : constants.OPTION_ANALYSE,
        category : '',
        location : '',
        object : '',
        scripts : [],
        showReport : false,
        reports : [],
        locations : [],
        selectedCategory : '',
    }
  }

  componentDidMount(){
     this.onLoadScriptAnalysis()
  }

    loadScriptById = (id) =>{
      this.ref.child("script").child(id).on('value', (snapshot) =>{
          console.log(snapshot.val());

          let outReports = snapshot.val();
          let newReports = [];

          for( let report in outReports ){

              if( report !== "name" && report !== "status"){
                  let outData = outReports[report];
                  let newData = [];

                  console.log(outData)

                  for( let data in outData ){

                      newData.push({
                          page : outData[data].page,
                          index : outData[data].index,
                          sentence : outData[data].sentence
                      })
                  }

                  newReports.push({
                      category: report,
                      data : newData
                  })
              } //end main for loop

              this.setState({
                  reports : newReports
              })

              console.log(newReports)
              }

      })
    }


    onLoadLocations = (category) =>{

      this.ref.child("data").child(category).on('value', (snapshot) =>{
          console.log(snapshot.val())
          let outLocations = snapshot.val();
          let newLocations = [];

          for( let location in outLocations ){
              newLocations.push({
                  location : outLocations[location].location
              })
          } //end for

          console.log(newLocations)

          this.setState({
              locations : newLocations
          })
      })
    }

    onLoadScriptAnalysis = (e) =>{
      this.ref.child("script").on('value', (snapshot)=>{
          console.log(snapshot.val())

          let outScripts = snapshot.val();
          let newScripts = [];

          for( let script in outScripts ){
              newScripts.push({
                  id : script,
                  name : outScripts[script].name,
                  status : outScripts[script].status,

              })
          } //end for

          this.setState({
              scripts : newScripts
          })
      })
  }

  onChangeInputs = (e)=>{
      this.setState({
          [e.target.id] : e.target.value
      })
  }

  onChangeOption = (e) =>{

      if(e.target.value === constants.OPTION_ANALYSE ){
          this.setState({
              option : constants.OPTION_ANALYSE,
              showReport : false
          })
      }else if( e.target.value === constants.OPTION_MANAGE ){
          this.setState({
              option : constants.OPTION_MANAGE,
              showReport : false
          })
      }

  }

  flushdata = () =>{
      this.setState({
          category : '',
          location : ''
      })
  }

  onChangeFile = (e) =>{
    this.setState({
      file : e.target.files[0]
    })
  }

  onSubmitLocations = (e) =>{
      e.preventDefault();

      const newLocation = {
          "location" : this.state.location
      }

      this.ref.child(constants.CHILD_DATA).child(this.state.category).push(newLocation)
          .then(res=>{
              alert("Saved successfully !")
              this.flushdata();
          })
          .catch(err=>{
              console.log(err);
          })
  }

  onUploadFile = (e) =>{
    console.log(this.state.file)
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", this.state.file );
    formData.append("id", this.state.id );
    formData.append("name" , this.state.name );

    axios.post(constants.flask_api + "/upload",formData )
        .then(res=>{
          console.log(res.data);
          this.setState({
            predictions : res.data
          })
        })
        .catch(err=>{
          console.log(err);
        })
  }


  onViewReport = (index, obj, e) => {
      console.log(obj.id);
      this.setState({
          object : obj.id,
          showReport : true
      })
      this.loadScriptById(obj.id)
  }

  onSetCategory = (data) =>{
     this.setState({
         selectedCategory: data
     })
      this.onLoadLocations(data)
  }

  scriptList = ()=>{
      return this.state.scripts.map((currentScript, i)=>{
          return <Script scripts = {currentScript} key = {i}   viewReport = {this.onViewReport.bind(this,i,currentScript)}  />
      })
  }

  render() {
    return (
      <Layout>
        <div className="analysis">
            <button onClick={this.onChangeOption} value = {constants.OPTION_ANALYSE}> Script Analyse </button>
            <button onClick={this.onChangeOption} value={constants.OPTION_MANAGE}> Manage Locations </button>
            <br/>
            <hr/>

            {this.state.option === constants.OPTION_ANALYSE ?
                <>
                    <input type="text" id = "id" value = {this.state.id} onChange={this.onChangeInputs} placeholder="Analysis ID"/>
                    <input type="text" id = "name" value = {this.state.name} onChange={this.onChangeInputs} placeholder="Script Name "/>
                    <input type = "file"
                           className='form-control'
                           id = "file"
                           onChange={this.onChangeFile}
                    />
                    <button onClick={this.onUploadFile} style={{float : 'right'}} className="btn btn-secondary text-right"  > Upload File</button>
                </>
                :
                <>
                    <h3>Enter Details </h3>
                    <hr/>
                    <table border = "0">

                        <tr>
                            <td>Category : </td>
                            <td>
                                <select id = "category" onChange={this.onChangeInputs} className="form-control">
                                    <option value = "" selected disabled> Please Select</option>
                                    <option value = "Beach"> Beach</option>
                                    <option value = "Park"> Park</option>
                                    <option value = "Restaurants"> Restaurants</option>
                                    <option value = "waterfall"> Waterfall</option>
                                    <option value = "Jungle"> Jungle</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Location : </td>
                            <td>
                               <input  id = "location" value = {this.state.location} onChange={this.onChangeInputs} className="form-control" type = "text" placeholder="Location"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <input type = "button" value = "Save" onClick={this.onSubmitLocations} />
                            </td>
                        </tr>
                    </table>
                    <br/>


                </>
            }

            {this.state.showReport ?
                <>
                    <h3> Script Analysis Report for : {this.state.object}</h3>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Category(Prediction)</th>
                            <th>Page Number</th>
                            <th>Sentence Number</th>
                            <th>Sentence </th>
                            <th>Action </th>
                        </tr>
                        {this.state.reports.map((report, index)=>(
                            <>
                                <tr>
                                    <td style={{backgroundColor : 'green', color : "white"}}>{index + 1} </td>
                                    <td style={{backgroundColor : 'green', color : "white"}}>{report.category}</td>
                                    <td style={{backgroundColor : 'green', color : "white"}}> </td>
                                    <td style={{backgroundColor : 'green', color : "white"}}> </td>
                                    <td style={{backgroundColor : 'green', color : "white"}}> </td>
                                    <td style={{backgroundColor : 'green', color : "white"}}> <button onClick={this.onSetCategory.bind(this,report.category)}> Show Locations </button></td>
                                </tr>
                                {report.data.map((meta, index) =>(
                                    <>
                                        <tr>
                                            <td> </td>
                                            <td> </td>
                                            <td> {meta.page}</td>
                                            <td> {meta.index}</td>
                                            <td > {meta.sentence}</td>
                                            <td ></td>
                                        </tr>
                                    </>
                                ))}
                            </>
                        ))}
                    </table>

                    <h3> Locations for : {this.state.selectedCategory} </h3>
                    <table>

                        {this.state.locations.map((location,index)=>(
                            <>
                                <tr>
                                    <td> {index + 1} </td>
                                    <td>{location.location}</td>
                                </tr>
                            </>
                        ))}
                    </table>
                </>
                :
                <>
                    <h3> Script Analysis Records</h3>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {this.scriptList()}
                    </table>
                </>
            }


        </div>
      </Layout>
    );
  }
}

export default ScriptAnalysis;
