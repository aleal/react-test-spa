import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom';
import UserAvatar from 'react-user-avatar';

import {fetchDogs} from '../actions';
import {withRouter} from "react-router-dom";

import LikeButton from './like-button';

class Home extends React.Component {
    componentDidMount() {
        this.props.fetch();
    }
    renderDogs() {
        const dogs = _.get(this,'props.data.dogs',[]);
        if(_.isEmpty(dogs)) {
            return <div> Nothing Here for while... </div>;
        }
        const users = _.get(this,'props.data.users',{});
        const likedDogIds = _.get(this,'props.data.liked_dog_ids',[]);
        return _.map(dogs, dog => {
            const dogCreator = users[dog.user_id] || {};
            return (
                <div className='dog-frame' key={dog.id}> 
                    <div className='dog-picture' >
                        <img src={dog.picture} />
                    </div>
                     <p className='dog-name'>{dog.name}</p>
                     <div className="avatar-link"> 
                    <Link to={`/user-profile/${dog.user_id}`}  >
                        <UserAvatar 
                                size="44" 
                                name={dogCreator.name || 'Unknown'} 
                                src={dogCreator.avatar||''} 
                        />
                    </Link>
                    </div>
                    <LikeButton 
                        userId={this.props.user.id} 
                        dogId={dog.id} 
                        inWishlist={likedDogIds.indexOf(dog.id) > -1} 
                    />
                </div>
            );
        });
    }
    render () {
        return (
            <div className="container">
                <h2> Dog List  <span className="pull-xs-right">
                  <Link className="btn btn-primary" to="/add-dog" > Add new </Link>
                </span></h2>
                <div className='list-group'>
                    {this.renderDogs()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({userData:{user},dogData:{dogs,status}}) {
    return {user, data: dogs, status};
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetch: () => {
        dispatch(fetchDogs(dispatch));
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Home);