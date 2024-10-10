import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Button } from "@mui/material";
import CustomModal from "../../components/modal/Modal";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  console.log("data", data);

  const handleCreateItem = () => {
    setIsModalOpen(true);
  };

  const handleItemClick = (itemId: number) => {
    navigate(`/chat-bot/${itemId}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://4d5a-103-250-151-79.ngrok-free.app/api/v1/conversion/getconversion"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.results);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={handleCreateItem}>
        Create
      </Button>
      <ul className="item-list">
        {data.length > 0 &&
          data?.map((item: any) => (
            <li
              key={item._id}
              className="item"
              onClick={() => handleItemClick(item._id)}
              style={{ cursor: "pointer" }}
            >
              {item.title}
            </li>
          ))}
      </ul>
      <CustomModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Dashboard;
