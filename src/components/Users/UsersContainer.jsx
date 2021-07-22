import React from 'react';
import { connect } from 'react-redux';
import {
    follow, setCurrentPage,
    unfollow,
    getUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../components/common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsersData, getCurrentPage, getIsLoading, getToggleFollowingInProgress, getUsersAmount, getUsersOnPage } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, usersOnPage, getUsers} = this.props;
        getUsers(currentPage, usersOnPage)
    }

    onPageChanged = (pageNumber) => {
        let {usersOnPage, setCurrentPage, getUsers} = this.props
        setCurrentPage(pageNumber);
        getUsers(pageNumber, usersOnPage)
    }


    render() {
        return (
            <>
                {this.props.isLoading ? <Preloader /> : null}
                <Users
                    usersAmount={this.props.usersAmount}
                    usersOnPage={this.props.usersOnPage}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsersData(state),
        usersAmount: getUsersAmount(state),
        usersOnPage: getUsersOnPage(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        toggleFollowingInProgress: getToggleFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps,
        {
            follow, unfollow, setCurrentPage, setCurrentPage, getUsers
        })
)(UsersContainer)