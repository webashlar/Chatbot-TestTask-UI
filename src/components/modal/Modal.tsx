import React from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { rootURL } from "../../helper/analyzeNextSteps";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsFetched: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "10px",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  setIsFetched,
}) => {
  const [title, setTitle] = React.useState("");
  const [jsonFile, setJsonFile] = React.useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJsonFile(e.target.files[0]);
      setUploadMessage(`Uploaded: ${e.target.files[0].name}`);
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    if (!title || !jsonFile) {
      setErrorMessage("Title is required and a JSON file must be uploaded.");
      return;
    }

    setLoading(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jsonData", jsonFile); // Assuming jsonFile is a Blob or a File

    try {
      // Make the API request
      const response = await fetch(
        `${rootURL}/api/v1/conversion/createconversion`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          body: formData,
        }
      );

      // Check for response status
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setIsFetched(true);
      onClose();

      // Handle success (e.g., show a message, update state, etc.)
    } catch (error: any) {
      setErrorMessage(`Submission failed: ${error.message}`);
      onClose();
    } finally {
      resetState();
      setLoading(false);
      setIsFetched(true);
      onClose();
    }
  };

  const resetState = () => {
    setTitle("");
    setJsonFile(null);
    setUploadMessage("");
    setErrorMessage("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Create Item
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
          Upload JSON
          <input
            type="file"
            accept=".json"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {uploadMessage && (
          <Typography variant="body2" color="green" sx={{ marginTop: 1 }}>
            {uploadMessage}
          </Typography>
        )}
        <Box mt={2}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ ml: 2 }}
            disabled={loading}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
