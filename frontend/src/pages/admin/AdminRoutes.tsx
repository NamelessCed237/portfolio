import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { Dashboard } from "./Dashboard";
import { ProfileEditor } from "./ProfileEditor";
import { CollectionList } from "./CollectionList";
import { CollectionEditor } from "./CollectionEditor";

/** Everything under /admin, lazy-loaded as one chunk. */
const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="profile" element={<ProfileEditor />} />
      <Route path=":collection" element={<CollectionList />} />
      <Route path=":collection/:id" element={<CollectionEditor />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
