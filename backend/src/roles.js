import AccessControl from 'accesscontrol';
const ac = new AccessControl();

// Define permissions for resources used in the app
ac.grant('user')
  .readAny('task');

ac.grant('admin')
  .extend('user')
  .updateAny('user')
  .createAny('task')
  .updateAny('task')
  .deleteAny('task')
  .readAny('task')
  .deleteAny('user');

export const roles = ac;
