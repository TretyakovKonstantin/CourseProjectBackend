import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import uuid from 'uuid';
import agent from "../../agent";

const mapStateToProps = state => ({
  groups: state.group.groups
});

class GroupModal extends React.Component {
  state = {
    groupName: '',
    error: '',
    foundGroups: []
  };

  render() {
    return (
      <Modal
        className="modal"
        isOpen={this.props.selectedOption}
        contentLabel="Create group"
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        <p>Enter Group's name</p>
        <input type="text" className="text-input" list="groups-list" onChange={(e) => {
          const groupName = e.target.value;
          this.setState({
            error: '',
            groupName,
            foundGroups: agent.Groups.find(groupName)
          });
        }}/>
        <datalist id="groups-list">
          {this.state.foundGroups.map(({name}) => {
            return <option value={name} key={name}/>
          })}
        </datalist>
        <button className="button"
                onClick={() => {
                  if (this.props.groups.map(group => group.name).includes(this.state.groupName)) {
                    this.setState({error: 'This group already exists. Please, select another group'});
                    return;
                  }
                  this.props.onSubmit({id: uuid(), name: this.state.groupName});
                  this.props.onCloseModal()
                }}>Create
        </button>
        {this.state.error && <p className="form_error">{this.state.error}</p>}
      </Modal>
    )
  }
}

export default connect(mapStateToProps)(GroupModal);