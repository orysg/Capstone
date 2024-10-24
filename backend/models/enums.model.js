const UserType = {
  ADMIN: 'Admin',
  CARER: 'Carer',
  GUEST: 'Guest'
};

const LoginStatus = {
  SUCCESS: 'Success',
  FAILURE: 'Failure',
  BLOCKED: 'Blocked'
};

const FallType = {
  SLOW: 'Slow',
  FAST: 'Fast',
  FALSE: 'False'
};

const ResponseStatus = {
  PENDING: 'Pending',
  ACKNOWLEDGED: 'Acknowledged',
  RESOLVED: 'Resolved'
};

module.exports = { UserType, LoginStatus, FallType, ResponseStatus };