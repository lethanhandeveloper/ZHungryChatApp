import { v4 as uuidv4 } from 'uuid';

const userList = [
    {
        id: uuidv4(),
        firstName: "Ahmed",
        lastName : "hassan",
        avatar: require('../images/avatars/Ellipse_3.png'),
        isActive : true
    },
    {
        id: uuidv4(),
        firstName: "Sara",
        lastName : "Khaled",
        avatar: require('../images/avatars/Ellipse_4.png'),
        isActive : true
    },
    {
        id: uuidv4(),
        firstName: "Omr",
        lastName : "Mohamed",
        avatar: require('../images/avatars/Ellipse_5.png'),
        isActive : true
    },
    {
        id: uuidv4(),
        firstName: "Mostafa",
        lastName : "Mohamed",
        avatar: require('../images/avatars/Ellipse_6.png'),
        isActive : true
    },
    {
        id: uuidv4(),
        firstName: "Hatem",
        lastName : "Ibrahim",
        avatar: require('../images/avatars/Ellipse_7.png'),
        isActive : true
    }
]

export default userList;