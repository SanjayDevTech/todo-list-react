import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';



class App extends React.Component {
  constructor() {
    super();
    this.cookies = new Cookies();
    //console.log("Hello: "+this.cookies.get('tasks'));
    let tCookies = this.cookies.get('tasks');
    var tables = tCookies;

    if (!Array.isArray(tCookies)) {
      console.log("Undefines");
      tables = [{
        "task": "Sanjay"
      },
      {
        "task": "Developer"
      }];
    }

    this.cookies.set('tasks', tables, { path: '/' });

    this.state = { table: tables, temp: "" };
    console.log(this.state.table);
  }

  del = (id) => {
    var tables = this.state.table;
    tables.splice(id, 1);
    this.setState({ table: tables });
    this.cookies.set('tasks', tables, { path: '/' });
  }

  edit = (id) => {
    var tables = this.state.table;

    var temps = tables[id].task;

    this.setState({ temp: temps });
  }

  add = () => {
    var tasks = this.state.temp;
    if (tasks === "") {
      return;
    }
    var tables = this.state.table;
    tables.push({ task: tasks });
    this.setState({ table: tables, temp: "" });
    this.cookies.set('tasks', tables, { path: '/' });
  }

  handle = (event) => {
    this.setState({ temp: event.target.value });
  }

  save = (event) => {
    var id = parseInt(event.target.id);
    var tables = this.state.table;
    var temps = this.state.temp;
    if (temps === "") {
      return;
    }
    // console.log(id);
    tables[id].task = temps;

    this.setState({ table: tables, temp: "" });
    this.cookies.set('tasks', tables, { path: '/' });
  }
  handleKeypress = e => {

    if (e.charCode === 13) {
      this.add();

    }
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">

          <table border="1">
            <thead>
              <tr>
                <th>Task</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.table.map((tables, id) => (
                <tr key={id}>
                  <td>{tables.task}</td>
                  <td><button value={id} onClick={e => this.edit(id)} className="btn btn-orange" id={id + "_edit"}>Edit</button><button value={id} onClick={this.save} className="btn btn-green" id={id + "_save"}>Save</button></td>
                  <td><button value={id} onClick={e => this.del(id)} className="btn btn-red" id={id + "_del"}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
        <header className="Header">
          <div className="form">
            <input onKeyPress={this.handleKeypress} onChange={this.handle} placeholder="Tasks" value={this.state.temp} className="inline" type="text" id="name_t" />
            <button onClick={this.add} className="btn btn-add">Add</button>
          </div>
        </header>
      </div>

    );
  }
}

export default App;