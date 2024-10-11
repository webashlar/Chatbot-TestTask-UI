import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Button } from "@mui/material";
import CustomModal from "../../components/modal/Modal";
import { rootURL } from "../../helper/analyzeNextSteps";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();


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
          `${rootURL}/api/v1/conversion/getconversion`,
          {
            method: "GET", // Specify method, even for GET requests
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json", // Include if you're expecting JSON response
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.results);
        setIsFetched(false);
      } catch (error: any) {
        console.log(error);
        setIsFetched(false);
      }
    };

    fetchData();
  }, [isFetched]);

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
      <CustomModal
        isOpen={isModalOpen}
        setIsFetched={setIsFetched}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Dashboard;
