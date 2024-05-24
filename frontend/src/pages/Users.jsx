import React from "react";
import { useGetAllUsersQuery } from "../redux/api/users";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const Users = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();

  return (
    <div className="p-4">
      <Typography variant="h5" component="h2" className="mb-4">
        User List
      </Typography>
      {isLoading ? (
        <p>Loading...</p>
      ) : users && users.length > 0 ? (
        <List>
          {users.map((user) => (
            <ListItem key={user._id} className="mb-4 bg-gray-100 p-4 rounded">
              <ListItemText
                primary={
                  <Typography variant="h6" component="h3">
                    {user.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" component="p">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Username: {user.username}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No Users found.</p>
      )}
    </div>
  );
};

export default Users;
