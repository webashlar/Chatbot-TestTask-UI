import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import ChatPage from "../pages/chat/Chat";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/chat-bot/:id" element={<ChatPage />} />
    </Routes>
  );
};

export default Router;
