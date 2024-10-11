import React, { useEffect, useState } from "react";
import "./ChatBoxComponent.css";
import { analyzeNextSteps, rootURL } from "../../helper/analyzeNextSteps";
import Chats from "../chats/Chats";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";

interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chatbot: React.FC = () => {
  const { id } = useParams();
  const [currentBot, setCurrentBot] = useState<any>();
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot",
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");

  useEffect(() => {
    const fetchConversionData = async () => {
      try {
        const response = await fetch(
          `${rootURL}/api/v1/conversion/fetchconversion/${id}`,
          {
            method: "GET", // Specify method
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json", // Include if expecting JSON response
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCurrentBot(data.results[0]);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchConversionData();
  }, [id]);

  const setNextStep = (response: string) => {
    setStep((prevState) => prevState + 1);
    setSendUserResponse(response);
    let res = analyzeNextSteps(step, response, currentBot.jsonData);
    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userResponse.length === 0) return;
    setNextStep(userResponse);
  };

  return (
    <div className="chat-container">
      <Chats
        userResponse={userResponse}
        botResponse={botResponse}
        sendUserResponse={sendUserResponse}
        optionClick={optionClick}
      />
      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
        <input
          placeholder="Type here..."
          onChange={(e) => handleInputChange(e)}
          value={userResponse}
          required
        />
        <SendIcon
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
};

export default Chatbot;
