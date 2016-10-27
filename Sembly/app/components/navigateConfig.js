export default function _navigate(name){
    if(name === 'Profile'){
      this.props.navigator.push({
        name: 'Profile'
      });
    }
    if(name === 'Main'){
      this.props.navigator.push({
        name: 'Main'
      });
    }
    if(name === 'Feed'){
      this.props.navigator.push({
        name: 'Feed'
      });
    }
    if(name === 'Invites'){
      this.props.navigator.push({
        name: 'Invites'
      });
    }
    if(name === 'Saved'){
      this.props.navigator.push({
        name: 'Saved'
      });
    }
};

