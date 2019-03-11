const getters = {
  roles: state => state.user.roles,
  userId: state => state.user.user.id
}

export default getters;