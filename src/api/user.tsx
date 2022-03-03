import Instance from '../axios/axios'

export const userApis = {
  get_searchUser: (code:string) => Instance.get(`/user/${code}`),
  get_RecommendedUsers: () => Instance.get('/users/recommended'),
  get_UserInfo: (code:string) => Instance.get(`/user/${code}/info`),
  delete_patch_follow: (code:string, isFollowed = false) =>
    isFollowed
      ? Instance.delete(`/unFollow/${code}`)
      : Instance.patch(`/follow/${code}`),
  get_checkFollow: (code:string) =>
    Instance.get(`/checkFollow/${code}`),
  get_UserFollowers: (code:string) =>
    Instance.get(`/followers/${code}`),
  get_UserFollowings: (code:string) =>
    Instance.get(`/followings/${code}`),
}
