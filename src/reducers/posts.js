import { ADD_POST, UPDATE_POSTS,ADD_COMMENT, UPDATE_POST_LIKE } from "../actions/actionTypes";

export default function posts(state=[],action){
    switch(action.type){
        case UPDATE_POSTS:
            return action.posts;
        case ADD_POST:
            return [
                action.post,...state
            ]
        case ADD_COMMENT:
                const newPosts=state.map((post)=>
                {//here we are modifying the existing posts. i.e. in a particular post object, we have added a list of comments.
                    if(post._id===action.postId)
                    {
                        return{
                            ...post,
                            comments:[action.comment, ...post.comments]
                        }
                    }
                    return post;
                });
                return newPosts;    
        case UPDATE_POST_LIKE:
            const updatedPosts=state.map((post)=>
                {//here we are modifying the existing posts. i.e. in a particular post object, we have added a list of comments.
                    if(post._id===action.postId)
                    {
                        return{
                            ...post,
                            likes:[...post.likes,action.userId]
                        }
                    }
                    return post;
                });
                return updatedPosts;

        default:
            return state;

    }


}