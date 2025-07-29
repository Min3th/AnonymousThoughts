"use client";
import { useState } from "react";
import useThoughts from "../requests/api";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  topic: Yup.string().required("Topic is required"),
  content: Yup.string().required("Content is required"),
});

const ThoughtsPage = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { loading, error, addThought } = useThoughts();

  const formik = useFormik({
    initialValues: {
      topic: "",
      content: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await addThought(values);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("I am here");
    e.preventDefault();
    alert(`Topic: ${topic}\nContent: ${content}`);
    await addThought({
      topic,
      content,
    }); // Call the addThought function from useThoughts
    // You can replace this with an API call
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f3f4f6">
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Submit a Thought
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Thought Topic"
              name="topic"
              value={formik.values.topic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.topic && Boolean(formik.errors.topic)}
              helperText={formik.touched.topic && formik.errors.topic}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Thought Content"
              name="content"
              multiline
              rows={5}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ThoughtsPage;
