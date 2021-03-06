import React from 'react';
import {addLike, ADD_LIKE, ADD_LIKE_SUCCESS} from '../actions';


class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        let initialState = {
            className: 'btn-primary',
            label: 'Add',
            inWhishlist: false
        }
        if(props.inWishlist) {
           initialState = {
                className: 'btn-success',
                label: 'Added',
                inWishlist: true
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
        switch(action.type) {
            case ADD_LIKE:
                this.setState({label:'Adding',className:'btn-warning'});
                break;
            case ADD_LIKE_SUCCESS:
                this.setState({label:'Added',className:'btn-success', inWishlist: true});
                break;
            default:
                this.setState({label:'Can\'t add',className:'btn-danger'});
        }
    }

    render() {
        const events = { 
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