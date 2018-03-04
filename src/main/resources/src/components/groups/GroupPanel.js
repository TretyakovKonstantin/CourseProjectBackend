import React from 'react';
import {connect} from 'react-redux'
import {DataList} from 'primereact/components/datalist/DataList'
import NewsTemplate from './NewsTemplate'

const mapStateToProps = state => {
  console.log(state.group.news);
  return ({
    news: state.group.news,
    group: state.group.group
  });
};


class GroupPanel extends React.Component {

  render() {
    if (!this.props.news || !this.props.group) {
      return null
    }
    return (
      <div>
        <h2 className="regular-page__title">{this.props.group.name}</h2>
        {
          this.props.news.length !== 0 ?
            <DataList value={this.props.news} itemTemplate={NewsTemplate} lazy={true} rows={20}/> :
            <h3>В этой группе нет новостей</h3>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(GroupPanel);