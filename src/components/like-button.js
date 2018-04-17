import _ from 'lodash';
import React from 'react';
import {addLike, ADD_LIKE, ADD_LIKE_SUCCESS, ADD_LIKE_FAILURE} from '../actions';


class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        let initialState = {
            className: 'btn-primary',
            label: 'Add to Wishlist',
            inWhishlist: false
        }
        if(props.inWhishlist) {
           initialState = {
                className: 'btn-success',
                label: 'In Wishlist',
                inWhishlist: true
            }
        }
        this.state = initialState;
    }

    onClick() {
       const like = {
           user_id: this.props.userId,
           dog_id: this.props.dogId
       };
       this.customDispatch(addLike(like,this.customDispatch.bind(this)));
    }

    customDispatch(action) {
        console.log("ACTION",action);
        switch(action.type) {
            case ADD_LIKE:
                this.setState({label:'Adding...',className:'btn-warning'});
                break;
            case ADD_LIKE_SUCCESS:
                this.setState({label:'In Wishlist',className:'btn-success', inWishlist: true});
                break;
            case ADD_LIKE_FAILURE:
                this.setState({label:'Can\'t add! :(',className:'btn-danger'});
                break;
        }
    }

    render() {
        let events = { 
            onClick: (!this.state.inWishlist ? this.onClick.bind(this) : ()=>{})
        };
        return (
            <div className="wishlist-btn" ref={this.props.dogId} >
                <button className={'btn ' + this.state.className} {...events} > 
                    {this.state.label}
                </button>
            </div>
        );
    }
    
}

export default LikeButton;