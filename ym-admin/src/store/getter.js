const getters = {
  roles: state => state.user.roles,
  userId: state => state.user.user.id,
  addRouters: state => state.permission.addRouters
};

export default getters;
