let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

class Hello extends React.Component {

  state = {
    actions: []
  }

  componentDidMount() {
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  handleVisibilityChange = () => {
    if (document[hidden]) {
     this.setState({actions: [...this.state.actions, 'hide']});
    } else {
     this.setState({actions: [...this.state.actions, 'show']});
    }
  }

  componentWillUnmount()    {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }

  render() {
    return (
      <ul>
      {
        this.state.actions.map((item, key) => <li key={key}>{item}</li>)
      }
    </ul>
    )
  }
}

ReactDOM.render(
  <Hello />,
  document.getElementById('container')
);

// document.addEventListener('visibilitychange', function()
//    document.title = document.visibilityState;
//    console.log(document.visibilityState);
// });