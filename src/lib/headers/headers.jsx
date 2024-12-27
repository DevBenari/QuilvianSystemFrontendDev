export const getHeaders = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYW16YWhAZ21haWwuY29tIiwianRpIjoiZTYyMzNhN2QtMzIzZS00NjIwLWE3ZjEtMDllNzk2MzNhOTkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImhhbXphaEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJoYW16YWhAZ21haWwuY29tIiwiZXhwIjoxNzM1Mjg0NjI4LCJpc3MiOiJNeUFwaUlzc3VlciIsImF1ZCI6Ik15QXBpQXVkaWVuY2UifQ.1f7T4xsLojfyPHXfrZV2Mn-diYWJ4o6Zjnan4FGe7EE";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add the token directly
  };
};
