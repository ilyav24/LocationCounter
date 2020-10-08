import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import UsersTable from "../../components/UsersTable";
import { ErrorMessage } from "../../components/ErrorMessage";
import {
  loadUsers,
  userSelected,
  userFieldChanged,
  userUpdate,
  newUser,
  saveUser,
} from "./actions";
import { UsersCard } from "../../components/UserCard";
import { SaveToast } from "../../components/Toast";

const Users = () => {
  const dispatch = useDispatch();

  const onSelect = (user) => dispatch(userSelected(user));
  const onChange = (changes) => dispatch(userFieldChanged(changes));
  const onSave = () => dispatch(userUpdate());
  const onCreate = () => dispatch(saveUser());
  const onCreateButton = () => {
    dispatch(newUser());
  };
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const { users, selected, error, hash } = useSelector((state) =>
    state.usersList.toJS()
  );

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="icon-user"></i> Users
        </CardHeader>
        <CardBody>
          <UsersTable users={users} onSelect={onSelect} selected={selected} />
          <Button color="primary" onClick={onCreateButton}>
            Create New User
          </Button>
        </CardBody>
      </Card>
      <SaveToast id={hash} />
      <ErrorMessage error={error} />
      <UsersCard
        user={selected}
        onChange={onChange}
        onSave={onSave}
        onCreate={onCreate}
      />
    </div>
  );
};

export default Users;
