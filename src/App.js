import React from 'react';
import './App.css';



class App extends React.Component {
  constructor() {
    super();
    var tables = [{
      "name": "Sanjay",
      "rollNo": 108
    },
    {
      "name": "Developer",
      "rollNo": 7
    }];
    this.state = { table: tables, temp: ["", ""] };
  }

  del = (id) => {
    var tables = this.state.table;
    tables.splice(id, 1);
    this.setState({ table: tables });
  }

  edit = (id) => {
    var tables = this.state.table;
    
    var temps = [tables[id].rollNo, tables[id].name];

    this.setState({ temp: temps });
  }

  add = () => {
    var name_t = this.state.temp[1];
    var roll_t = this.state.temp[0];
    if(name_t==="" || roll_t === "") {
      return;
    }
    var tables = this.state.table;
    tables.push({ name: name_t, rollNo: roll_t });
    this.setState({ table: tables, temp: ["", ""] });
  }

  handle = (event) => {
    var temps = this.state.temp;
    if (event.target.id === "roll_t") {
      temps[0] = event.target.value;
    } else {
      temps[1] = event.target.value;
    }
    this.setState({ temp: temps });
  }

  save = (event) => {
    var id = parseInt(event.target.id);
    var tables = this.state.table;
    var temps = this.state.temp;
    if(temps[0]==="" || temps[1] === "") {
      return;
    }
    // console.log(id);
    tables[id].name = temps[1];
    tables[id].rollNo = temps[0];

    this.setState({ table: tables, temp: ["", ""] });
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">

          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>RollNo</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.table.map((tables, id) => (
                <tr key={id}>
                  <td>{tables.name}</td>
                  <td>{tables.rollNo}</td>
                  <td><button value={id} onClick={e => this.edit(id)} className="btn btn-orange" id={id + "_edit"}>Edit</button><button value={id} onClick={this.save} className="btn btn-green" id={id + "_save"}>Save</button></td>
                  <td><button value={id} onClick={e => this.del(id)} className="btn btn-red" id={id + "_del"}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
        <header className="Header">
          <div className="form">
            <input onChange={this.handle} placeholder="Roll No" value={this.state.temp[0]} className="inline" type="text" id="roll_t" />
            <input onChange={this.handle} placeholder="Name" value={this.state.temp[1]} className="inline" type="text" id="name_t" />
            <button onClick={this.add} className="btn btn-add">Add</button>
          </div>
        </header>
      </div>

    );
  }
}

export default App;