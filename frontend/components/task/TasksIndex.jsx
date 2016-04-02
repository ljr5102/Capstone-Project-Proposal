var React = require('react');
var TaskStore = require('../../stores/task');
var APIUtil = require('../../utils/api_util');
var TaskUtil = require('../../utils/task_util');
var TaskNewForm = require('./TaskNewForm');
var TasksIndexItem = require('./TasksIndexItem');
var Today = require('./inbox/Today');
var AllTasks = require('./inbox/AllTasks');
var Tomorrow = require('./inbox/Tomorrow');
var Week = require('./inbox/Week');

var TasksIndex = React.createClass({

  getInitialState: function() {
    return { tasks: TaskStore.all()}
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.handleChange)
    APIUtil.fetchAllTasks();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  handleChange: function() {
    this.setState({ tasks: TaskStore.all() });
  },

  render: function() {
    var taskArray = this.state.tasks.map(function(task, index) {
      return <TasksIndexItem key={index} task={task} /> ;
    });
    return (
      <div>
        <div className="sidebar group">
          <h2>Inbox</h2>
          <ul>
            <AllTasks />
            <Today />
            <Tomorrow />
            <Week />
          </ul>
        </div>
        <div className="task-index group">
          <TaskNewForm />
          <ul>
            {taskArray}
          </ul>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = TasksIndex;