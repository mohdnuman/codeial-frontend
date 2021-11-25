const API_ROOT='http://codeial.codingninjas.com:8000/api/v2';

export  const APIUrls={
    fetchPosts:(page=1,limit=5)=>`${API_ROOT}/posts?page=${page}&limit=${limit}`,
    login:()=>`${API_ROOT}/users/login`,
    signup:()=>`${API_ROOT}/users/signup`,
}