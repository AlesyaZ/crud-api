export const validUserId = (url: string) => {
  const userID = url.replace('/api/users', '');
  if (userID.length > 1) {
    return userID.slice(1);
  } else {
    return null;
  }
};
