import {
	FETCH_FRIENDS_SUCCCESS,
	FETCH_FRIENDS_START,
	FETCH_FRIENDS_FAILURE,
	ADD_FRIEND,
    REMOVE_FRIEND
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function fetchFriendsStart() {
	return {
		type: FETCH_FRIENDS_START
	};
}

export function fetchFriendsSuccess(friends) {
	return {
		type: FETCH_FRIENDS_SUCCCESS,
		friends
	};
}

export function fetchFriendsFailure(error) {
	return {
		type: FETCH_FRIENDS_FAILURE,
		error
	};
}

export function fetchUserFriends() {
	return (dispatch) => {
		dispatch(fetchFriendsStart());
		const url = APIUrls.userFriends();
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(fetchFriendsSuccess(data.data.friends));
					return;
				}
				dispatch(fetchFriendsFailure(data.message));
			});
	};
}

export function addToFriendsList(user) {
	return {
		type: ADD_FRIEND,
		user
	};
}



export function removeFriendFromList(userId)
{
    return{
        type:REMOVE_FRIEND,
        userId
    }
}

