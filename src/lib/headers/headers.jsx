export const getHeaders = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYW16YWhAZ21haWwuY29tIiwianRpIjoiZmIzN2I5NzYtMzNkNC00MmQ3LWJlMDYtZTg3ZmUzMWI2NzMxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImhhbXphaEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJoYW16YWhAZ21haWwuY29tIiwiZXhwIjoxNzM2NzM3Njk0LCJpc3MiOiJNeUFwaUlzc3VlciIsImF1ZCI6Ik15QXBpQXVkaWVuY2UifQ.uok4EDTF3_q9uqCK99l-kzKyAaTHoCoa0tNQUpMwihg";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add the token directly
  };
};
