import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Badge, Dropdown, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { api } from "../../axios";

const UserManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("access_token");
  const roles = ["user", "admin"];

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/all", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users.");
    }
  };

  const fetchEvents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.get("/events/all");
      let filteredEvents = [];

      if (user.role === "admin") {
        filteredEvents = res.data;
      } else {
        const userId = user._id || user.id;
        filteredEvents = res.data.filter(
          (event) =>
            event.createdBy === userId || event.createdBy?._id === userId
        );
      }

      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const handleStatusChange = (userId, currentStatus) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";

    if (!window.confirm(`Are you sure you want to ${nextStatus} this user?`)) return;

    api
      .put(
        `/users/status/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(`Status updated to ${nextStatus}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: nextStatus } : u))
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error("Status update failed.");
      });
  };

  const handleRoleChange = (userId, newRole) => {
    api
      .put(
        `/users/role/${userId}`,
        { newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success("Role updated successfully");
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error("Role update failed.");
      });
  };

  return (
    <Container className="mt-5" style={{padding:"50px"}}>
      <h2 className="text-center fw-bold mb-4 text-dark">User Management</h2>

      <Table bordered hover responsive className="text-center align-middle">
      <thead className="table-info text-center">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Events Created</th>
            {user?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const userEvents = events.filter((e) =>
              typeof e.createdBy === "object"
                ? e.createdBy._id === u._id
                : e.createdBy === u._id
            );

            return (
              <tr key={u._id}>
                <td className="fw-semibold text-primary">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <Badge bg={u.role === "admin" ? "danger" : "primary"}>
                    {u.role}
                  </Badge>
                </td>
                <td>
                  <Badge bg={u.status === "active" ? "success" : "secondary"}>
                    {u.status === "active" ? "✅ Active" : "⚠️ Suspended"}
                  </Badge>
                </td>
                <td>
                  {userEvents.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {userEvents.map((event) => (
                        <li key={event._id}>✔ {event.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted">No events</span>
                  )}
                </td>

                {user?.role === "admin" && (
                  <td className="d-flex flex-column gap-2">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-dark"
                        className="w-100 btn-sm"
                      >
                        Change Role
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {roles.map((r) => (
                          <Dropdown.Item
                            key={r}
                            onClick={() => handleRoleChange(u._id, r)}
                            disabled={u.role === r}
                          >
                            {r}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant={
                        u.status === "active" ? "outline-danger" : "outline-success"
                      }
                      size="sm"
                      onClick={() => handleStatusChange(u._id, u.status)}
                    >
                      {u.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManagement;
