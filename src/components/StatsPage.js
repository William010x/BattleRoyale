import React from 'react';

class StatsPage extends React.Component {
    render() {
      return (          
        <div className="ui_top" id="ui_register">
			<h2>Stats</h2>
			<div className="form-top">
                <div className="form-row" name="user">
                    <span display="table-cell" data-name="user">User: {this.props.user}</span>
				</div>
                <div className="form-row" name="user">
                    <span display="table-cell" data-name="wins">Wins: {this.props.wins}</span>
                </div>
			</div>
		</div>
      );
    }
  }
  
  export default StatsPage;
  