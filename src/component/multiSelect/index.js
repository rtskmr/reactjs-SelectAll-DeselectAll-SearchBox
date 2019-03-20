import React, { Component } from 'react';
import { data } from './data';
//import { data } from '../src/component/multiSelect/data';
class MultiSelect extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    debugger;
    this.state = {
      showSearch: false,
      listItem: props.data,
    }
  }

  selectAll = () => {
    const { listItem } = this.state.listItem;
    let listItemCopy = [...listItem];
    listItemCopy.forEach(item => {
      item.isSelected = true;
    });
    console.log('Ritesh--', listItemCopy)
    this.setState({
      listItem: listItemCopy,
    });
  }

  deSelectAll = (data) => {
    console.log("deselecte all")
    data.forEach(item => {
      item.selected = false;
    });
    console.log("Item deSelectAll....", data);
  }

  // handleChange = (value) => {
  //   const data = this.state.listItem;
  //   let dataCopy = [...data];
  //   //debugger;
  //   dataCopy.forEach(item => {
  //     if (item.company.includes(value)) {
  //       item.display = true;
  //     }
  //     else {
  //       item.display = false;
  //     }
  //   });
  //   //debugger;
  //   this.setState({
  //     listItem: dataCopy
  //   });
  // }
  handleChange = ({target}) => {
    var data = this.state.listItem;
    data.forEach(item => {
      debugger;
      if(item.company.includes(target.value)){
        item.display = true;
      }
      else{
        item.display =false;
      }
    });
    //debugger;
    this.setState({listItem:data});

  }

  showSeachSection = () => {
    this.setState({ showSearch: true })
  }
  listItemClick = (item) => {
    let data = this.state.listItem;
    let dataCopy = [...data];

    dataCopy[item].isSelected = !dataCopy[item].isSelected;
    this.setState({
      listItem: dataCopy
    });
  }

  render() {
    const { listItem } = this.state;

    return (
      <form>
        <div style={{ width: 500, height: 50, background: 'lightgrey', marginRight: 100 }} onClick={() => this.showSeachSection()}> show search section -
        <span style={{ fontSize: 15, fontWeight: 'bold' }}>Item Selected - {listItem.filter(x => x.isSelected).length}</span><br />
          <span>
            {listItem.filter(x => x.isSelected).map(filObj => filObj.company).join(", ")}
          </span>
        </div>
        {this.state.showSearch ? <div>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            // ref="filterTextInput"
            onChange={this.handleChange}
            style={{ width: 500, height: 20, marginTop: 20 }}
          />
          {listItem && listItem.length > 0 ? <div>
            <button onClick={this.selectAll} style={{ background: 'red', height: '20', color: 'white' }}>Select All</button>
            <button onClick={this.deSelectAll} style={{ background: 'red', height: '20', color: 'white' }}>Deselect all</button>
          </div> : null}
          {listItem.map((item, index) => {
            if (item.display) {
              return (
                <div key={index} style={{ backgroundColor: item.selected ? 'red' : 'white' }} onClick={() => this.listItemClick(index)}>
                  <label>{item.company}</label>
                  {item.isSelected ? <i>*</i> : null}
                </div>
              )
            }
          }
          )}
        </div> : null}
      </form>
    );
  }
}
MultiSelect.defaultProps = {
  datasource: data
}

export default MultiSelect;
