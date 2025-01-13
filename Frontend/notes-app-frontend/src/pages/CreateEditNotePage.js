import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNote, updateNote, uploadAudio, getNoteById } from "../services/api";
import Header from "../components/Header";

const CreateEditNotePage = () => {
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    audioUrl: "",
  });
  const { noteId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [recorder, setRecorder] = useState(null); // Track recorder instance
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId) {
      // Fetch the note if we are in edit mode
      const loadNote = async () => {
        const { data } = await getNoteById(noteId); // Ensure you have a function to fetch note by ID
        setForm(data); // Set the form data
      };
      loadNote();
    }
  }, [noteId]);

  useEffect(() => {
    // Cleanup the audio recording URL on component unmount
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Handle start and stop recording
  const handleStartRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const newRecorder = new MediaRecorder(stream);
        setRecorder(newRecorder); // Store the recorder instance
        const chunks = [];
        newRecorder.ondataavailable = (event) => chunks.push(event.data);
        newRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          setAudioBlob(blob);
          setAudioUrl(url);
        };
        newRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing audio media:", error);
      });
  };

  const handleStopRecording = () => {
    if (recorder) {
      setIsRecording(false);
      recorder.stop();
    }
  };

  // Save the note with the audio URL
  const handleSaveNote = async () => {
    const { id, title, description } = form;
    let audioData = "";
    if (audioBlob) {
      audioData = await uploadAudio(id, audioBlob);
    }

    const noteData = { title, description, audioUrl: audioData };
    const { data } = id
      ? await updateNote(id, noteData)
      : await createNote(noteData);

    setForm({ id: null, title: "", description: "", audioUrl: "" });

    navigate("/notes");
  };

  const handleCancel = () => {
    navigate("/notes");
  };

  return (
    <div>
      <Header />
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveNote();
          }}
        >
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Enter note description"
              required
            />
          </div>
          {form.id && (
            <div className="form-group">
              <label>Audio</label>
              <div>
                <button
                  type="button"
                  onClick={handleStartRecording}
                  disabled={isRecording}
                >
                  Start Recording
                </button>
                <button
                  type="button"
                  onClick={handleStopRecording}
                  disabled={!isRecording}
                >
                  Stop Recording
                </button>
                {audioUrl && (
                  <audio controls>
                    <source src={audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          )}
          <div className="actions">
            <button className="create" type="submit">
              {form.id ? "Update Note" : "Create Note"}
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditNotePage;
