import React, { useState } from 'react';
import {
  Box, FormControl, FormLabel, Input, Button, VStack, useToast
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreateQuestionUpload from '../../components/createquestionupload/CreateQuestionUpload';
import { createContest } from '../../http'; // Make sure this import path is correct
import { useNavigate } from 'react-router-dom';

const CreateContest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [questions, setQuestions] = useState([]);
  const [questionTabs, setQuestionTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    const newTabId = questionTabs.length + 1;
    setQuestionTabs([...questionTabs, { id: newTabId, isOpen: true }]);
    setActiveTabId(newTabId);
  };

  const handleQuestionSave = (questionData, tabId) => {
    setQuestions((prevQuestions) => [...prevQuestions, questionData]);
    setQuestionTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, isOpen: false } : tab
      )
    );
    setActiveTabId(null); // Close the tab after saving
  };

  const toggleTab = (tabId) => {
    setActiveTabId(tabId);
    setQuestionTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, isOpen: true } : { ...tab, isOpen: false }
      )
    );
  };

  const handleSubmit = async () => {
    // Validation
    if (!title || !description || !startTime || !endTime || questions.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill out all fields and add at least one question.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const contestData = {
      title,
      description,
      startTime,
      endTime,
      questions,
    };

    try {
      // Call createContest API
      const response = await createContest(contestData);
      if (response.data) {
        toast({
          title: 'Contest Created',
          description: 'The contest has been created successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/arena');
      } else {
        throw new Error('Failed to create contest');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while creating the contest.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch" m={4}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter contest title" ml={2} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter contest description" ml={2} />
      </FormControl>
      <FormControl>
        <FormLabel>Start Time</FormLabel>
        <DatePicker
          selected={startTime}
          onChange={date => setStartTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="input"
        />
      </FormControl>
      <FormControl>
        <FormLabel>End Time</FormLabel>
        <DatePicker
          selected={endTime}
          onChange={date => setEndTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="input"
        />
      </FormControl>

      <Button onClick={handleAddQuestion} backgroundColor="gray.700" color="white">Add Question</Button>

      {/* Display list of questions */}
      {questions.length > 0 && questions.map((q, index) => (
        <Box key={index} p={2} borderWidth="1px" borderRadius="lg" bg="gray.100">
          <h4>Title: {q.title}</h4>
          <p>Topics: {q.topics.join(', ')}</p>
          <p>Difficulty: {q.difficulty}</p>
          <Button backgroundColor="gray.700" color="white" size="sm" onClick={() => toggleTab(index + 1)}>
            {questionTabs.find(tab => tab.id === index + 1)?.isOpen ? 'Close' : 'Edit'}
          </Button>
        </Box>
      ))}

      {/* Render QuestionUpload Tabs */}
      {questionTabs.map((tab) =>
        tab.isOpen ? (
          <CreateQuestionUpload
            key={tab.id}
            onSave={(data) => handleQuestionSave(data, tab.id)}
          />
        ) : null
      )}

      <Button onClick={handleSubmit} backgroundColor="gray.700" color="white" size="lg">Submit Contest</Button>
    </VStack>
  );
};

export default CreateContest;