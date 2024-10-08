// CreateQuestionUpload.js
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useToast } from "@chakra-ui/react";
import './CreateQuestionUpload.css'; // Assuming the CSS file is named 'styles.css'

const topicsList = [
  "Stack",
  "Recursion",
  "Tree",
  "Graph",
  "Array",
  "LinkedList",
];

const CreateQuestionUpload = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [points, setPoints] = useState();

  const [solution, setSolution] = useState({
    language: "cpp",
    file: null,
    code: "",
  });
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const toast = useToast();

  const handleTopicAdd = (topic) => {
    if (!topics.includes(topic)) {
      setTopics([...topics, topic]);
    }
    setSearchTerm("");
  };

  const handleTopicRemove = (topic) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const filteredTopics = topicsList.filter((topic) =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    const fileReader = new FileReader();
  
    fileReader.onload = (event) => {
      const fileContent = event.target.result;
  
      setSolution(prev => ({
        ...prev,
        code: fileContent,
      }));
  
      toast({
        title: "File Loaded",
        description: "The file content has been loaded successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
  
    fileReader.onerror = (error) => {
      toast({
        title: "Error reading file",
        description: `There was an error reading the file: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const validExtensions = { cpp: "cpp", python: "py" };
    const fileExtension = file.name.split('.').pop();
    
    if (fileExtension !== validExtensions[solution.language]) {
      toast({
        title: "Incorrect File Format",
        description: `Please upload a .${validExtensions[solution.language]} file.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      fileReader.readAsText(file);
    }
  };

  const handleSave = () => {
    if (!title || !topics.length || !description || !points || (!solution.language || (!solution.file && !solution.code)) || !testCases.length || testCases.some(tc => !tc.input || !tc.output)) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields properly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const questionData = {
      title,
      topics,
      difficulty,
      description,
      points,
      solution,
      testCases: testCases.reduce((map, obj, index) => ({
        ...map, [`TestCase${index + 1}`]: { Input: obj.input, Output: obj.output }
      }), {}),
    };

    onSave(questionData); // Pass the data back to the parent component
    toast({
      title: "Question Saved",
      description: "Your question has been saved successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="grid">
          <div className="flex-col">
            <label className="label">Topic</label>
            <input
              type="text"
              placeholder="Search and add topics..."
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredTopics.length > 0) {
                  e.preventDefault();
                  handleTopicAdd(filteredTopics[0]);
                }
              }}
            />
            {searchTerm && (
              <div className="topic-list">
                {filteredTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="topic-item"
                    onClick={() => handleTopicAdd(topic)}
                  >
                    {topic}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2">
              {topics.map((topic, index) => (
                <span key={index} className="topic-tag">
                  {topic}
                  <button
                    type="button"
                    onClick={() => handleTopicRemove(topic)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex-col">
            <label className="label">Difficulty Level</label>
            <select
              className="select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="flex-col">
          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex-col">
  <label className="label">Points</label>
  <input
    type="number"
    className="input"
    value={points}
    onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
    placeholder="Enter points"
  />
</div>

        <div className="flex-col">
          <label className="label">Description</label>
          <Editor
            apiKey="12e6goehlis4xhkogig9scymb8y31y8ij0iqz2iyorfw14ho"
            value={description}
            onEditorChange={(content) => setDescription(content)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "image imagetools",
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | link image | removeformat",
              content_style:
                "body { background-color: white; color: black; }",
              image_advtab: true,
              automatic_uploads: true,
              file_picker_types: "image",
              images_upload_handler: function (blobInfo, success, failure) {
                success("data:image/jpeg;base64," + blobInfo.base64());
              },
            }}
          />
        </div>

        <div className="flex-col">
          <label className="label">Share Your Solution</label>
          <select
            className="select"
            value={solution.language}
            onChange={(e) =>
              setSolution({ ...solution, language: e.target.value })
            }
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            {/* Add more languages here */}
          </select>
          <div className="flex-col">
            <label className="button">
              Choose File 📁
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="test-case-container">
          <label className="label">Test Cases</label>
          {testCases.map((testCase, index) => (
            <div key={index} className="flex-col">
              <label className="label mb-2">Test Case {index + 1}</label>
              <textarea
                placeholder="Input"
                className="textarea mb-2"
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "input", e.target.value)
                }
              />
              <textarea
                placeholder="Output"
                className="textarea"
                value={testCase.output}
                onChange={(e) =>
                  handleTestCaseChange(index, "output", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="button mt-2"
            onClick={addTestCase}
          >
            Add Test Case
          </button>
        </div>

        <button type="button" className="submit-button" onClick={handleSave}>
          Save Question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestionUpload;