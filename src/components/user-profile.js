import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import UserAvatar from 'react-user-avatar';

import {getUserProfile} from '../actions';

class UserProfile extends React.Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetch(id);
    }
    renderDogs() {
        const dogs = _.get(this,'props.userProfile.liked_dogs',[]);
        if(_.isEmpty(dogs)) {
            return <div> Nothing Here for while... </div>;
        }
        return _.map(dogs, dog => {
            return (
                <div className='dog-frame' key={dog.id}> 
                     <img src={dog.picture} className='dog-picture' alt={dog.name}/>
                     <p className='dog-name'>{dog.name}</p>
                </div>
            );
        });
    }
    render () {
        const userName = _.get(this,'props.userProfile.name','Unknown');
        const email = _.get(this,'props.userProfile.email','');
        const avatar = _.get(this,'props.userProfile.avatar','');
        return (
            <div className="container">
                <h3> User Profile  
                    <span className="pull-xs-right">
                        <Link className="btn btn-primary" to="/home" > Back </Link>
                    </span>
                </h3>
                <div className='user-profile row'> 
                    <div className='col-sm-3'>
                        <UserAvatar 
                            size="88" 
                            name={userName} 
                            src={avatar} 
                         />
                    </div>
                    <div className='col-sm-3'>
                        <h6>Name: {userName}</h6>
                        <h6>Email: {email}</h6>
                    </div>
                </div>
                <div className='list-group'>
                    <hr/>
                    <h4> Wishlist </h4>
                    {this.renderDogs()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({userData:{userProfile}}) {
    return {userProfile};
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetch: (id) => {
        dispatch(getUserProfile(id, dispatch));
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);