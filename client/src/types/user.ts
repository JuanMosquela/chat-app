// createdAt
// :
// "2023-04-23T19:14:53.862Z"
// email
// :
// "jmosquella11@gmail.com"
// google
// :
// true
// password
// :
// ":P"
// picture
// :
// "https://lh3.googleusercontent.com/a/AGNmyxY1JEHzNnVaIQ5y3zjj6u9FKEFoNaXeWFN7RV2Rpw=s96-c"
// state
// :
// true
// updatedAt
// :
// "2023-04-23T19:14:53.862Z"
// username
// :
// "Juan Mosquella"
// __v
// :
// 0
// _id
// :
// "644583ac1fb5eb4dcefd7665"

export default interface User {
  _id: string;
  username: string;
  email: string;
  passwrd: string;
  state: boolean;
  picture?: string;
  google: boolean;
}
