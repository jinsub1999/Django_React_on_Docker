import React from "react";

const UserInfo = ({username} : {
  username: string
}) => {
  return (<div className="bg-light rounded m-1 p-1 d-flex text-center fw-bold">
    {username}
  </div>);
};
export default UserInfo;
