const users = [];

//join user to chat
function userJoin(id, username, room) {
  const user = { username, room, id }
  users.push(user);
  return user;
}

//get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id)
}
/*the above function works as such:it is used to find a user from the users array
using unique id, we use find function that takes an arrow function as input
the arrow function is going to return the matched id and return it, that id will be used to find user in the users array.*/

//user leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1)
    return users.splice(index, 1)[0]; //understood the splice mechanism
}

//get users present in a particular room
function roomUsers(room) {
  return users.filter(user => user.room === room)
}

module.exports = {
  userJoin, getCurrentUser, userLeave, roomUsers
}