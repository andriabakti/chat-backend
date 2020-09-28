const dataUsers = []

const joinRoom = (user)=>{
    users.push(user)
}
const leftRoom = (id)=>{
    dataUsers = dataUsers.filter()
}

const findUser = (id)=>{
    return dataUsers.find((user)=> user.id === id)
}

module.exports ={
    joinRoom,
    leftRoom,
    findUser
}